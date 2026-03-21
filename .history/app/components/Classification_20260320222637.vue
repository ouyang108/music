<script setup lang="ts">
// const { data, status, error, refresh, clear } = await useFetch('/api/modules', {
//   pick: ['title'],
// toplist/detail
// })
const appConfig = useAppConfig();
const { baseURL } = appConfig;
const {
  data,
}: { data: any; status: any; error: any; refresh: any; clear: any } =
  await useFetch(baseURL + "toplist/detail");
const list = ref([]);
useClient(() => {
  // 截取前五条数据
  if (data.value && data.value.list) {
    list.value = data.value.list.slice(0, 5);
  }
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
        v-for="item in list"
        :key="item.id"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped></style>
