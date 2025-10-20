import { useCallback, useEffect, useRef, useState } from "react";
import {
  getDisplayAudioStream,
  getUserAudioStream,
  mixAudioStreams,
  stopAllStreams,
} from "@/lib/audioStream";

export function useAudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamsRef = useRef<MediaStream[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);

  const startRecording = useCallback(async () => {
    try {
      // システム音声とマイク音声を取得
      const displayStream = await getDisplayAudioStream();
      const userStream = await getUserAudioStream();

      console.log(
        "Display audio tracks:",
        displayStream.getAudioTracks().length,
      );
      console.log("User audio tracks:", userStream.getAudioTracks().length);

      if (displayStream.getAudioTracks().length === 0) {
        throw new Error(
          "システム音声トラックが見つかりません。画面共有時に「タブの音声を共有」のチェックボックスをオンにしてください。",
        );
      }

      // Web Audio APIで音声をミックス
      const { stream: mixedStream, audioContext } = mixAudioStreams([
        displayStream,
        userStream,
      ]);
      audioContextRef.current = audioContext;

      console.log("AudioContext state:", audioContext.state);
      console.log(
        "Mixed stream audio tracks:",
        mixedStream.getAudioTracks().length,
      );

      // 元のストリームを保存（後で停止するため）
      streamsRef.current = [displayStream, userStream];

      // サポートされているMIMEタイプを確認
      const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : "audio/webm";

      console.log("Using MIME type:", mimeType);

      // MediaRecorderで録音開始
      const mediaRecorder = new MediaRecorder(mixedStream, { mimeType });

      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        console.log("Data available:", event.data.size, "bytes");
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mimeType });
        console.log("Recording stopped. Blob size:", blob.size, "bytes");
        console.log("Total chunks:", chunksRef.current.length);

        const url = URL.createObjectURL(blob);
        setRecordedUrl(url);

        // AudioContextをクローズ
        if (
          audioContextRef.current &&
          audioContextRef.current.state !== "closed"
        ) {
          audioContextRef.current.close();
          audioContextRef.current = null;
        }

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

      // AudioContextをクローズ
      if (
        audioContextRef.current &&
        audioContextRef.current.state !== "closed"
      ) {
        audioContextRef.current.close();
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
