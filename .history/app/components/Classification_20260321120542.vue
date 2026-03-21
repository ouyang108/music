<script setup lang="ts">
import { cn } from "~/lib/utils";

interface TopList {
  id: number;
  name: string;
  coverImgUrl: string;
  updateFrequency: string;
}
const appConfig = useAppConfig();
const { baseURL } = appConfig;
const activeIndex = ref(0);
const {
  data,
}: { data: any; status: any; error: any; refresh: any; clear: any } =
  await useFetch(baseURL + "toplist/detail");

const list = computed(() => data.value?.list?.slice(0, 5) || []);
const changeMusic = async (item: TopList) => {
  const { data } = await useFetch(
    baseURL + `/playlist/track/all?id=${item.id}&limit=30&offset=0`,
  );
  console.log(data.value);
};
</script>
<template>
  <div>
    <h2 class="text-gray text-sm uppercase font-semibold mb-3 px-2">
      音乐分类
    </h2>
    <ul class="space-y-1" id="categoryList">
      <li
        :class="
          cn(
            'category-item active px-3 py-2 rounded-lg hover:bg-primary-foreground/50 cursor-pointer transition-colors',
          )
        "
        data-type="recommend"
        v-for="item in list"
        :key="item.id"
        @click="changeMusic(item)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped></style>
