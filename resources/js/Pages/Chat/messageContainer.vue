<template>
    <div class="h-96 w-full message-container">
        <div class="h-full p-2 flex flex-col-reverse overflow-scroll">
            <div v-for="(message,index) in messages" :key="index">
                <message-item :message = "message" :class="[getMessageClass(message)]" :isCurrentUserMessage="message.user.id === currentUserId"/>
            </div>
        </div>
    </div>
</template>
<script setup>
import MessageItem from "@/Pages/Chat/messageItem.vue";
import {defineProps, onMounted, ref, watch} from 'vue';
import axios from "axios";

const props = defineProps(['messages']);
const currentUserId = ref(null);
const getMessageClass = (message) => ({
    'message-sender': message.user.id === currentUserId.value,
    'message-receiver': message.user.id !== currentUserId.value,
});
onMounted(async () => {
    try {
        const response = await axios.get('/current-user');
        currentUserId.value = response.data.id;
        console.log( currentUserId.value);
    } catch (error) {
        console.error(error);
    }
});

</script>
<style>
::-webkit-scrollbar {
    width: 0;
    background: transparent;
}
.message-container {
    max-height: 400px;
    overflow-y: hidden; /* Use "hidden" to hide the scroll bar */
}

.message-item {
    max-width: 70%;
    margin-bottom: 8px;
    padding: 8px;
    border-radius: 8px;
    display: inline-block;
    clear: both;
}

.message-sender {


    border-radius: 8px;
    padding: 10px;
    margin: 5px;
    align-self: flex-end;
    float: right;
}

.message-receiver {

    border-radius: 8px;
    padding: 10px;
    margin: 5px;
    align-self: flex-start;
    float: left;
}
</style>

