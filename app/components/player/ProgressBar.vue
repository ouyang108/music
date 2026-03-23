<script setup lang="ts">
import { computed } from "vue";

interface Props {
  progress: number;
  currentTime: number;
  duration: number;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  seek: [percent: number];
}>();

const formatTime = (seconds: number) => {
  if (!seconds || isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit("seek", parseFloat(target.value));
};
</script>

<template>
  <div class="flex items-center gap-3 w-full">
    <span class="text-[12px] font-mono text-white/40 w-8">
      {{ formatTime(currentTime) }}
    </span>
    <div class="group relative flex-1 h-1.5 flex items-center">
      <input
        type="range"
        min="0"
        max="100"
        :value="progress"
        @input="handleInput"
        class="absolute w-full h-full opacity-0 cursor-pointer z-10"
      />
      <div class="w-full h-1 bg-white/10 rounded-full overflow-hidden">
        <div
          class="h-full bg-white group-hover:bg-primary transition-colors"
          :style="{ width: progress + '%' }"
        ></div>
      </div>
    </div>
    <span class="text-[12px] font-mono text-white/40 w-8">
      {{ formatTime(duration) }}
    </span>
  </div>
</template>
