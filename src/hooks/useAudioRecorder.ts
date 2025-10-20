import { useCallback, useEffect, useRef, useState } from "react";
import {
  getDisplayAudioStream,
  getUserAudioStream,
  stopAllStreams,
} from "@/lib/audioStream";

export function useAudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamsRef = useRef<MediaStream[]>([]);

  const startRecording = useCallback(async () => {
    try {
      // システム音声を取得
      const displayStream = await getDisplayAudioStream();

      // 音声トラックが含まれているか確認
      const audioTracks = displayStream.getAudioTracks();
      console.log("Display audio tracks:", audioTracks.length);

      if (audioTracks.length === 0) {
        throw new Error(
          "音声トラックが見つかりません。画面共有時に「タブの音声を共有」または「システムオーディオを共有」のチェックボックスをオンにしてください。",
        );
      }

      // 音声トラックのみを含む新しいMediaStreamを作成
      const audioOnlyStream = new MediaStream(audioTracks);

      // 元のストリームを保存（後で停止するため）
      streamsRef.current = [displayStream];

      // サポートされているMIMEタイプを確認
      const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : "audio/webm";

      // MediaRecorderで録音開始（音声のみのストリームを使用）
      const mediaRecorder = new MediaRecorder(audioOnlyStream, { mimeType });

      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mimeType });
        const url = URL.createObjectURL(blob);
        setRecordedUrl(url);

        // すべてのストリームを停止
        stopAllStreams(streamsRef.current);
        streamsRef.current = [];
      };

      mediaRecorder.start(1000);
      setIsRecording(true);
    } catch (error) {
      console.error("録音の開始に失敗しました:", error);

      // エラーの種類に応じたメッセージを表示
      if (error instanceof Error) {
        if (error.message.includes("音声トラック")) {
          alert(error.message);
        } else if (error.name === "NotAllowedError") {
          alert(
            "画面共有が拒否されました。ブラウザの設定で画面共有を許可してください。",
          );
        } else if (error.name === "NotFoundError") {
          alert("共有可能な画面が見つかりませんでした。");
        } else {
          alert(`エラーが発生しました: ${error.message}`);
        }
      } else {
        alert("録音の開始に失敗しました。");
      }
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  }, [isRecording]);

  // コンポーネントアンマウント時のクリーンアップ
  useEffect(() => {
    return () => {
      // 録音中の場合は停止
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state === "recording"
      ) {
        mediaRecorderRef.current.stop();
      }

      // すべてのストリームを停止
      stopAllStreams(streamsRef.current);

      // 作成したURLを解放
      if (recordedUrl) {
        URL.revokeObjectURL(recordedUrl);
      }
    };
    // 依存配列を空にして、アンマウント時のみ実行されるようにする
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isRecording,
    recordedUrl,
    startRecording,
    stopRecording,
  };
}
