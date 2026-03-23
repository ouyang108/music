<script setup lang="ts">
interface Props {
  isPlaying: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  togglePlay: [];
  previous: [];
  next: [];
}>();
</script>

<template>
  <div class="flex items-center gap-6">
    <button
      @click="emit('previous')"
      class="hover:text-primary transition-colors"
    >
      <i class="fa fa-step-backward"></i>
    </button>
    <button
      @click="emit('togglePlay')"
      class="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg"
    >
      <i :class="['fa', isPlaying ? 'fa-pause' : 'fa-play', 'ml-0.5']"></i>
    </button>
    <button @click="emit('next')" class="hover:text-primary transition-colors">
      <i class="fa fa-step-forward"></i>
    </button>
  </div>
</template>
