<script setup lang="ts">
// 假设数据来自你的 Composable
const { currentMusic, musicList } = useMusicList();

const formatDuration = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};
</script>

<template>
  <div class="h-full flex flex-col p-6 overflow-hidden" id="songListContainer">
    <div class="category-header mb-8 flex-shrink-0">
      <h2 class="text-3xl font-bold tracking-tight text-white">
        {{ currentMusic?.name || "未选择分类" }}
      </h2>
      <p class="text-gray-400 mt-2 text-sm line-clamp-2">
        {{ currentMusic?.description || "暂无描述" }}
      </p>
    </div>

    <div
      class="flex-1 min-h-0 flex flex-col bg-white/5 border border-white/5 rounded-2xl overflow-hidden"
    >
      <div
        class="grid grid-cols-12 px-6 py-4 border-b border-white/10 text-gray-400 text-xs uppercase tracking-wider font-semibold sticky top-0 bg-[#121212] z-10"
      >
        <div class="col-span-1">#</div>
        <div class="col-span-6">歌曲</div>
        <div class="col-span-3">歌手</div>
        <div class="col-span-2 text-right">时长</div>
      </div>
      <div style="height: 500px; overflow-y: auto">
        <div style="height: 100px" v-for="value in musicList">123</div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
