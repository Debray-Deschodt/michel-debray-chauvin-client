<script setup lang="ts">
import { compositionsData } from '@/data/paintingsData';
import type { AnaliticsPictInterface } from '@/interface/analitics.interface';
import axios from 'axios';
import { inject, type Ref } from 'vue';

const emit = defineEmits<{
    (e: 'viewer', painting: number): void
}>()

const admin = inject<Ref<boolean>>('admin')
const analitics = inject<Ref<AnaliticsPictInterface[]>>('analitics')
const analiticsSwitcher = inject<Ref<boolean>>('analiticsSwitcher')

const props = defineProps({
    data: {
        type: Number,
        required: true
    }
})

const eventDOM = {
    pictClick: async (pict: number) => {
        if (!admin?.value) {
            const args = { id: pict }
            console.log(pict)
            axios.post('/pict', args)
        }
        emit('viewer', pict)
    }
}

</script>

<template>
    <section class="flex" draggable="true" @dragstart.prevent>
        <div class="pict" v-for="pict in compositionsData[props.data]" :key="pict" @click="eventDOM.pictClick(pict)">
            <img :id="'image' + pict" :src="'/assets/img/100/' + pict + '.jpg'" />
            <Transition name="fade" mode="out-in">
                <div v-if="admin && analiticsSwitcher" class="analitics">
                    {{ analitics?.find((_pict) => _pict.id == pict)?.weight || 0 }}
                </div>
            </Transition>
        </div>
    </section>
</template>

<style scoped lang="scss">
@use '@/assets/base.scss' as *;
@use '@/assets/animations.scss' as *;

.flex {
    display: flex;
    flex-wrap: wrap;
    width: 39vh; //400px
    height: 39vh; //400px
    gap: 0;
    margin: 2vh; //20px
}

.pict {
    position: relative;
    width: 25%;
    height: 25%;
    background-size: cover;
    transition: all 0.1s ease-in-out;

    &:hover {
        filter: brightness(0.95);
        cursor: pointer;
    }

    & img {
        width: 100%;
        height: 100%;
    }
}

.analitics {
    position: absolute;
    top: 10%;
    left: 10%;
    width: 60%;
    height: 60%;
    background-color: rgba(255, 255, 255, 0.486);
    padding: 10%;
    color: rgb(54, 54, 54);
}
</style>
