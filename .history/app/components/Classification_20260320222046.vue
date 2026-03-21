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
    <h2 class="text-gray text-sm uppercase font-semibold mb-3 px-2">
      音乐分类
    </h2>
    <ul class="space-y-1" id="categoryList">
      <li
        class="category-item active px-3 py-2 rounded-lg cursor-pointer hover:bg-dark/50 transition-colors"
        data-type="recommend"
      >
        <i class="fa fa-compass w-5 text-center mr-2"></i>推荐
      </li>
      <li
        class="category-item px-3 py-2 rounded-lg cursor-pointer hover:bg-dark/50 transition-colors"
        data-type="pop"
      >
        <i class="fa fa-headphones w-5 text-center mr-2"></i>流行
      </li>
      <li
        class="category-item px-3 py-2 rounded-lg cursor-pointer hover:bg-dark/50 transition-colors"
        data-type="rock"
      >
        <i class="fa fa-fire w-5 text-center mr-2"></i>摇滚
      </li>
      <li
        class="category-item px-3 py-2 rounded-lg cursor-pointer hover:bg-dark/50 transition-colors"
        data-type="ancient"
      >
        <i class="fa fa-leaf w-5 text-center mr-2"></i>古风
      </li>
      <li
        class="category-item px-3 py-2 rounded-lg cursor-pointer hover:bg-dark/50 transition-colors"
        data-type="electronic"
      >
        <i class="fa fa-bolt w-5 text-center mr-2"></i>电子
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped></style>
