<script setup lang="ts">
import { cn } from "~/lib/utils";
import { nextTick } from "vue";
// 假设数据来自你的 Composable
const {
  currentMusic,
  musicList,
  changeMusic,
  changeCurrentMusicIndex,
  currentIndexMusic,
  activeIndex,
  searchQuery,
} = useMusicList();

const filteredList = computed(() => {
  const q = searchQuery.value.trim();
  if (!q) return musicList.value;
  return musicList.value.filter((song) =>
    song.name?.toLowerCase().includes(q.toLowerCase()),
  );
});
const { getMusicUrlWithCache } = useMusicCache();
const active = ref(0);
const songScrollContainer = ref<HTMLElement | null>(null);
const favoriteIds = ref<Set<number>>(new Set());

// const toggleFavorite = (song: any) => {
//   if (!song?.id) return;
//   if (favoriteIds.value.has(song.id)) {
//     favoriteIds.value.delete(song.id);
//   } else {
//     favoriteIds.value.add(song.id);
//   }
//   favoriteIds.value = new Set(favoriteIds.value);
// };

const scrollCurrentSongIntoView = (index: number) => {
  if (index < 0 || !songScrollContainer.value) return;

  const item = document.getElementById(`song-item-${index}`);
  if (!item) return;

  const container = songScrollContainer.value;
  const containerRect = container.getBoundingClientRect();
  const itemRect = item.getBoundingClientRect();

  const targetTop =
    container.scrollTop +
    (itemRect.top - containerRect.top) -
    container.clientHeight / 2 +
    item.clientHeight / 2;

  container.scrollTo({
    top: targetTop,
    behavior: "smooth",
  });
};

const playActive = async (song: any, index: number = 0) => {
  active.value = song.id;

  // 使用共享缓存获取音乐 URL
  const url = await getMusicUrlWithCache(song.id);
  changeMusic(url);
  changeCurrentMusicIndex(index);
};
// 当分类切换的时候，需要修改currentIndexMusic
watch(activeIndex, () => {
  changeCurrentMusicIndex(-1);
});

watch(currentIndexMusic, async (newIndex) => {
  if (newIndex < 0) return;
  await nextTick();
  scrollCurrentSongIntoView(newIndex);
});

// 动态 SEO
// useSeoMeta({
//   title: () =>
//     currentMusic.value?.name
//       ? `${currentMusic.value.name} - 音乐播放器`
//       : "音乐播放器 - 在线音乐欣赏平台",
//   description: () =>
//     currentMusic.value?.description ||
//     "一个现代化的在线音乐播放器，支持海量音乐在线播放，提供流畅的音乐体验",
//   ogTitle: () =>
//     currentMusic.value?.name
//       ? `${currentMusic.value.name} - 音乐播放器`
//       : "音乐播放器",
//   ogDescription: () =>
//     currentMusic.value?.description || "在线音乐播放，流畅音乐体验",
//   ogImage: () => currentMusic.value?.picUrl || "/og-image.jpg",
//   twitterCard: "summary_large_image",
// });
</script>

<template>
  <div class="h-full flex flex-col p-6 overflow-hidden" id="songListContainer">
    <div class="category-header mb-8 shrink-0">
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
        ref="songScrollContainer"
        class="flex-1 overflow-y-auto scrollbar-hide divide-y divide-white/5"
      >
        <div
          v-for="(song, index) in filteredList"
          :id="`song-item-${index}`"
          :key="song.id"
          :class="
            cn(
              'grid grid-cols-12 px-6 py-4 items-center hover:bg-white/10 transition-all group cursor-default',
              {
                'bg-white/10': currentIndexMusic === index,
              },
            )
          "
        >
          <div
            class="col-span-1 text-gray-500 text-sm font-medium cursor-pointer"
          >
            <span class="text-gray-500 text-sm font-medium group-hover:hidden">
              {{ (index + 1).toString().padStart(2, "0") }}
            </span>

            <Icon
              @click="playActive(song, index)"
              name="mynaui:play"
              class="hidden group-hover:block cursor-pointer text-white text-xl"
            />
          </div>

          <div class="col-span-6 flex items-center gap-4">
            <img
              v-if="song.al?.picUrl"
              :src="song.al.picUrl + '?param=80y80'"
              class="w-10 h-10 rounded-md object-cover shadow-lg shrink-0"
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
              class="group-hover:opacity-100 ml-2 text-gray-400 hover:text-primary transition-all p-1 cursor-pointer"
              @click.stop="$emit('add-to-playlist', song)"
            >
              <Icon
                name="mynaui:heart"
                class="text-lg"
                :style="{ color: 'var(--text-primary)' }"
              />
            </button>
          </div>

          <div class="col-span-3 text-gray-400 text-sm truncate pr-4">
            {{ song.ar?.map((a: any) => a.name).join(" / ") || "未知歌手" }}
          </div>

          <div class="col-span-2 text-right text-gray-500 text-sm font-mono">
            {{ formatDuration(song.dt || 0) }}
          </div>
        </div>

        <div v-if="!filteredList?.length" class="py-20 text-center text-gray-500">
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
