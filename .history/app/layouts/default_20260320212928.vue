<script setup></script>
<template>
  <div class="flex w-full min-h-screen bg-background text-primary">
    <NavBar class="hidden lg:flex lg:w-1/3" />
    <main>
      <Header />
      <slot />
    </main>
  </div>
</template>
<style lang="scss" scoped></style>
