<script setup lang="ts">
import { paintingsData } from '@/data/paintingsData';
import router from '@/router';
import { computed, onMounted, onUnmounted, reactive, watch } from 'vue';
import { pageData } from '@/data/paintingsData';

const PAINTINGS_MAX = 100

const emit = defineEmits<{
    (e: 'wheelEventAvailable', available: boolean): void,
}>()

const props = defineProps({
    id: {
        type: String,
        required: true
    },
    page: {
        type: Number,
        required: true
    }
})

const paintingSize = computed(() => paintingsData[parseInt(props.id) - 1].size)

const active = reactive({
    previous: true,
    next: true
})

const eventDOM = {
    keyDown: (event: KeyboardEvent) => {
        if (event.key == 'ArrowLeft' && path.painting > 1 && pageData[props.page].includes(path.painting - 1)) {
            switchPainting(false)
        } else if (event.key == 'ArrowRight' && path.painting < PAINTINGS_MAX && pageData[props.page].includes(path.painting + 1)) {
            switchPainting(true)
        }
    },
    wheelAvailable: true,
    wheel: (event: WheelEvent) => {
        if (event.deltaY > 0 && eventDOM.wheelAvailable) {

            eventDOM.wheelAvailable = false
            setTimeout(() => {
                eventDOM.wheelAvailable = true
            }, 200)

            switchPainting(true)
        } else if (eventDOM.wheelAvailable) {

            eventDOM.wheelAvailable = false
            setTimeout(() => {
                eventDOM.wheelAvailable = true
            }, 200)

            switchPainting(false)
        }
    }
}

const path = {
    get reducedPath() {
        const pathSplited = router.currentRoute.value.fullPath.split('/')
        pathSplited.pop()
        return pathSplited.join('/')
    },
    get painting() {
        const pathSplited = router.currentRoute.value.fullPath.split('/')
        return parseInt(pathSplited[pathSplited.length - 1])
    }
}

const switchPainting = (next: boolean) => {
    if (next && path.painting < PAINTINGS_MAX && pageData[props.page].includes(path.painting + 1)) {
        router.push(path.reducedPath + '/' + (path.painting + 1))
    } else if (!next && path.painting > 1 && pageData[props.page].includes(path.painting - 1)) {
        router.push(path.reducedPath + '/' + (path.painting - 1))
    }
}

const getBack = () => {
    router.push(path.reducedPath)
}

watch(() => props.id, () => {
    (pageData[props.page][pageData[props.page].length - 1] == parseInt(props.id)) ? active.next = false : active.next = true;
    (pageData[props.page][0] == parseInt(props.id)) ? active.previous = false : active.previous = true
})

onMounted(() => {
    emit('wheelEventAvailable', false) //!\\ attention
    window.onwheel = eventDOM.wheel
    window.onkeydown = eventDOM.keyDown;
    (pageData[props.page][pageData[props.page].length - 1] == parseInt(props.id)) ? active.next = false : active.next = true;
    (pageData[props.page][0] == parseInt(props.id)) ? active.previous = false : active.previous = true
})

onUnmounted(() => {
    window.onkeydown = () => { }
    emit('wheelEventAvailable', true)
})

</script>

<template>
    <section id="viewer">
        <section class="flex" draggable="true" @dragstart.prevent>
            <Transition name="fade" mode="out-in">
                <a :key="props.id" TARGET="_blank" :href="`/assets/img/1000/${props.id}.jpg`">
                    <img :src="`/assets/img/${paintingSize[0]}/${props.id}.jpg`" :key="props.id"
                        :style="`width: ${paintingSize[0]}px; height: ${paintingSize[1]}px;`" />
                </a>
            </Transition>

            <div @click="getBack()">
                <div>
                    <div />
                    <div />
                    <div />
                </div>
            </div>

        </section>

        <p>{{ paintingsData[parseInt(props.id) - 1].info }}</p>

        <section class="flex-console" draggable="true" @dragstart.prevent>
            <div @click="switchPainting(false)">
                <div v-if="active.previous" />
            </div>
            <div @click="switchPainting(true)">
                <div v-if="active.next" />
            </div>
        </section>

    </section>
</template>

<style scoped lang="scss">
@use '@/assets/base.scss' as *;
@use '@/assets/animations.scss' as *;

#viewer {
    position: absolute;
    top: 20px;
    left: 20px;
}

p {
    margin-top: 10px;
    font-size: 12px;
}

.flex {
    display: flex;
    align-items: end;
    gap: 45px;


    &>div {
        padding: 25px;
        margin-bottom: -25px;
        cursor: pointer;
        opacity: 0.5;
        transition: filter 0.2s ease-in-out;

        &>div {
            display: flex;
            flex-wrap: wrap;
            gap: 4%;
            width: 21px;
            height: 21px;

            & div {
                background-color: black;
                width: 47%;
                height: 47%;
            }
        }

        &:hover {
            filter: contrast(0.5) brightness(1.5);
        }
    }
}



.flex-console {
    display: flex;
    margin-top: 15px;

    &>div {
        padding: 20px;
        width: 11px;
        cursor: pointer;
        opacity: 0.5;
        transition: filter 0.2s ease-in-out;

        &:hover {
            filter: contrast(0.5) brightness(1.5);
        }
    }

    & div div {
        display: inline-block;
        height: 0;
        width: 0;
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
        border-left: 9px solid black;
    }

    & :nth-child(1) div {
        transform: scaleX(-1)
    }

    &> :nth-child(1) {
        margin-left: -20px;
    }
}

.fade-enter-active {
    animation: fade 0.05s ease-out;
}

.fade-leave-active {
    animation: fade 0.1s reverse ease-in;
}
</style>