<template>
    <div class="message-item">
        <div class="username" :class="getUsernameClass()">
            {{ message.user.name }}
        </div>
        <div class="message-content bg-gray-100">
            {{ message.message }}
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps(['message']);

const getUsernameClass = () => {
    const userBackgroundColors = {
        1: 'bg-green-100',
        2: 'bg-blue-100',
        // Add more user IDs and colors as needed
    };

    const backgroundColorClass = userBackgroundColors[props.message.user.id] || 'bg-gray-100';

    return backgroundColorClass;
};

</script>

<style scoped>
.message-item {
    max-width: 75%;
    margin: 0.5rem auto;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.username {
    text-align: center;
    padding: 0.25rem;
    border-radius: 10px 10px 0 0;
    font-size: 0.875rem;
    font-weight: bold;
    color: #000000;
}

.message-content {
    word-wrap: break-word;
    padding: 0.5rem;
    border-radius: 0 0 10px 10px;
}

.bg-green-100 {
    background-color: rgba(144, 238, 144, 0.5);
}

.bg-blue-100 {
    background-color: rgba(173, 216, 230, 0.5);
}

.bg-gray-100 {
    background-color: rgba(240, 240, 240, 0.8);
}

.text-blue-700 {
    color: #3490dc;
}

.font-semibold {
    font-weight: 600;
}

.px-2 {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
}

.py-1 {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
}
</style>
