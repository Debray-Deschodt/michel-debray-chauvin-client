<script setup lang="ts">
import { reactive, onMounted, computed, watch } from 'vue';
import { RouterLink } from 'vue-router'
import router from '@/router'
import { destinations } from '@/data/routerData';

const VIEWER_ROUTES = [1, 2, 3]

const currentRouteIndex = computed(() => {
    return destinations.findIndex((destinations) => destinations.path == '/' + router.currentRoute.value.path.split('/')[1])
})

let timeout = setTimeout(() => { }, 0)

const HTML = reactive({
    get nav() {
        return document.querySelector('.nav')
    },
    get divDisappear() {
        return document.querySelector('.divDisappear')
    }
})

const eventDOM = {
    mouseEnter: false,
    delayed: true,
    mouseOverNavigation: () => {
        HTML.nav?.setAttribute('style', 'opacity: 1')
    },

    mouseOutNavigation: () => {
        if (VIEWER_ROUTES.includes(currentRouteIndex.value))
            HTML.nav?.setAttribute('style', 'opacity : 0.35')
    },

    wheel: (event: WheelEvent) => {
        if (event.deltaY > 0) {
            if (currentRouteIndex.value < destinations.length - 1) router.push({ path: destinations[currentRouteIndex.value + 1].path })
            if (VIEWER_ROUTES.includes(currentRouteIndex.value + 1)) {
                HTML.nav?.setAttribute('style', 'opacity: 0.35')
                HTML.divDisappear?.setAttribute('style', 'margin-top: -48px')
            } else {
                HTML.nav?.setAttribute('style', 'opacity: 1')
                HTML.divDisappear?.setAttribute('style', 'margin-top: 0px')
            }
        } else {
            if (currentRouteIndex.value > 0) router.push({ path: destinations[currentRouteIndex.value - 1].path })
            if (VIEWER_ROUTES.includes(currentRouteIndex.value - 1)) {
                HTML.nav?.setAttribute('style', 'opacity: 0.35')
                HTML.divDisappear?.setAttribute('style', 'margin-top: -48px')
            } else {
                HTML.nav?.setAttribute('style', 'opacity: 1')
                HTML.divDisappear?.setAttribute('style', 'margin-top: 0px')

            }
        }
    }
}

const refresh = () => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
        if (eventDOM.mouseEnter) {
            if (VIEWER_ROUTES.includes(currentRouteIndex.value)) {
                HTML.divDisappear?.setAttribute('style', 'margin-top: -48px')
            } else {
                HTML.divDisappear?.setAttribute('style', 'margin-top: 0px')
            }
        }
    }, 2500)

    if (!eventDOM.mouseEnter) {
        clearTimeout(timeout)
        if (VIEWER_ROUTES.includes(currentRouteIndex.value)) {
            HTML.nav?.setAttribute('style', 'opacity: 0.35')
            HTML.divDisappear?.setAttribute('style', 'margin-top: -48px')
        } else {
            HTML.nav?.setAttribute('style', 'opacity: 1')
            HTML.divDisappear?.setAttribute('style', 'margin-top: 0px')
        }
    }
}

watch(() => currentRouteIndex.value, () => refresh())

onMounted(() => {
    window.onwheel = eventDOM.wheel
    setTimeout(() => refresh(), 1000)
})

</script>

<template>
    <section id="navigation" @mouseover="eventDOM.mouseOverNavigation" @mouseout="eventDOM.mouseOutNavigation"
        @mouseenter="eventDOM.mouseEnter = true" @mouseleave="eventDOM.mouseEnter = false; refresh()"
        @click="refresh()">
        <div style="overflow:hidden">
            <div class="divDisappear">
                <RouterLink :to="'/'">
                    <h1>Michel Debray Chauvin</h1>
                </RouterLink>
                <nav class="nav">
                    <RouterLink v-for="destination in destinations" :key="destination.id" :to="destination.path">
                        <h2>{{ destination.text }}</h2>
                    </RouterLink>
                </nav>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
@use '@/assets/base.scss' as *;
@use '@/assets/animations.scss' as *;

#navigation {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: max-content;
    padding: 72px 20px 250px 50px;
}

nav {
    opacity: 1;
    transition: all 0.6s ease-out;
}

h1 {
    font-size: 18px;
    margin: 0 0 34px 20px;
    font-weight: 600;
    color: black !important;
}

h2 {
    font-size: 12px;
    font-weight: 500;
    margin: 7.5px 20px;
}

a {
    color: black;
    transition: all 0.1s ease-out;

    &:hover {
        color: rgb(170, 170, 170) !important;
    }
}

.divDisappear {
    transition: all 1s;
}

.router-exact-active-link {
    color: rgb(170, 170, 170) !important;

    &:hover {
        color: rgb(170, 170, 170) !important;
    }
}

.router-active-link {
    color: rgb(170, 170, 170) !important;

    &:hover {
        color: rgb(170, 170, 170) !important;
    }
}
</style>