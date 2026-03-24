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
      class="text-primary transition-colors cursor-pointer"
    >
      <Icon name="mynaui:skip-back" class="text-xl" />
    </button>
    <button
      @click="emit('togglePlay')"
      class="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg"
    >
      <Icon
        :name="isPlaying ? 'mynaui:pause' : 'mynaui:play'"
        class="text-xl"
      />
    </button>
    <button
      @click="emit('next')"
      class="text-primary transition-colors cursor-pointer"
    >
      <Icon name="mynaui:skip-forward" class="text-xl" />
    </button>
  </div>
</template>
