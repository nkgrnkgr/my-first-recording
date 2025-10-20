"use client";

import { useAudioRecorder } from "@/hooks/useAudioRecorder";

export default function AudioRecorder() {
  const { isRecording, recordedUrl, startRecording, stopRecording } =
    useAudioRecorder();

  return (
    <div className="mx-auto max-w-2xl p-10">
      <h1 className="mb-5 text-2xl font-bold">音声録音アプリ</h1>
      <p className="mb-8 text-gray-600">
        Zoom/GoogleMeetなどの音声とマイク音声を同時に録音できます
      </p>

      <div className="mb-8">
        {!isRecording ? (
          <button
            type="button"
            onClick={startRecording}
            className="cursor-pointer rounded-md border-none bg-blue-600 px-6 py-3 text-base text-white hover:bg-blue-700"
          >
            録音開始
          </button>
        ) : (
          <button
            type="button"
            onClick={stopRecording}
            className="cursor-pointer rounded-md border-none bg-red-600 px-6 py-3 text-base text-white hover:bg-red-700"
          >
            録音停止
          </button>
        )}
      </div>

      {isRecording && (
        <div className="mb-5 rounded-md bg-red-50 p-3">
          <span className="text-red-800">● 録音中...</span>
        </div>
      )}

      {recordedUrl && (
        <div>
          <h2 className="mb-4 text-xl font-semibold">録音された音声</h2>
          <audio controls src={recordedUrl} className="w-full">
            <track kind="captions" />
          </audio>
          <div className="mt-4">
            <a
              href={recordedUrl}
              download="recording.webm"
              className="inline-block rounded-md bg-green-600 px-4 py-2 text-white no-underline hover:bg-green-700"
            >
              ダウンロード
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
