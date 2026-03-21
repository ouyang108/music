<script setup lang="ts">
import Dexie, { type EntityTable } from "dexie";

onMounted(() => {
  const cacheDB = new Dexie("musicCache");
  cacheDB.version(1).stores({
    songs: "++id, title, artist",
  });
});
</script>
<template>
  <div class="flex-1 flex flex-col">
    <div class="flex justify-between items-center mb-3 px-2">
      <h2 class="text-gray text-sm uppercase font-semibold">我的歌单</h2>

      <!-- <i class="fa fa-plus"></i> -->
      <Icon
        name="mynaui:heart-plus"
        class="cursor-pointer"
        style="color: rgb(30, 215, 96)"
      />
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
