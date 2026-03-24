import { ref, computed, watch, type Ref } from "vue";
import { useAudioStream } from "./useMusic";

export interface AudioPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  progress: number;
  error: string | null;
}

export const useAudioPlayer = (
  audioRef: Ref<HTMLAudioElement | null | undefined>,
) => {
  const { stream, playUrl } = useAudioStream();

  // 状态
  const isPlaying = ref(false);
  const currentTime = ref(0);
  const duration = ref(0);
  const volume = ref(60);
  const error = ref<string | null>(null);

  const progress = computed(() => {
    if (!duration.value) return 0;
    return (currentTime.value / duration.value) * 100;
  });

  // 播放控制
  const play = async () => {
    if (!audioRef.value) return;
    try {
      await audioRef.value.play();
      error.value = null;
    } catch (err) {
      error.value = "播放失败";
      console.error("播放失败:", err);
    }
  };

  const pause = () => {
    if (!audioRef.value) return;
    audioRef.value.pause();
  };

  const togglePlay = () => {
    if (isPlaying.value) {
      pause();
    } else {
      play();
    }
  };

  const seek = (percent: number) => {
    if (!audioRef.value || !duration.value) return;
    audioRef.value.currentTime = (percent / 100) * duration.value;
  };

  const setVolume = (value: number) => {
    volume.value = Math.max(0, Math.min(100, value));
  };

  // 加载并播放新音频
  const loadAndPlay = async (url: string) => {
    if (!audioRef.value) return;
    try {
      await playUrl(audioRef.value, url);
      error.value = null;
    } catch (err) {
      error.value = "加载音频失败";
      console.error("加载音频失败:", err);
    }
  };

  // 事件处理
  const handlePlay = () => {
    isPlaying.value = true;
  };

  const handlePause = () => {
    isPlaying.value = false;
  };

  const handleTimeUpdate = () => {
    if (audioRef.value) {
      currentTime.value = audioRef.value.currentTime;
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.value) {
      duration.value = audioRef.value.duration;
    }
  };

  const handleEnded = () => {
    isPlaying.value = false;
    currentTime.value = 0;
  };

  const handleError = () => {
    error.value = "音频加载或播放出错";
  };

  // 同步音量到 audio 元素
  watch(volume, (newVolume) => {
    if (audioRef.value) {
      audioRef.value.volume = newVolume / 100;
    }
  });

  // 初始化音量
  watch(
    audioRef,
    (audio) => {
      if (audio) {
        audio.volume = volume.value / 100;
      }
    },
    { immediate: true },
  );

  return {
    // 状态
    isPlaying,
    currentTime,
    duration,
    volume,
    progress,
    error,
    stream,

    // 方法
    play,
    pause,
    togglePlay,
    seek,
    setVolume,
    loadAndPlay,

    // 事件处理器
    handlePlay,
    handlePause,
    handleTimeUpdate,
    handleLoadedMetadata,
    handleEnded,
    handleError,
  };
};
