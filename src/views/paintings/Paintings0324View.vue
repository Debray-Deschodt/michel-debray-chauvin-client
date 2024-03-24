<script setup lang="ts">
import router from '@/router'
import { onMounted, reactive } from 'vue';
import Composition from '@/components/CompositionMozaiqueSquare.vue'
import Composition2 from '@/components/CompositionMozaiqueSquare2.vue'


const VIEW_NAME = 'Paintings0324'
const PAGE_NUMBER = 2
const COMPOSITIONS_NUMBER = 4

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
                <Composition :data="5" @viewer="viewer" />
                <Composition :data="6" @viewer="viewer" />
            </section>
            <section class="flex">
                <Composition :data="7" @viewer="viewer" />
                <Composition2 :data="8" @viewer="viewer" />
            </section>
        </section>
        <RouterView :id="$route.params.id" :page="PAGE_NUMBER"
            @wheelEventAvailable="emit('wheelEventAvailable', $event)" />
    </section>
</template>

<style scoped lang="scss">
@use '@/assets/base.scss' as *;

#Paintings0324 {
    position: absolute;
    top: calc(8vh - 10px); //68px
    left: calc(200px + 6vw);
}

.compositions {
    opacity: 1;
    transition: all 2sec ease-in-out;
}

.flex {
    display: flex;
    color: rgba(146, 96, 96, 0.5);
    color: rgb(216, 216, 216, 0.5);
}
</style>