<script setup lang="ts">
import { paintingsData } from '@/data/paintingsData';
import router from '@/router';
import { computed, onMounted, onUnmounted, reactive, watch } from 'vue';
import { pageData } from '@/data/paintingsData';

const PAINTINGS_MAX = 138

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

const image = reactive({
    sizes: [200, 250, 330, 440],
    viewportsHeight: [360, 510, 640, 770],
    i_pageData: pageData[props.page].findIndex((index) => index == parseInt(props.id)),
    i_paintingsData: paintingsData.findIndex((paintingData) => paintingData.id == props.id),
    width: 200,
    height: 200,
    set setSize(id: number) {
        this.i_pageData = pageData[props.page].findIndex((index) => index == parseInt(props.id))
        this.i_paintingsData = paintingsData.findIndex((paintingData) => paintingData.id == props.id)
        console.log(this.i_paintingsData, paintingsData[this.i_paintingsData])
        this.width = paintingsData[this.i_paintingsData].size[0]
        this.height = paintingsData[this.i_paintingsData].size[1]
        const windowHeight = Math.max(window.innerHeight, document.documentElement.clientHeight)
        for (let i = 0; i < this.viewportsHeight.length; i++) {
            if (windowHeight < this.viewportsHeight[i]) {
                this.width = this.sizes[i]
                this.height = this.sizes[i]
                break
            }
        }
    },
})

const switchPainting = (next: boolean) => {
    if (next && path.painting < PAINTINGS_MAX && pageData[props.page][pageData[props.page].length - 1] != parseInt(props.id)) {
        router.push(path.reducedPath + '/' + (pageData[props.page][image.i_pageData + 1]))
    } else if (!next && path.painting > 1 && pageData[props.page][0] != parseInt(props.id)) {
        router.push(path.reducedPath + '/' + (pageData[props.page][image.i_pageData - 1]))
    }
}

const getBack = () => {
    router.push(path.reducedPath)
}

watch(() => props.id, async () => {
    (pageData[props.page][pageData[props.page].length - 1] == parseInt(props.id)) ? active.next = false : active.next = true;
    (pageData[props.page][0] == parseInt(props.id)) ? active.previous = false : active.previous = true

    image.setSize = parseInt(props.id);
})

onMounted(() => {
    emit('wheelEventAvailable', false) //!\\ attention
    window.onwheel = eventDOM.wheel
    window.onkeydown = eventDOM.keyDown
    image.setSize = parseInt(props.id);
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
                    <img :src="`/assets/img/${image.width}/${props.id}.jpg`" :key="props.id"
                        :style="`width: ${image.width}px; height: ${image.height}px;`" />
                </a>
            </Transition>

            <section>
                <section class="console-side">
                    <div @click="switchPainting(true)">
                        <div v-if="active.next" />
                    </div>
                    <div @click="switchPainting(false)">
                        <div v-if="active.previous" />
                    </div>
                </section>

                <div @click="getBack()">
                    <div>
                        <div />
                        <div />
                        <div />
                    </div>
                </div>
            </section>

        </section>

        <p>{{ paintingsData[image.i_paintingsData].info }}</p>

        <section class="console-bottom" draggable="true" @dragstart.prevent>
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
    touch-action: manipulation;
    // touch-action: none;
}

p {
    margin-top: 10px;
    font-size: 12px;
}

.flex {
    display: flex;
    align-items: end;
    gap: 45px;


    &>section>div {
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



.console-bottom {
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

.console-side {
    margin-left: 10px;
    display: none;

    &>div {
        padding: 20px;
        padding-top: 25px;
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

    & :nth-child(2) div {
        transform: scaleX(-1)
    }
}

.fade-enter-active {
    animation: fade 0.05s ease-out;
}

.fade-leave-active {
    animation: fade 0.1s reverse ease-in;
}

@media (max-height: 420px) and (min-width: 695px) {
    #viewer .console-bottom {
        display: none;
    }

    .flex>section {
        display: flex;
        flex-direction: row-reverse;
    }

    .console-side {
        display: flex;
        flex-direction: row-reverse;
    }

    .console-side section {
        display: block;
    }
}

@media (max-height: 420px) and (max-width: 695px) {
    .console-bottom {
        display: none;
    }

    .console-side {
        display: block;

        &>section {
            display: block;
        }
    }
}

@media (max-height: 430px) {
    .flex-console {
        margin-top: 0;
    }
}
</style>