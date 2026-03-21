<script setup lang="ts">
import Dexie, { type EntityTable } from "dexie";
import { Input } from "@/components/ui/input";
import { type Song } from "@/utils/dexie";

const playlists = ref<Song[]>([]);

onMounted(async () => {
  // 第一次访问 songs 表时，Dexie 会自动处理 open()
  playlists.value = await db.playlists.toArray();
  console.log("当前歌单列表:", playlists.value);
});

const content = ref("");
// 点击添加
const add = () => {
  // 这里可以添加一些逻辑，比如打开一个对话框让用户输入歌单信息
  console.log("添加歌单");
};
// 点击保存
const save = async () => {
  const res = await createPlaylist(content.value);
  console.log(res);
  if (res) {
    // 添加成功
  }
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
      <Dialog @save="save">
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
              <Input
                id="username-1"
                name="username"
                placeholder="请输入歌单名称"
                v-model="content"
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
