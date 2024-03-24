<script setup lang="ts">
</script>

<template>
    <footer>
        <p>© 2024 Tous droits réservés. Design by Paul Debray-Deschodt</p>
        <div>
            <RouterLink :to="'/terms-and-conditions_privacy-policy'">
                <p>Mentions légales & politique de confidentialité</p>
            </RouterLink>
        </div>
    </footer>
</template>

<style scoped lang="scss">
@use '@/assets/base.scss' as *;
@use '@/assets/animations.scss' as *;

footer {
    position: absolute;
    top: calc(97vh - 19px);
    left: calc(200px + 6vw + 2vh);
    // font-size: 11px;
    font-size: calc(6px + 0.206vw);
    display: flex;
    justify-content: space-between;
    // min-width: 635px;

    width: calc(82vh + 4px);
    padding: 1vh 0 0 0;

    border-top: 1px solid #b8b8b8;
    background-color: white;

    & :nth-child(2) {
        cursor: pointer;

        &:hover {
            text-decoration: underline #b8b8b8;
        }
    }
}

p {
    width: fit-content;
    color: #202020
}

@media screen and (max-height: 650px) {
    footer {
        display: block;
    }
}
</style>
