<script setup lang="ts">
import Navigation from '@/components/TheNavigation.vue'
import Footer from '@/components/TheFooter.vue'
import router from './router';
import { reactive } from 'vue';

const contact = {
  message: ''
}

const eventDOM = reactive({
  wheelAvailable: true
})

</script>

<template>
  <RouterView v-slot="{ Component }">
    <Transition name="fade" mode="out-in">
      <component :is="Component" :key="router.currentRoute.value.name"
        @wheelEventAvailable="eventDOM.wheelAvailable = $event, console.log(eventDOM.wheelAvailable)"
        @contactMessage="contact.message = $event" :contactPreviousMessage="contact.message" />
    </Transition>
  </RouterView>
  <Navigation :wheelEventIsAvailable="eventDOM.wheelAvailable" />
  <Footer />
</template>

<style scoped lang='scss'>
@use '@/assets/base.scss' as *;
@use '@/assets/animations.scss' as *;
</style>
