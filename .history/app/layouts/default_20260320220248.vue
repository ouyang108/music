<script setup></script>
<template>
  <div class="dark flex w-full min-h-screen bg-background text-primary">
    <NavBar />
    <main>
      <Header />
      <slot />
    </main>
  </div>
</template>
<style lang="scss" scoped></style>
