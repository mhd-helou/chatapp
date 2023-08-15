<template>
    <div class="relative h-10 m-1">
        <div class="grid grid-cols-6">
            <input
                type="text"
                v-model="message"
                @input="updateTextDirection"
                @keyup.enter="sendMessage()"
                placeholder="Say something..."
                class="col-span-5 outline-none p-1 rounded-l-md border border-gray-300 text-base"
                :dir="textDirection"
            />
            <button
                @click="sendMessage()"
                class="place-self-end bg-blue-500 hover:bg-blue-700 p-1 rounded-r-md text-white">
                Send
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import axios from 'axios';

const props = defineProps(['room']);
const emits = defineEmits();
const message = ref('');
const textDirection = ref('ltr');

const sendMessage = () => {
    if (message.value.trim() === '') {
        return;
    }
    axios.post(`chat/room/${props.room.id}/message`, {
        message: message.value,
    })
        .then(response => {
            if (response.status === 201) {
                message.value = '';
                emits('messagesent');
            }
        })
        .catch(error => {
            console.log(error);
        });
};

const updateTextDirection = () => {
    // Check if the input contains Arabic characters
    textDirection.value = /[\u0600-\u06FF]/.test(message.value) ? 'rtl' : 'ltr';
};
</script>

<style scoped>
/* Add custom styles here */
.input-container {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 0;
}

.input-container input {
    border-radius: 5px 0 0 5px;
    border: 1px solid #e6e6e6;
    padding: 8px;
    transition: border-color 0.3s ease-in-out;
}

.input-container input:focus {
    border-color: #3490dc;
}

.input-container button {
    background-color: #3490dc;
    border-radius: 0 5px 5px 0;
    padding: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
}

.input-container button:hover {
    background-color: #2779bd;
}
</style>
