<script setup lang="ts">
import Dexie, { type EntityTable } from "dexie";
import { Input } from "@/components/ui/input";
// 点击添加
const add = () => {
  // 这里可以添加一些逻辑，比如打开一个对话框让用户输入歌单信息
  console.log("添加歌单");
};
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
      <Dialog>
        <template #trigger>
          <Icon
            name="mynaui:heart-plus"
            class="cursor-pointer"
            @click="add"
            style="color: rgb(30, 215, 96)"
          />
        </template>
        <template #title> 创建新歌单 </template>
        <template #content>
          <div class="grid gap-4">
            <div class="grid gap-3">
              <Label for="username-1">Username</Label>
              <Input
                id="username-1"
                name="username"
                default-value="@peduarte"
              />
            </div>
          </div>
        </template>
      </Dialog>
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
