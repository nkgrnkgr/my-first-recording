/**
 * システム音声（画面共有の音声）を取得する
 */
export async function getDisplayAudioStream(): Promise<MediaStream> {
  return await navigator.mediaDevices.getDisplayMedia({
    video: true,
    audio: true,
  });
}

/**
 * マイク音声を取得する
 */
export async function getUserAudioStream(): Promise<MediaStream> {
  return await navigator.mediaDevices.getUserMedia({
    audio: true,
  });
}

/**
 * 複数の音声ストリームを1つにミックスする
 * AudioContextも返すので、使用後にcloseすること
 */
export function mixAudioStreams(streams: MediaStream[]): {
  stream: MediaStream;
  audioContext: AudioContext;
} {
  const audioContext = new AudioContext();
  const destination = audioContext.createMediaStreamDestination();

  streams.forEach((stream) => {
    const audioTracks = stream.getAudioTracks();
    if (audioTracks.length > 0) {
      const source = audioContext.createMediaStreamSource(
        new MediaStream(audioTracks),
      );
      source.connect(destination);
    }
  });

  return {
    stream: destination.stream,
    audioContext,
  };
}

/**
 * すべてのストリームを停止する
 */
export function stopAllStreams(streams: MediaStream[]): void {
  streams.forEach((stream) => {
    stream.getTracks().forEach((track) => {
      track.stop();
    });
  });
}
