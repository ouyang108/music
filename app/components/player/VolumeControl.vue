<script setup lang="ts">
interface Props {
  volume: number;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  volumeChange: [value: number];
}>();

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit("volumeChange", parseFloat(target.value));
};
</script>

<template>
  <div class="flex items-center gap-4">
    <i class="fa fa-volume-up text-white/60"></i>
    <div class="w-24 h-1 bg-white/10 rounded-full relative group">
      <input
        type="range"
        min="0"
        max="100"
        :value="volume"
        @input="handleInput"
        class="absolute w-full h-full opacity-0 cursor-pointer z-10"
      />
      <div
        class="absolute inset-y-0 left-0 bg-white/80 group-hover:bg-primary rounded-full transition-colors"
        :style="{ width: volume + '%' }"
      ></div>
    </div>
  </div>
</template>
