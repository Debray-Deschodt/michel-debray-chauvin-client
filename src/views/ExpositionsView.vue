<script setup lang="ts">
import { textData_exhibitions } from '@/data/textData';
import { onMounted, onUnmounted } from 'vue';

const emit = defineEmits<{
    (e: 'wheelEventAvailable', available: boolean): void
}>()

const html = {
    get about() {
        return document.querySelector('#exhibitions')
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
    <section id="exhibitions">
        <section>
            <section draggable="true" @dragstart.prevent>
                <div>
                    <img src="../assets/img/expositions02.jpg" />
                </div>
                <div>
                    <img src="../assets/img/expositions03.jpg" />
                </div>
                <div>
                    <img src="../assets/img/expositions01.jpg" />
                </div>
            </section>
            <section>
                <h3>{{ textData_exhibitions[0][0] }}</h3>
                <p>{{ textData_exhibitions[1][0] }}</p>
                <p>{{ textData_exhibitions[1][1] }}</p>
                <p>{{ textData_exhibitions[1][2] }}</p>
            </section>
        </section>
    </section>
</template>

<style scoped lang="scss">
@use '@/assets/base.scss' as *;

#exhibitions {
    position: absolute;
    // top: 134px;
    top: calc(8vh + 55px);
    left: calc(200px + 6vw + 2vh); //340px
    height: calc((100vh - 8vh - 3vh) + (-19px - 55px)); //-6vh

    overflow: auto;
    padding-right: 372px;

    &>section {
        height: calc(100vh - 8vh - 55px - 3vh - 19px - 6vh);
        display: flex;
        gap: 40px;
        min-height: 485px;
    }

    &>section> :nth-child(2) {
        height: fit-content;
        padding-left: 20px;
        margin-left: 150px;
        width: 172px;
        border-left: 1px solid rgb(116, 116, 116);
    }
}

h3 {
    font-size: 12px;
    font-weight: 500;
    margin-bottom: 15px;
}

p {
    font-size: 11px;
}

div {
    height: 31.5%;
    margin-bottom: 1.5%;

    img {
        height: 100%;
        // width: 300px;
    }
}

@media screen and (max-width: 800px) {
    #exhibitions {
        padding-right: 15px !important;

        #exhibitions::-webkit-scrollbar {
            width: 3px;
        }
    }

    #exhibitions::-webkit-scrollbar {
        width: 3px;
    }
}

@media screen and (max-width: 940px) {
    #exhibitions {
        padding-right: 200px;

        &>section> :nth-child(2) {
            margin-left: 25px;
        }
    }

    #exhibitions::-webkit-scrollbar {
        width: 3px;
    }
}

@media screen and (max-width: 1220px) {
    #exhibitions {
        padding-right: 75px;
    }

    #exhibitions::-webkit-scrollbar {
        width: 3px;
    }
}
</style>