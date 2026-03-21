<script setup></script>
<template>
  <div class="dark flex w-full min-h-screen bg-background text-primary">
    <NavBar />
    <main class="grow flex">
      <Header />
      <slot class="flex-1" />
    </main>
  </div>
</template>
<style lang="scss" scoped></style>
