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
  top: calc(8vh + 55px); //134px
  left: calc(200px + 6vw + 2vh); //340px
}

img {
  width: calc(((100vh - 8vh - 3vh) + (-55px - 19px)) / 0.5); //840px
  max-width: 840px;

  height: calc(((100vh - 8vh - 3vh) + (-55px - 19px)) / 1.2); //369px
  max-height: 369px;
}

@media screen and (max-width: 700px) {
  img {
    width: calc(((100vh - 8vh - 3vh) + (-55px - 19px)) / 0.7);
  }
}
</style>