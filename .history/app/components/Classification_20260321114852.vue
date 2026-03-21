<script setup lang="ts">
interface TopList {
  id: number;
  name: string;
  coverImgUrl: string;
  updateFrequency: string;
}
const appConfig = useAppConfig();
const { baseURL } = appConfig;
const {
  data,
}: { data: any; status: any; error: any; refresh: any; clear: any } =
  await useFetch(baseURL + "toplist/detail");

const list = computed(() => data.value?.list?.slice(0, 5) || []);
const changeMusic = (item: TopList) => {
  // 调用接口获取数据
  console.log(item);
};
</script>
<template>
  <div>
    <h2 class="text-gray text-sm uppercase font-semibold mb-3 px-2">
      音乐分类
    </h2>
    <ul class="space-y-1" id="categoryList">
      <li
        class="category-item active px-3 py-2 rounded-lg hover:bg-primary-foreground/50 cursor-pointer transition-colors"
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
