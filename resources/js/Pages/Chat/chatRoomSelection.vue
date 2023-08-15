<template>
    <div class="grid grid-cols-2">
        <div class="font-bold text-xl">
            {{ selectedRoom.name }} Chat
        </div>
        <div>
            <select v-model="selectedRoom" @change="$emit('roomchanged', selectedRoom)" class="float-right">
                <option v-for="(room, index) in rooms" :key="index" :value="room">
                    {{ room.name }}
                </option>
            </select>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps(['rooms', 'currentRoom']);
const selectedRoom = ref(props.currentRoom);

const emit = defineEmits();
const roomChanged = () => {
    emit('roomchanged', selectedRoom.id);
};
</script>
