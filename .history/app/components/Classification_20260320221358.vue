<script setup lang="ts">
// const { data, status, error, refresh, clear } = await useFetch('/api/modules', {
//   pick: ['title'],
// toplist/detail
// })
const appConfig = useAppConfig();
const { data, status, error, refresh, clear } =
  await useFetch("toplist/detail");
console.log(data.value);
console.log(appConfig.baseURL);
</script>
<template>
  <div>
    <h2 class="text-gray text-sm uppercase font-semibold mb-3 px-2">
      音乐分类
    </h2>
  </div>
</template>
<style lang="scss" scoped></style>
