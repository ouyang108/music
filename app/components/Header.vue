<script setup lang="ts"></script>
<template>
  <div
    class="bg-primary-foreground/50 h-16 glass px-6 flex items-center justify-between sticky top-0 z-10"
  >
    <div class="relative w-96">
      <input
        type="text"
        id="searchInput"
        placeholder="搜索歌曲"
        class="w-full py-2 px-4 pl-10 bg-dark/50 rounded-full outline-none border border-gray/20 focus:border-primary transition-colors"
      />
      <Icon
        name="mynaui:search"
        class="absolute left-4 top-1/2 -translate-y-1/2 text-gray"
      ></Icon>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
