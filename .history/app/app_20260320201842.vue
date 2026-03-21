<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
    <div class="text-red-500 text-blue-500 font-bold text-green-500">
      Hello World
    </div>
  </div>
</template>
<script setup lang="ts">
console.log(
  cn("text-red-500", "text-blue-500", "font-bold", { "text-green-500": true }),
);
</script>
