<script setup lang="ts">
import { textData_exhibitions } from '@/data/textData';
</script>

<template>
    <section id="exhibitions">
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
</template>

<style scoped lang="scss">
@use '@/assets/base.scss' as *;

#exhibitions {
    position: absolute;
    top: 134px;
    left: 340px;
    display: flex;
    gap: 40px;

    &> :nth-child(2) {
        height: fit-content;
        padding: 0 20px;
        margin-left: 150px;
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

img {
    width: 300px
}
</style>