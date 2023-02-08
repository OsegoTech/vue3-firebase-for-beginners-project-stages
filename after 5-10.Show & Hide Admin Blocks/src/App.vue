<script setup>
import { RouterView } from "vue-router";
import AppHeader from "./components/AppHeader.vue";
</script>

<template>
  <AppHeader />
  <RouterView />
  <div class="info_block_wrapper">
    <RouterView name="delivery" />
    <RouterView name="history" />
  </div>
</template>

<style scoped>
.info_block_wrapper {
  display: flex;
  flex-direction: column;
}

@media (min-width: 900px) {
  .info_block_wrapper {
    flex-direction: row;
  }
}
</style>
