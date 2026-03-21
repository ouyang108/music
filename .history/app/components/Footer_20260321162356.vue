<script setup lang="ts"></script>
<template>
  <div class="flex items-center gap-3 w-1/4">
    <img
      id="currentCover"
      src="https://picsum.photos/seed/cover1/56/56"
      class="w-14 h-14 rounded object-cover"
    />
    <div class="overflow-hidden">
      <h4 id="currentSongName" class="text-sm font-semibold truncate">
        暂无播放
      </h4>
      <p id="currentSinger" class="text-xs text-gray truncate">未知歌手</p>
    </div>
    <button
      id="toggleFavorite"
      class="text-gray hover:text-red-500 transition-colors ml-2"
    >
      <i class="fa fa-heart-o text-lg"></i>
    </button>
  </div>
</template>
<style lang="scss" scoped></style>
