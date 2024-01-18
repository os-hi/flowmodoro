<script setup lang="ts">
    import {useTimerStore} from '../stores/data';
    import { reactive } from 'vue';

    const store = useTimerStore()
    const data = reactive({
        activeButton: 5,
    });
  
    const setActive = (minute:any) => {
        data.activeButton = minute;
        store.breaktime(minute)
    };
</script>

<template>
    <div class="flex justify-around items-center rounded-full border-2 border-secondary">
        <button 
            v-for="minute in [5,10]" 
            @click="setActive(minute)"
            :class="{ 'active': data.activeButton === minute }"
            class="text-white text-2xl rounded-full px-10 py-4">
            {{ minute }} minutes
        </button>
    </div>
</template>

<style scoped>
.active {
    background-color: #2a282e;
  }
</style>