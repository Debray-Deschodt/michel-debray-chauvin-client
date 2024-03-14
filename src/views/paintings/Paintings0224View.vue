<script setup lang="ts">
import router from '@/router'
import { onMounted, reactive } from 'vue';
import Composition from '@/components/CompositionMozaiqueSquare.vue'

const VIEW_NAME = 'Paintings0224'
const PAGE_NUMBER = 1
const COMPOSITIONS_NUMBER = 2

const emit = defineEmits<{
    (e: 'wheelEventAvailable', available: boolean): void
}>()

const active = reactive({
    preview: true
})

const loaded = {
    _number: 0,
    get compositionsHTML() {
        return document.querySelector('#' + VIEW_NAME + ' .compositions')
    },
    numberIncrement: () => {
        console.log('loaded')
        loaded._number++
        if (loaded._number >= COMPOSITIONS_NUMBER) {
            loaded.compositionsHTML?.setAttribute('style', 'opacity: 1;')
        }
    }
}

function viewer(paintingId: number) {
    active.preview = false
    router.push({ path: router.currentRoute.value.fullPath + '/' + paintingId })
}

onMounted(() => {
    if (router.currentRoute.value.name != VIEW_NAME) active.preview = false
})

</script>

<template>
    <section :id="VIEW_NAME">
        <section v-if="active.preview" class="compositions">
            <section class="flex">
                <Composition :data="3" @viewer="viewer" @loaded="loaded.numberIncrement()" />
                <Composition :data="4" @viewer="viewer" @loaded="loaded.numberIncrement()" />
            </section>
        </section>
        <RouterView :id="$route.params.id" :page="PAGE_NUMBER"
            @wheelEventAvailable="emit('wheelEventAvailable', $event)" />
    </section>
</template>

<style scoped lang="scss">
@use '@/assets/base.scss' as *;

#Paintings0224 {
    position: absolute;
    top: calc(8svh - 10px); //68px
    left: 320px;
}

.compositions {
    opacity: 1;
    transition: all 2sec ease-in-out;
}

.flex {
    display: flex;
}
</style>