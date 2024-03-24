<script setup lang="ts">
import { textData_termsAndConditions } from '@/data/textData';
import { onMounted, onUnmounted } from 'vue';

const emit = defineEmits<{
    (e: 'wheelEventAvailable', available: boolean): void
}>()

onMounted(() => {
    emit('wheelEventAvailable', false)
    window.onwheel = () => { }
})

onUnmounted(() => {
    emit('wheelEventAvailable', true)
})
</script>

<template>
    <section id="termsAndConditions">
        <h2>{{ textData_termsAndConditions[0][0] }}</h2>
        <div>

            <h3>{{ textData_termsAndConditions[1][0] }}</h3>
            <div>
                <p><strong>{{ textData_termsAndConditions[2][0] }}</strong>{{ textData_termsAndConditions[2][1] }}</p>
                <p><strong>{{ textData_termsAndConditions[2][2] }}</strong>{{ textData_termsAndConditions[2][3] }}</p>
                <p><strong>{{ textData_termsAndConditions[2][4] }}</strong>{{ textData_termsAndConditions[2][5] }}</p>
                <p><strong>{{ textData_termsAndConditions[2][6] }}</strong>{{ textData_termsAndConditions[2][7] }}</p>
                <p><strong>{{ textData_termsAndConditions[2][8] }}</strong>{{ textData_termsAndConditions[2][9] }}</p>
                <p><strong>{{ textData_termsAndConditions[2][10] }}</strong>{{ textData_termsAndConditions[2][11] }}</p>
                <p>{{ textData_termsAndConditions[2][12] }}</p>
            </div>

            <h3>{{ textData_termsAndConditions[1][1] }}</h3>
            <div>
                <p>{{ textData_termsAndConditions[3][0] }}</p>
                <p><strong>{{ textData_termsAndConditions[3][1] }}</strong>{{ textData_termsAndConditions[3][2] }}</p>
                <p><strong>{{ textData_termsAndConditions[3][3] }}</strong>{{ textData_termsAndConditions[3][4] }}</p>
                <p>{{ textData_termsAndConditions[3][5] }}</p>
                <p><strong>{{ textData_termsAndConditions[3][6] }}</strong>{{ textData_termsAndConditions[3][7] }}</p>
                <p><strong>{{ textData_termsAndConditions[3][8] }}</strong>{{ textData_termsAndConditions[3][9] }}</p>
                <p><strong>{{ textData_termsAndConditions[3][10] }}</strong>{{ textData_termsAndConditions[3][11] }}</p>
            </div>

            <h3>{{ textData_termsAndConditions[1][2] }}</h3>
            <div>
                <p>{{ textData_termsAndConditions[4][0] }}</p>
                <p>{{ textData_termsAndConditions[4][1] }}</p>
                <p>{{ textData_termsAndConditions[4][2] }}</p>
                <p>{{ textData_termsAndConditions[4][3] }}</p>
                <p>{{ textData_termsAndConditions[4][4] }}</p>
            </div>

            <h3>{{ textData_termsAndConditions[1][3] }}</h3>
            <div>
                <p>{{ textData_termsAndConditions[5][0] }}</p>
                <p>{{ textData_termsAndConditions[5][1] }}</p>
                <p>{{ textData_termsAndConditions[5][2] }}</p>
            </div>

            <h3>{{ textData_termsAndConditions[1][4] }}</h3>
            <div>
                <p>{{ textData_termsAndConditions[6][0] }}</p>
                <p>{{ textData_termsAndConditions[6][1] }}</p>
                <p>{{ textData_termsAndConditions[6][2] }}</p>
                <p>{{ textData_termsAndConditions[6][3] }}</p>
                <p>{{ textData_termsAndConditions[6][4] }}</p>
            </div>

            <h3>{{ textData_termsAndConditions[1][5] }}</h3>
            <div>
                <p>{{ textData_termsAndConditions[7][0] }}</p>
                <p>{{ textData_termsAndConditions[7][1] }}</p>
                <p>{{ textData_termsAndConditions[7][2] }}</p>
            </div>

            <h3>{{ textData_termsAndConditions[1][6] }}</h3>
            <div>
                <p>{{ textData_termsAndConditions[8][0] }}</p>
                <p>{{ textData_termsAndConditions[8][1] }}</p>
                <p>{{ textData_termsAndConditions[8][2] }}</p>
                <p>{{ textData_termsAndConditions[8][3] }}</p>
            </div>

            <h3>{{ textData_termsAndConditions[1][7] }}</h3>
            <div>
                <p>{{ textData_termsAndConditions[9][0] }}</p>
            </div>

            <h3>{{ textData_termsAndConditions[1][8] }}</h3>
            <div>
                <p>{{ textData_termsAndConditions[10][0] }}</p>
                <p>{{ textData_termsAndConditions[10][1] }}</p>
                <p><strong>{{ textData_termsAndConditions[10][2] }}</strong></p>
                <p>{{ textData_termsAndConditions[10][3] }}</p>
                <p>{{ textData_termsAndConditions[10][4] }}</p>
                <p>{{ textData_termsAndConditions[10][5] }}</p>
                <p>{{ textData_termsAndConditions[10][6] }}</p>
                <p>{{ textData_termsAndConditions[10][7] }}</p>
                <p>{{ textData_termsAndConditions[10][8] }}</p>
                <p><strong>{{ textData_termsAndConditions[10][9] }}</strong></p>
                <p>{{ textData_termsAndConditions[10][10] }}</p>
            </div>

            <h3>{{ textData_termsAndConditions[1][9] }}</h3>
            <div style="padding-bottom: 50px;">
                <p>{{ textData_termsAndConditions[11][0] }}</p>
                <p>{{ textData_termsAndConditions[11][1] }}</p>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
@use '@/assets/base.scss' as *;

#termsAndConditions {
    position: absolute;

    top: calc(8vh + 55px); //134px
    left: calc(225px + 6vw); //340px

    width: 849px;
    height: calc((100vh - 8vh - 3vh) + (-55px - 19px));

    padding-right: 138px;
    overflow: auto;
    font-family: "Roboto", sans-serif;
}

h2 {
    margin: 30px 0 40px 0;
    font-size: 20px;
    font-weight: 400;
    font-family: inherit;
}

h3 {
    margin: 30px 0 20px 0;
    font-size: 17px;
    font-weight: 500;
    font-family: inherit;
}

p {
    margin-bottom: 11px;
    font-size: 15px;
    font-weight: 400;
    font-family: inherit;
    text-align: justify;
}

div {
    margin-left: 21px;
    font-family: inherit;
}

strong {
    font-weight: 500;
    font-size: 14;
    font-family: inherit;
}

@media screen and (max-width: 1350px) {
    #termsAndConditions {
        padding-right: 50px;
        width: calc(60vw - 64px);
    }
}
</style>