<script setup lang="ts">
import { textData_about } from '@/data/textData';
import { onMounted, onUnmounted } from 'vue';

const emit = defineEmits<{
  (e: 'wheelEventAvailable', available: boolean): void
}>()

const html = {
  get about() {
    return document.querySelector('#about')
  }
}

const isOverflown = () => {
  if (html.about!.scrollHeight == html.about!.clientHeight) {
    emit('wheelEventAvailable', true)
  } else {
    emit('wheelEventAvailable', false)
    window.onwheel = () => { }
  }
}

onMounted(() => {
  window.onresize = isOverflown
  isOverflown()
})

onUnmounted(() => {
  window.onresize = () => { }
  emit('wheelEventAvailable', true)
})
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
    <div class="notranslate" style="border-left: 2px solid #a7a7a7; padding-left: 29px; height: 488px;">
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
  // top: 134px;
  top: calc(8vh + 55px);
  left: calc(200px + 6vw + 2vh); //340px  
  height: calc(92vh - 55px - 3vh - 19px - 20px);
  overflow: auto;
  padding: 0 70px 20px 0;
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

@media screen and (max-width: 700px) {
  #about img {
    display: none;
  }
}

@media screen and (max-width: 850px) {
  img {
    width: calc(81vw - 438px);
  }

  #about {
    gap: 3vw;
  }
}

@media screen and (max-width: 1220px) {
  .notranslate {
    display: none;
  }

  #about {
    padding: 0 0 20px 0;
  }

  #about::-webkit-scrollbar {
    width: 4px;
  }
}

@media screen and (max-width: 1290px) {
  #about {
    padding: 0 15px 20px 0;
  }
}
</style>