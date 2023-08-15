<template>
    <AppLayout title="Dashboard">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                <chat-room-selection
                    :rooms="chatRooms"
                    :currentRoom="currentRoom"
                    @roomchanged="setCurrentRoomAndFetchMessages"
                />
            </h2>
        </template>
        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                    <message-container :messages="currentRoomMessages" />
                    <input-message
                        :room="currentRoom"
                        v-on:messagesent="getMessages"
                    />
                </div>
            </div>
        </div>
    </AppLayout>
</template>

<script setup>
import { ref, onMounted,watch } from 'vue';
import axios from 'axios';

// Import components you are using
import AppLayout from '@/Layouts/AppLayout.vue';
import MessageContainer from "@/Pages/Chat/messageContainer.vue";
import InputMessage from "@/Pages/Chat/inputMessage.vue";
import ChatRoomSelection from "@/Pages/Chat/chatRoomSelection.vue";

const chatRooms = ref([]);
const currentRoom = ref({});
const currentRoomMessages = ref([]);

const setCurrentRoomAndFetchMessages = (newRoom) => {
    currentRoom.value = newRoom;
    getMessages();
};
watch(currentRoom, (val,oldVal) => {
    if (oldVal.id ){
        disconnect(oldVal);
    }
    connect();
});

const connect = () => {
    if (currentRoom.value.id) {
        getMessages();
        window.Echo.private("chat." + currentRoom.value.id)
            .listen('.message.new', e => {
                getMessages();
            });
    }
};
const disconnect = (room) => {
    window.Echo.leave("chat."+ room.id);
};

function getRooms() {
    axios.get('/chat/rooms')
        .then(response => {
            chatRooms.value = response.data;
            setRoom(response.data[0]);
        })
        .catch(error => {
            console.log(error);
        });
}

function setRoom(room) {
    currentRoom.value = room;
   // getMessages();
}

function getMessages() {
    axios.get(`/chat/room/${currentRoom.value.id}/messages`)
        .then(response => {
            currentRoomMessages.value = response.data;
        })
        .catch(error => {
            console.log(error);
        });
}

onMounted(() => {
    getRooms();
});
</script>
