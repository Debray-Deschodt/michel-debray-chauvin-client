<script setup lang="ts">
</script>

<template>
    <footer>
        <p>© 2024 Tous droits réservés. Design by Paul Debray-Deschodt</p>
        <RouterLink :to="'/terms-and-conditions_privacy-policy'">
            <p>Mentions légales & politique de confidentialité</p>
        </RouterLink>
    </footer>
</template>

<style scoped lang="scss">
@use '@/assets/base.scss' as *;
@use '@/assets/animations.scss' as *;

footer {
    position: absolute;
    top: calc(97svh - 19px);
    left: calc(320px + 2svh);

    display: flex;
    justify-content: space-between;

    width: calc(82svh + 4px);
    min-width: 635px;

    padding: 11px 0 0 0;

    border-top: 1px solid #b8b8b8;

    & :nth-child(2) {
        cursor: pointer;

        &:hover {
            text-decoration: underline #b8b8b8;
        }
    }
}

p {
    font-size: 11px;
    width: fit-content;
    color: #202020
}
</style>
