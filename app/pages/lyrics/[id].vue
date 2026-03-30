<script setup lang="ts">
import { ref, computed, watch, nextTick } from "vue";

definePageMeta({
  pageTransition: false, // 禁用页面过渡，避免同一页面切歌时闪烁
});

const route = useRoute();
const id = computed(() => route.params.id);

const {
  data: res,
  pending,
  error,
} = await useLazyFetch("/api/lyric", {
  params: { id },
  watch: [id], // 监听 id 变化自动重新获取
});

if (error.value) {
  console.log("获取歌词失败");
}

// 获取全局播放时间
const { currentTime, changeSeekTime } = useMusicList();

// 返回功能
const router = useRouter();
const goBack = () => {
  // 销毁中间所有路由并跳转到首页
  router.replace("/");
};

// 歌词行接口
interface LyricLine {
  time: number; // 时间（秒）
  text: string; // 歌词文本
}

// 解析 LRC 歌词格式
const parseLyric = (lrc: string): LyricLine[] => {
  if (!lrc) return [];

  const lines = lrc.split("\n");
  const lyricLines: LyricLine[] = [];

  // 正则匹配 [mm:ss.xx] 格式
  const timeRegex = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/g;

  lines.forEach((line) => {
    const matches = [...line.matchAll(timeRegex)];
    if (matches.length > 0) {
      // 提取歌词文本（去掉所有时间标签）
      const text = line.replace(timeRegex, "").trim();

      // 一行可能有多个时间标签
      matches.forEach((match) => {
        const minutes = parseInt(match[1] || "0");
        const seconds = parseInt(match[2] || "0");
        const milliseconds = parseInt((match[3] || "0").padEnd(3, "0"));
        const time = minutes * 60 + seconds + milliseconds / 1000;

        lyricLines.push({ time, text });
      });
    }
  });

  // 按时间排序
  return lyricLines.sort((a, b) => a.time - b.time);
};
const result = computed(() => res.value);
// 解析后的歌词
const lyricLines = computed(() => {
  const lrc = result.value?.lrc?.lyric;
  return lrc ? parseLyric(lrc) : [];
});

// 当前高亮的歌词索引
const currentLineIndex = computed(() => {
  const time = currentTime.value;
  let index = 0;

  for (let i = 0; i < lyricLines.value.length; i++) {
    const line = lyricLines.value[i];
    if (line && time >= line.time) {
      index = i;
    } else {
      break;
    }
  }

  return index;
});

// 歌词容器和行的 refs
const lyricsContainer = ref<HTMLElement | null>(null);
const lyricRefs = ref<HTMLElement[]>([]);

// 设置歌词行的 ref
const setLyricRef = (el: any, index: number) => {
  if (el) {
    lyricRefs.value[index] = el;
  }
};

// 自动滚动到当前歌词
watch(currentLineIndex, async (newIndex) => {
  await nextTick();
  const currentLine = lyricRefs.value[newIndex];
  if (currentLine && lyricsContainer.value) {
    currentLine.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
});

// 点击歌词跳转到对应时间
const handleLineClick = (time: number) => {
  changeSeekTime(time);
};

// 格式化时间显示
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};
</script>

<template>
  <div
    class="fixed top-0 left-0 right-0 bottom-0 bg-linear-to-b from-background/95 to-background/80 backdrop-blur-xl z-10 h-[calc(100vh-80px)] overflow-hidden"
  >
    <!-- 返回按钮 -->
    <button
      @click="goBack"
      class="absolute cursor-pointer top-6 left-6 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 group"
      aria-label="返回"
    >
      <svg
        class="w-5 h-5 text-white/70 group-hover:text-white transition-colors"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>

    <div
      v-if="pending"
      class="flex items-center justify-center h-full text-white/50"
    >
      加载中...
    </div>

    <div
      v-else-if="lyricLines.length === 0"
      class="flex items-center justify-center h-full text-white/50 text-lg"
    >
      暂无歌词
    </div>

    <div
      v-else
      ref="lyricsContainer"
      class="h-full overflow-y-auto px-8 py-20 scrollbar-hide"
    >
      <div class="max-w-4xl mx-auto">
        <div
          v-for="(line, index) in lyricLines"
          :key="index"
          :ref="(el) => setLyricRef(el, index)"
          class="lyric-line py-4 px-6 rounded-lg transition-all duration-300 cursor-pointer"
          :class="{
            'lyric-active': index === currentLineIndex,
            'lyric-inactive': index !== currentLineIndex,
          }"
          @click="handleLineClick(line.time)"
        >
          <div class="flex items-center gap-4">
            <span class="text-xs text-white/30 font-mono min-w-12">
              {{ formatTime(line.time) }}
            </span>
            <p class="lyric-text">
              {{ line.text || "..." }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 隐藏滚动条 */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* 歌词行样式 */
.lyric-line {
  transition: all 0.3s ease;
}

.lyric-inactive {
  opacity: 0.4;
}

.lyric-inactive:hover {
  opacity: 0.7;
  background: rgba(255, 255, 255, 0.05);
}

.lyric-active {
  opacity: 1;
  background: rgba(59, 130, 246, 0.1);
  border-left: 3px solid #3b82f6;
}

.lyric-text {
  font-size: 1.25rem;
  line-height: 1.8;
  color: white;
  transition: all 0.3s ease;
}

.lyric-active .lyric-text {
  font-size: 1.5rem;
  font-weight: 600;
  color: #3b82f6;
  text-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
}
</style>
