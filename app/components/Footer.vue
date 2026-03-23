<script setup lang="ts">
import { ref, watch, useTemplateRef } from "vue";
import { BarVisualizer } from "@/components/elevenlabs-ui/bar-visualizer";
import { useAudioStream } from "@/composables/useMusic";

const { music } = useMusicList();
const { stream, playUrl } = useAudioStream();
const audioRef = useTemplateRef<HTMLAudioElement>("audioRef");

// 播放状态控制
const isPlaying = ref(false);

watch(music, async (newUrl) => {
  if (newUrl && audioRef.value) {
    await playUrl(audioRef.value, newUrl);
    isPlaying.value = true;
  }
});

const togglePlay = () => {
  if (!audioRef.value) return;
  if (audioRef.value.paused) {
    audioRef.value.play();
    isPlaying.value = true;
  } else {
    audioRef.value.pause();
    isPlaying.value = false;
  }
};
// 音频时间更新事件
const onTimeUpdate = () => {
  if (audioRef.value) {
    console.log(audioRef.value.currentTime, "通过 Ref 获取时间");
  }
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
      <div class="flex items-center gap-4 w-1/4">
        <div class="relative group">
          <img
            src="https://picsum.photos/seed/cover1/56/56"
            class="w-14 h-14 rounded-lg shadow-2xl object-cover transition-transform group-hover:scale-105"
          />
          <div
            v-if="isPlaying"
            class="absolute -bottom-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse"
          ></div>
        </div>
        <div class="min-w-0">
          <h4 class="text-sm font-bold text-white truncate">
            {{ "未在播放" }}
          </h4>
          <p class="text-xs text-white/50 truncate">
            {{ "未知艺术家" }}
          </p>
        </div>
      </div>

      <div class="flex flex-col items-center gap-2 w-2/4 max-w-xl">
        <div class="flex items-center gap-6">
          <button class="hover:text-primary transition-colors">
            <i class="fa fa-step-backward"></i>
          </button>
          <button
            @click="togglePlay"
            class="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg"
          >
            <i
              :class="['fa', isPlaying ? 'fa-pause' : 'fa-play', 'ml-0.5']"
            ></i>
          </button>
          <button class="hover:text-primary transition-colors">
            <i class="fa fa-step-forward"></i>
          </button>
        </div>

        <div class="flex items-center gap-3 w-full">
          <span class="text-[12px] font-mono text-white/40 w-8">0:00</span>
          <div class="group relative flex-1 h-1.5 flex items-center">
            <input
              type="range"
              class="absolute w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div class="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                class="h-full bg-white group-hover:bg-primary transition-colors"
                style="width: 30%"
              ></div>
            </div>
          </div>
          <span class="text-[12px] font-mono text-white/40 w-8">3:45</span>
        </div>
      </div>

      <div class="flex items-center gap-4 w-1/4 justify-end">
        <i class="fa fa-volume-up text-white/60"></i>
        <div class="w-24 h-1 bg-white/10 rounded-full relative">
          <div
            class="absolute inset-y-0 left-0 bg-white/80 rounded-full"
            style="width: 80%"
          ></div>
        </div>
      </div>
    </div>

    <audio
      ref="audioRef"
      crossorigin="anonymous"
      @ended="isPlaying = false"
      @timeupdate="onTimeUpdate"
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
