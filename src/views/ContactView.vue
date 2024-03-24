<script setup lang="ts">
import axios from 'axios';
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
    post: async () => {
        textarea.placeholder.value = 'Message envoyé'
        const args = { message: message.value }
        await axios.post('/contact', args)
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
    if (message.value != '') {
        textarea.HTML?.setAttribute('style', 'height: 300px')
    }
})

</script>

<template>
    <section id="contact">
        <h2>CONTACT</h2>
        <div>
            <p><strong>Par e-mail : </strong><a TARGET="_blank"
                    href="mailto:michel.debray.chauvin@gmail.com">michel.debray.chauvin@gmail.com</a></p>
            <p><strong>Sur les réseaux sociaux : </strong><a>Instagram</a> et <a>YouTube</a></p>
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
    // top: 140px;
    top: calc(8vh + 55px);
    left: calc(200px + 6vw + 2vh); //340px

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
    width: calc(28vw + 80px); //31.5
    resize: none;
    outline: none;
    caret-color: rgb(67, 67, 67);
    font-size: 16px;
    padding: 4vh;
    padding-bottom: 25px;
    border: 3px solid rgb(133, 128, 128);
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
    cursor: pointer;

    transition: background-color 0.1s ease-in-out;

    &:hover {
        background-color: rgb(155, 155, 155);
    }

    &:active {
        background-color: rgb(116, 116, 116);
    }
}

strong {
    font-weight: 500;
    font-size: 14.5px;
}

a {
    font-style: normal;
    text-decoration: underline rgb(145, 145, 145);
    color: black;
    cursor: pointer;
    transition: all 0.1s ease-in-out;

    &:hover {
        color: rgb(131, 131, 131);
        text-decoration: underline rgb(158, 158, 158);
    }
}

::-webkit-scrollbar {
    width: 8px;
}

@media (max-height: 385px) {
    textarea {
        height: 20px !important;
    }
}

@media (max-height: 460px) {
    #contact {
        &>div {
            margin-bottom: 15px;
        }
    }

    p {
        margin-bottom: 8px;
    }
}

@media (max-height: 475px) {
    button {
        margin-top: 1vh;
    }

    textarea {
        font-size: 13.5px;
    }
}

@media (max-height: 515px) {
    h2 {
        display: none;
    }
}

@media (max-height: 770px) and (min-height: 385px) {
    textarea {
        height: 80px !important;
    }
}

@media (max-width: 600px) {
    p {
        font-size: 13px;
    }

    strong {
        font-size: 13.5px;
    }
}
</style>