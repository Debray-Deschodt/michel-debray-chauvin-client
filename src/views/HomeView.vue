<script setup lang="ts">
</script>

<template>
  <section id="home">
    <img src="../assets/img/home.jpg" draggable="true" @dragstart.prevent />
  </section>
</template>

<style scoped lang="scss">
@use '@/assets/base.scss' as *;

#home {
  position: absolute;
  // top: 134px;
  top: calc(8svh + 55px);
  left: 340px;
}

img {
  width: 840px;
  height: 369px;
}
</style>