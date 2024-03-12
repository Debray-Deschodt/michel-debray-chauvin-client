<script setup lang="ts">
import TheNavigation from '@/components/TheNavigation.vue'
import router from './router';

</script>

<template>
  <RouterView v-slot="{ Component }">
    <Transition name="fade" mode="out-in">
      <component :is="Component" :key="router.currentRoute.value.name" />
    </Transition>
  </RouterView>
  <TheNavigation draggable="true" @dragstart.prevent />
</template>

<style scoped lang='scss'>
@use '@/assets/base.scss' as *;
@use '@/assets/animations.scss' as *;
</style>
