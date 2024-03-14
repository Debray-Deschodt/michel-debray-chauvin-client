<script setup lang="ts">
import { textData_about } from '@/data/textData';
</script>

<template>
  <section id="about">
    <img src="../assets/img/about.jpg" draggable="true" @dragstart.prevent />
    <div>
      <p>{{ textData_about[0][0] }}</p>
      <p>{{ textData_about[0][1] }}</p>
      <p>{{ textData_about[0][2] }}</p>
      <p>{{ textData_about[0][3] }}</p>
    </div>
    <div style="border-left: 2px solid #a7a7a7; padding-left: 29px; height: 488px;">
      <p style="margin-bottom: 36px;">{{ textData_about[1][0] }}</p>
      <p>{{ textData_about[1][1] }}</p>
      <p>{{ textData_about[1][2] }}</p>
      <p>{{ textData_about[1][3] }}</p>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/assets/base.scss' as *;

#about {
  position: absolute;
  top: 134px;
  left: 340px;
  display: flex;
  gap: 40px;
}

img {
  height: 506px;
  width: 240px;
}

p {
  font-weight: 500;
  font-size: 13.5px;
  margin-bottom: 18px;
  width: 279.5px;
  line-height: 18px;
}
</style>