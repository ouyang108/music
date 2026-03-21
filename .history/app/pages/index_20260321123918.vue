<script setup lang="ts">
const { currentMusic, musicList } = useMusicList();
</script>
<template>
  <div class="flex-1 overflow-y-auto p-6 scrollbar-hide" id="songListContainer">
    <div class="category-header mb-6">
      <h2 id="currentTitle" class="text-3xl font-bold">
        {{ currentMusic.name }}
      </h2>
      <p class="text-gray mt-1" id="currentDesc">精选优质音乐，随心聆听</p>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
