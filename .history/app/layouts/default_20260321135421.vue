<script setup></script>
<template>
  <div
    class="dark flex w-full min-h-screen bg-background text-primary overflow-hidden"
  >
    <NavBar />
    <main class="grow flex flex-col min-h-0">
      <Header />
      <div class="flex-1 min-h-0">
        <slot />
      </div>
    </main>
  </div>
</template>
<style lang="scss" scoped></style>
