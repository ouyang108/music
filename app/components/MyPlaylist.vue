<script setup lang="ts">
import Dexie, { type EntityTable } from "dexie";
import { Input } from "@/components/ui/input";
import { type Song, type Playlist } from "@/utils/dexie";
import Dialog from "@/components/Dialog.vue";
import { useMusicList } from "@/composables/useTypeList";
import { cn } from "~/lib/utils";
const playlists = ref<Playlist[]>([]);
const open = ref(false);
onMounted(async () => {
  // 第一次访问 songs 表时，Dexie 会自动处理 open()
  playlists.value = await db.playlists.toArray();
});
const { changeActiveIndex, activeIndex } = useMusicList();
const content = ref("");
// 点击添加
const add = () => {
  // 这里可以添加一些逻辑，比如打开一个对话框让用户输入歌单信息
  console.log("添加歌单");
  open.value = true;
};
// 点击保存
const save = async () => {
  const res = await createPlaylist(content.value);
  if (res) {
    // 添加成功关闭对话框
    open.value = false;
    playlists.value.push({
      id: res,
      name: content.value,
      createTime: Date.now(),
    });
  }
};
// 切换
const change = (item: Playlist) => {
  changeActiveIndex(item.id!);
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
      <Icon
        name="mynaui:heart-plus"
        class="cursor-pointer"
        @click="add"
        style="color: rgb(30, 215, 96)"
      />
      <!-- <i class="fa fa-plus"></i> -->
    </div>
    <ul
      id="playlistContainer"
      class="space-y-1 flex-1 overflow-y-auto scrollbar-hide"
    >
      <!-- 动态生成自定义歌单 -->
      <!-- 因为需要从浏览器的indexedDB中获取数据，所以只能在客户端渲染 -->
      <ClientOnly>
        <li
          :class="
            cn(
              'category-item active px-3 py-2 rounded-lg hover:bg-primary-foreground/50 cursor-pointer transition-colors',
              {
                'bg-primary-foreground / 10': activeIndex === item.id,
              },
            )
          "
          data-type="recommend"
          v-for="item in playlists"
          :key="item.id"
          @click="change(item)"
        >
          {{ item.name }}
        </li>
        <template #fallback>
          <li class="px-3 py-2 text-gray-400">加载中...</li>
        </template>
      </ClientOnly>
    </ul>
    <Dialog @save="save" v-model="open" hydrate-on-idle>
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
</template>
<style lang="scss" scoped></style>
