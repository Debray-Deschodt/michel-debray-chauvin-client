<script setup lang="ts">
</script>

<template>
    <section>
        <img src="../assets/img/instagram.jpg" />
        <img src="../assets/img/youtube.jpg" />
    </section>
</template>

<style scoped lang="scss">
@use '@/assets/base.scss' as *;
@use '@/assets/animations.scss' as *;

section {
    display: flex;
    margin: calc(11.5svh - 17px) 22px; //96px 22px
    transform-origin: 0% 0%;
    scale: 0.2;
    gap: 74px;
    opacity: 0.7;
    width: fit-content;
    align-items: center;

    & img {
        cursor: pointer;
        transition: opacity 0.2s ease-in-out;

        &:hover {
            opacity: 0.65;
        }
    }
}
</style>
