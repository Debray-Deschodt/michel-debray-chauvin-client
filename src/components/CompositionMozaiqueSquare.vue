<script setup lang="ts">
import { compositionsData } from '@/data/paintingsData';

const emit = defineEmits<{
    // (e: 'loaded', from: number): void,
    (e: 'viewer', painting: number): void
}>()

const props = defineProps({
    data: {
        type: Number,
        required: true
    }
})

// const images = {
//     content: [new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image(),],
//     loaded: 0,
//     set imagesSetter(data: number) {
//         for (let i = 0; i < 16; i++) {
//             this.content[i].src = compositionsData[data][i] + '.jpg'
//             this.content[i].onload = () => this.loaded++
//         }
//     }
// }

// watch(() => images.loaded, () => {
//     if (images.loaded == 16) emit('loaded', props.data)
// })

// onMounted(() => {
//     const img = document.querySelector('#image13') as HTMLImageElement
//     img.src = 'src/images/2000x2000/4.jpg'
// })

</script>

<template>
    <section class="composition-mozaique-square" draggable="true" @dragstart.prevent>
        <div class="flex">
            <img :id="'image' + pict" v-for="pict in compositionsData[props.data]" :key="pict"
                :src="'/assets/img/100/' + pict + '.jpg'" @click="emit('viewer', pict)" class="pict" />
        </div>
    </section>
</template>

<style scoped lang="scss">
@use '@/assets/base.scss' as *;
@use '@/assets/animations.scss' as *;

.flex {
    display: flex;
    flex-wrap: wrap;
    width: 39svh; //400px
    height: 39svh; //400px
    gap: 0;
    margin: 2svh; //20px
}

.pict {
    background-size: cover;
    width: 25%;
    height: 25%;
    transition: all 0.1s ease-in-out;

    &:hover {
        filter: brightness(0.95);
        cursor: pointer;
    }
}
</style>
