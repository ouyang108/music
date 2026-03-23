import { ref } from "vue";

// 全局单例
let audioCtx: AudioContext | null = null;
let destination: MediaStreamAudioDestinationNode | null = null;
let source: MediaElementAudioSourceNode | null = null;

export const useAudioStream = () => {
  const stream = ref<MediaStream | null>(null);

  /**
   * 初始化音频流
   * @param audioElement 页面上的 <audio> 标签引用
   */
  const initStream = (audioElement: HTMLAudioElement) => {
    if (!audioCtx) {
      const AudioContextClass =
        window.AudioContext || (window as any).webkitAudioContext;
      audioCtx = new AudioContextClass();
      destination = audioCtx.createMediaStreamDestination();
      stream.value = destination.stream;
    }

    // 关键：一个 MediaElement 只能创建一个 SourceNode
    // 我们只在第一次传入该 audio 标签时创建连接
    if (!source) {
      source = audioCtx.createMediaElementSource(audioElement);
      source.connect(destination!);
      // 必须连接到 ctx.destination，否则 <audio> 标签在喇叭里没声音
      source.connect(audioCtx.destination);
    }

    return stream.value;
  };

  /**
   * 切换音频地址并播放
   * @param audioElement 页面上的 <audio> 标签引用
   * @param url 新的音频地址
   */
  const playUrl = async (audioElement: HTMLAudioElement, url: string) => {
    // 1. 确保环境已初始化
    initStream(audioElement);

    // 2. 切换地址
    audioElement.src = url;
    audioElement.crossOrigin = "anonymous"; // 确保跨域开启

    // 3. 处理 AudioContext 挂起状态
    if (audioCtx?.state === "suspended") {
      await audioCtx.resume();
    }

    try {
      // 4. 播放（会触发 <audio> 标签自带的 @play 事件）
      await audioElement.play();
    } catch (error) {
      console.warn("播放失败，请确保由用户点击触发", error);
    }

    return stream.value;
  };

  return {
    stream,
    initStream,
    playUrl,
  };
};
