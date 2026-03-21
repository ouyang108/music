<script setup lang="ts"></script>
<template>
  <!-- <div> -->
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
  <!-- 中间播放控制 -->
  <div class="flex flex-col items-center gap-2 w-2/4">
    <div class="flex items-center gap-4">
      <button id="prevBtn" class="text-gray hover:text-white transition-colors">
        <i class="fa fa-step-backward text-xl"></i>
      </button>
      <button
        id="playBtn"
        class="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:scale-105 transition-transform"
      >
        <i class="fa fa-play text-dark text-lg"></i>
      </button>
      <button id="nextBtn" class="text-gray hover:text-white transition-colors">
        <i class="fa fa-step-forward text-xl"></i>
      </button>
      <button id="loopBtn" class="text-gray hover:text-white transition-colors">
        <i class="fa fa-repeat text-lg"></i>
      </button>
    </div>
    <div class="flex items-center gap-3 w-full">
      <span id="currentTime" class="text-xs text-gray w-10 text-right"
        >0:00</span
      >
      <input
        type="range"
        id="progressBar"
        class="progress-bar flex-1"
        value="0"
        min="0"
        max="100"
      />
      <span id="duration" class="text-xs text-gray w-10">0:00</span>
    </div>
  </div>
  <!-- </div> -->
</template>
<style lang="scss" scoped></style>
