<script setup lang="ts">
// const { data, status, error, refresh, clear } = await useFetch('/api/modules', {
//   pick: ['title'],
// toplist/detail
// })
const appConfig = useAppConfig();
const { baseURL } = appConfig;
const { data, status, error, refresh, clear } = await useFetch(
  baseURL + "toplist/detail",
);
const list = ref([]);
useClient(() => {
  console.log(data.value);
});
</script>
<template>
  <div>
    <h2 class="var(--gray) text-sm uppercase font-semibold mb-3 px-2">
      音乐分类
    </h2>
    <ul class="space-y-1" id="categoryList">
      <li
        class="category-item active px-3 py-2 rounded-lg cursor-pointer hover:bg-dark/50 transition-colors"
        data-type="recommend"
      >
        推荐
      </li>
      <li
        class="category-item px-3 py-2 rounded-lg cursor-pointer hover:bg-dark/50 transition-colors"
        data-type="pop"
      >
        流行
      </li>
      <li
        class="category-item px-3 py-2 rounded-lg cursor-pointer hover:bg-dark/50 transition-colors"
        data-type="rock"
      >
        摇滚
      </li>
      <li
        class="category-item px-3 py-2 rounded-lg cursor-pointer hover:bg-dark/50 transition-colors"
        data-type="ancient"
      >
        古风
      </li>
      <li
        class="category-item px-3 py-2 rounded-lg cursor-pointer hover:bg-dark/50 transition-colors"
        data-type="electronic"
      >
        电子
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped></style>
