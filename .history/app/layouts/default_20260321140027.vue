<script setup></script>
<template>
  <div
    class="dark flex w-full min-h-screen bg-background text-primary overflow-hidden"
  >
    <NavBar />
    <main
      class="grow flex flex-col min-h-0 h-full overflow-auto"
      style="height: 100vh"
    >
      <Header />
      <div class="flex-1 min-h-0">
        <slot />
      </div>
    </main>
    <div class="sticky bottom-0 bg-background text-primary p-2 z-10">123</div>
  </div>
</template>
<style lang="scss" scoped></style>
