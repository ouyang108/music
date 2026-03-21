<script setup lang="ts">
import Dexie, { type EntityTable } from "dexie";
const cacheDB = new Dexie("musicCache");
cacheDB.version(1).stores({
  playlists: "++id, name, tracks",
});
onMounted(() => {
  console.log(cacheDB);
});
</script>
<template>
  <div class="flex-1 flex flex-col">
    <div class="flex justify-between items-center mb-3 px-2">
      <h2 class="text-gray text-sm uppercase font-semibold">我的歌单</h2>
      <button
        id="createPlaylist"
        class="text-primary hover:text-primary/80 transition-colors"
      >
        <i class="fa fa-plus"></i>
      </button>
    </div>
    <ul
      id="playlistContainer"
      class="space-y-1 flex-1 overflow-y-auto scrollbar-hide"
    >
      <!-- 动态生成自定义歌单 -->
      <!-- 因为需要从浏览器的indexedDB中获取数据，所以只能在客户端渲染 -->
      <ClientOnly></ClientOnly>
    </ul>
  </div>
</template>
<style lang="scss" scoped></style>
