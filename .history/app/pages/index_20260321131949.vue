<script setup lang="ts">
const { currentMusic, musicList } = useMusicList();
</script>
<template>
  <div class="flex-1 overflow-y-auto p-6 scrollbar-hide" id="songListContainer">
    <div class="category-header mb-6">
      <h2 id="currentTitle" class="text-3xl font-bold">
        {{ currentMusic.name }}
      </h2>
      <p class="text-gray mt-1" id="currentDesc">
        {{ currentMusic?.description || "" }}
      </p>
    </div>
    <div class="bg-light/50 rounded-xl overflow-hidden">
      <div
        class="grid grid-cols-12 px-6 py-3 border-b border-gray/10 text-gray text-sm"
      >
        <div class="col-span-1">#</div>
        <div class="col-span-6">歌曲</div>
        <div class="col-span-3">歌手</div>
        <div class="col-span-2 text-right">时长</div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
