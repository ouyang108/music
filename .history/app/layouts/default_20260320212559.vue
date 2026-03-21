<script setup></script>
<template>
  <div class="dark flex w-full min-h-screen">
    <NavBar />
    <main>
      <Header />
      <slot />
    </main>
  </div>
</template>
<style lang="scss" scoped></style>
