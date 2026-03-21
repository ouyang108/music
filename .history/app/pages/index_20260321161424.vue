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

      <div
        class="flex-1 overflow-y-auto scrollbar-hide divide-y divide-white/5"
      >
        <div
          v-for="(song, index) in musicList"
          :key="song.id"
          class="grid grid-cols-12 px-6 py-4 items-center hover:bg-white/10 transition-all group cursor-default"
        >
          <div
            class="col-span-1 text-gray-500 text-sm font-medium cursor-pointer"
          >
            <span class="text-gray-500 text-sm font-medium group-hover:hidden">
              {{ (index + 1).toString().padStart(2, "0") }}
            </span>

            <Icon
              name="mynaui:play"
              class="hidden group-hover:block cursor-pointer text-white text-xl"
            />
          </div>

          <div class="col-span-6 flex items-center gap-4">
            <img
              v-if="song.al?.picUrl"
              :src="song.al.picUrl + '?param=80y80'"
              class="w-10 h-10 rounded-md object-cover shadow-lg flex-shrink-0"
            />
            <div class="flex flex-col min-w-0">
              <span class="text-white font-medium truncate">{{
                song.name
              }}</span>
              <span
                v-if="song.alia?.length"
                class="text-xs text-gray-500 truncate"
              >
                {{ song.alia[0] }}
              </span>
            </div>
            <button
              class="opacity-0 group-hover:opacity-100 ml-2 text-gray-400 hover:text-primary transition-all p-1"
              @click.stop="$emit('add-to-playlist', song)"
            >
              <i class="fa fa-plus-circle text-lg"></i>
            </button>
          </div>

          <div class="col-span-3 text-gray-400 text-sm truncate pr-4">
            {{ song.ar?.map((a: any) => a.name).join(" / ") || "未知歌手" }}
          </div>

          <div class="col-span-2 text-right text-gray-500 text-sm font-mono">
            {{ formatDuration(song.dt || 0) }}
          </div>
        </div>

        <div v-if="!musicList?.length" class="py-20 text-center text-gray-500">
          <i class="fa fa-music mb-4 text-3xl opacity-20"></i>
          <p>暂无歌曲数据</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 滚动条隐藏逻辑 */
.scrollbar-hide {
  -ms-overflow-style: none; /* IE/Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome/Safari */
  }
}

/* 确保表头背景不透明，覆盖下方滚动的内容 */
.sticky {
  background-color: #121212; /* 请确保这颜色和你列表容器背景色一致 */
}

/* 简单的文字颜色 */
.text-primary {
  color: #1db954;
}
</style>
