<script setup lang="ts">
import Navigation from '@/components/TheNavigation.vue'
import Footer from '@/components/TheFooter.vue'
import router from './router';
import { provide, reactive, ref } from 'vue';
import axios from 'axios';
import type { AnaliticsPictInterface } from './interface/analitics.interface';

const contact = {
  message: ''
}

const admin = ref(false)
const analitics = ref([] as AnaliticsPictInterface[])
const analiticsSwitcher = ref(false)

const eventDOM = reactive({
  wheelAvailable: true,
  analiticsClick: () => {
    const button = document.querySelector('#analiticsButton') as HTMLElement
    button.setAttribute('style', "text-decoration: line-through;")
    analiticsSwitcher.value = !analiticsSwitcher.value
    if (analiticsSwitcher.value) {
      button.setAttribute('style', "")
    } else {
      button.setAttribute('style', "text-decoration: line-through;")
    }
  }
})

const auth = async () => {
  try {
    await axios.get('/auth')
    console.log('auth')
    admin.value = true
    const res = await axios.get('/pict')
    analitics.value = res.data
    console.log(analitics.value)
  } catch (e) {
    console.log('not auth')
  }
}

auth()
provide('admin', admin)
provide('analitics', analitics)
provide('analiticsSwitcher', analiticsSwitcher)

</script>

<template>
  <RouterView v-slot="{ Component }">
    <Transition name="fade" mode="out-in">
      <component :is="Component" :key="router.currentRoute.value.name"
        @wheelEventAvailable="eventDOM.wheelAvailable = $event" @contactMessage="contact.message = $event"
        :contactPreviousMessage="contact.message" />
    </Transition>
  </RouterView>
  <Navigation :wheelEventIsAvailable="eventDOM.wheelAvailable" />
  <div v-if="admin" id="analiticsButton" @click="eventDOM.analiticsClick()" draggable="true" @dragstart.prevent>Analyse
  </div>
  <Footer />
</template>

<style scoped lang='scss'>
@use '@/assets/base.scss' as *;
@use '@/assets/animations.scss' as *;

#analiticsButton {
  position: absolute;
  top: 5vh;
  left: 80vw;
  cursor: pointer;
  color: rgb(51, 51, 51);
  transition: all 0.1s ease-in-out;

  &:hover {
    color: rgb(102, 102, 102);
  }

  &:active {
    color: rgb(0, 0, 0);
  }
}
</style>
