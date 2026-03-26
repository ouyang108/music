<script setup lang="ts">
import type { Music } from "@/types/music";
const router = useRouter();
interface Props {
  music?: Music | null;
  isPlaying: boolean;
}

const props = defineProps<Props>();

function goToLyrics() {
  router.push(`/lyrics/1`);
}
</script>

<template>
  <div class="flex items-center gap-4 w-1/4">
    <div class="relative group">
      <img
        :src="music?.cover || 'https://picsum.photos/seed/cover1/56/56'"
        class="w-14 h-14 rounded-lg shadow-2xl object-cover transition-transform group-hover:scale-105 cursor-pointer"
        :alt="music?.title || '未在播放'"
        @click="goToLyrics"
      />
      <div
        v-if="isPlaying"
        class="absolute -bottom-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse"
      ></div>
    </div>
    <div class="min-w-0">
      <h4 class="text-sm font-bold text-white truncate">
        {{ music?.title || "未在播放" }}
      </h4>
      <p class="text-xs text-white/50 truncate">
        {{ music?.artist || "未知艺术家" }}
      </p>
    </div>
  </div>
</template>
