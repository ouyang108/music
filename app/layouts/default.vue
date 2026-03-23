<script setup></script>
<template>
  <div class="dark flex flex-col">
    <div class="flex w-full bg-background text-primary overflow-hidden grow">
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

    <Footer />
  </div>
</template>
<style lang="scss" scoped></style>
