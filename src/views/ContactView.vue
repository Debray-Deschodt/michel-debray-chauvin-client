<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

const props = defineProps({
    contactPreviousMessage: {
        type: String,
        required: true
    }
})

const emit = defineEmits<{
    (e: 'wheelEventAvailable', available: boolean): void
    (e: 'contactMessage', value: string): void
}>()

const message = ref('')

const textarea = {
    get HTML() {
        return document.querySelector('#contact_textarea')
    },
    placeholder: ref(''),
    post: () => {
        textarea.placeholder.value = 'Message envoyer'
        message.value = ''
    }
}

const eventDOM = {
    focus: () => {
        emit('wheelEventAvailable', false)
        window.onwheel = () => { }
        textarea.HTML?.setAttribute('style', 'height: 300px; overflow: auto')
        textarea.placeholder.value = ''
    },
    blur: () => {
        emit('wheelEventAvailable', true)
        textarea.HTML?.setAttribute('style', 'height: 300px')
    },
}

watch(() => message.value, () => emit('contactMessage', message.value))

onMounted(() => {
    message.value = props.contactPreviousMessage
})

</script>

<template>
    <section id="contact">
        <h2>CONTACT</h2>
        <div>
            <p><strong>Par e-mail : </strong><dfn>michel-debray-chauvin@gmail.com</dfn></p>
            <p><strong>Sur les réseaux sociaux : </strong><dfn>Instagram</dfn> et <dfn>WhatsApp</dfn></p>
        </div>
        <div>
            <p><strong>Par message :</strong></p>
            <div style="margin-top: -6px">
                <textarea id="contact_textarea" v-model="message" :placeholder="textarea.placeholder.value"
                    spellcheck="false" @focus="eventDOM.focus()" @blur="eventDOM.blur()" />
            </div>
            <button @click="textarea.post()">Soumettre</button>
        </div>
    </section>
</template>

<style scoped lang="scss">
@use '@/assets/base.scss' as *;

#contact {
    position: absolute;
    top: 140px;
    left: 340px;

    &>div {
        margin-bottom: 55px;
    }
}

h2 {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 35px;
}


p {
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 20px;
}

textarea {
    height: 80px;
    width: 600px;
    resize: none;
    outline: none;
    caret-color: rgb(67, 67, 67);
    font-size: 16px;
    padding: 25px;
    border: 3px solid rgb(133, 128, 128);
    // border-radius: 1px;
    overflow: hidden;
}

button {
    background-color: rgb(133, 133, 133);
    color: white;
    border-radius: 1px;
    width: 150px;
    text-align: left;
    padding: 5px 8px;
    font-size: 16px;
    font-weight: 500;
    border: none;
    margin-top: 10px;

    transition: background-color 0.1s ease-in-out;

    &:hover {
        background-color: rgb(155, 155, 155);
    }

    &:active {
        background-color: rgb(117, 116, 116);
    }
}

strong {
    font-weight: 500;
    font-size: 14.5px;
}

dfn {
    font-style: normal;
    text-decoration: underline;
}

::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0);
}

::-webkit-scrollbar-thumb {
    border-radius: 1px;
    background: rgba(59, 58, 58, 0.322);
}
</style>