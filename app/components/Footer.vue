<script setup lang="ts">
import { watch, useTemplateRef } from "vue";
import { BarVisualizer } from "@/components/elevenlabs-ui/bar-visualizer";
import { useAudioPlayer } from "@/composables/useAudioPlayer";
import TrackInfo from "@/components/player/TrackInfo.vue";
import PlayerControls from "@/components/player/PlayerControls.vue";
import ProgressBar from "@/components/player/ProgressBar.vue";
import VolumeControl from "@/components/player/VolumeControl.vue";

const { music } = useMusicList();
const audioRef = useTemplateRef<HTMLAudioElement>("audioRef");

// 使用音频播放器 composable
const {
  isPlaying,
  currentTime,
  duration,
  volume,
  progress,
  stream,
  togglePlay,
  seek,
  setVolume,
  loadAndPlay,
  handleTimeUpdate,
  handleLoadedMetadata,
  handleEnded,
  handleError,
} = useAudioPlayer(audioRef);

// 监听音乐变化，自动加载并播放
watch(music, async (newUrl) => {
  if (newUrl) {
    await loadAndPlay(newUrl);
  }
});

// TODO: 实现上一曲/下一曲功能
const handlePrevious = () => {
  console.log("上一曲");
};

const handleNext = () => {
  console.log("下一曲");
};
</script>

<template>
  <div
    class="sticky bottom-0 w-full h-20 border-t border-white/5 bg-background backdrop-blur-xl z-50 overflow-hidden"
  >
    <div class="absolute inset-0 -z-10 pointer-events-none opacity-40">
      <BarVisualizer
        class="visualizer-render"
        :mediaStream="stream"
        :barCount="20"
      />
    </div>

    <div class="relative flex items-center justify-between px-8 h-full">
      <TrackInfo :music="null" :isPlaying="isPlaying" />

      <div class="flex flex-col items-center gap-2 w-2/4 max-w-xl">
        <PlayerControls
          :isPlaying="isPlaying"
          @togglePlay="togglePlay"
          @previous="handlePrevious"
          @next="handleNext"
        />
        <ProgressBar
          :progress="progress"
          :currentTime="currentTime"
          :duration="duration"
          @seek="seek"
        />
      </div>

      <div class="flex items-center w-1/4 justify-end">
        <VolumeControl :volume="volume" @volumeChange="setVolume" />
      </div>
    </div>

    <audio
      ref="audioRef"
      crossorigin="anonymous"
      @ended="handleEnded"
      @timeupdate="handleTimeUpdate"
      @loadedmetadata="handleLoadedMetadata"
      @error="handleError"
    ></audio>
  </div>
</template>

<style scoped>
/* 关键：CSS Mask 遮罩，让波形在顶部边缘和左右两侧平滑淡出 */
.visualizer-render {
  width: 100%;
  height: 100%;
  /* 从底部向上颜色变浅，且左右两侧淡出，形成一种呼吸感 */
  mask-image:
    linear-gradient(to top, black 20%, transparent 90%),
    radial-gradient(circle at center, black 50%, transparent 100%);
  mask-composite: intersect;
  -webkit-mask-composite: source-in;

  /* 给波形染上主题色 */
  --primary-color: #3b82f6; /* 你的主色调 */
}

/* 如果你的 BarVisualizer 支持通过 CSS 变量改颜色 */
:deep(.bar-item) {
  background: linear-gradient(
    to top,
    var(--primary-color),
    transparent
  ) !important;
  border-radius: 4px 4px 0 0;
  filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.5));
}

/* 进度条美化 */
input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  width: 12px;
  height: 12px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
</style>
