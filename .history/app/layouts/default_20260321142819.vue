<script setup></script>
<template>
  <div class="flex flex-col">
    <div
      class="dark flex w-full min-h-screen bg-background text-primary overflow-hidden grow"
    >
      <NavBar />
      <main
        class="grow flex flex-col min-h-0 h-full overflow-auto"
        style="height: calc(100vh - 80px)"
      >
        <Header />
        <div class="flex-1 min-h-0">
          <slot />
        </div>
      </main>
    </div>
    <div
      class="sticky border-t border-gray/10 px-6 flex items-center justify-between z-10 h-20"
    >
      123
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
