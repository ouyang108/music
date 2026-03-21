<script setup lang="ts">
// 假设 useMusicList 返回的是网易云风格的数据结构
const { currentMusic, musicList } = useMusicList();

// 格式化时间函数 (秒 -> mm:ss)
const formatDuration = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};
</script>

<template>
  <div class="grow p-6 overflow-y-auto scrollbar-hide" id="songListContainer">
    <div class="category-header mb-8">
      <h2 id="currentTitle" class="text-3xl font-bold tracking-tight">
        {{ currentMusic?.name || "未选择分类" }}
      </h2>
      <p class="text-gray-400 mt-2 text-sm line-clamp-2" id="currentDesc">
        {{ currentMusic?.description || "暂无描述" }}
      </p>
    </div>

    <div class="bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
      <div
        class="grid grid-cols-12 px-6 py-4 border-b border-white/10 text-gray-400 text-xs uppercase tracking-wider font-semibold"
      >
        <div class="col-span-1">#</div>
        <div class="col-span-6">歌曲</div>
        <div class="col-span-3">歌手</div>
        <div class="col-span-2 text-right">时长</div>
      </div>

      <div id="songList" class="divide-y divide-white/5">
        <div
          v-for="(song, index) in musicList"
          :key="song.id"
          class="grid grid-cols-12 px-6 py-4 items-center hover:bg-white/10 transition-all group cursor-default"
        >
          <div class="col-span-1 text-gray-500 text-sm font-medium">
            {{ (index + 1).toString().padStart(2, "0") }}
          </div>

          <div class="col-span-6 flex items-center gap-4">
            <img
              v-if="song.al?.picUrl"
              :src="song.al.picUrl + '?param=80y80'"
              class="w-10 h-10 rounded-md object-cover shadow-lg"
            />
            <div class="flex flex-col min-w-0">
              <span class="text-white font-medium truncate">{{
                song.name
              }}</span>
              <span
                v-if="song.alia?.length"
                class="text-xs text-gray-500 truncate"
                >{{ song.alia[0] }}</span
              >
            </div>

            <button
              class="opacity-0 group-hover:opacity-100 ml-2 text-gray-400 hover:text-primary transition-all p-1"
              title="添加到歌单"
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
      </div>

      <div v-if="!musicList?.length" class="py-20 text-center text-gray-500">
        <i class="fa fa-music mb-4 text-3xl opacity-20"></i>
        <p>暂无歌曲数据</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 自定义颜色变量（如果 Tailwind 配置里没有这些）
.text-primary {
  color: #1db954; // 经典的播放器绿色
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}

// 简单的行过渡动画
.divide-y > div {
  animation: fadeIn 0.3s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
