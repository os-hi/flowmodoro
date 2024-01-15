<script setup lang="ts">
 import { ref, computed, onBeforeUnmount } from 'vue';

const timerRunning = ref(false);
const time = ref(0);
let intervalId: any = null;

const formattedTime = computed(() => {
  const minutes = Math.floor(time.value / 60);
  const seconds = time.value % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
});

const radius = 50;
const circumference = 2 * Math.PI * radius;
const viewBox = `0 0 ${2 * radius} ${2 * radius}`;
const progressColor = '#4caf50';
const dashoffset = computed(() => circumference - (progress.value / 100) * circumference);

const startTimer = () => {
  timerRunning.value = true;
  intervalId = setInterval(() => {
    time.value++;
  }, 1000);
};

const stopTimer = () => {
  timerRunning.value = false;
  clearInterval(intervalId);
};

onBeforeUnmount(() => {
  clearInterval(intervalId);
});

const progress = computed(() => (time.value / 60) * 100); 
</script>

<template>
    <div class="w-80 h-80 flex flex-col items-center justify-center rounded-full shadow-2xl">
      <div class="progress-container">
        <svg class="progress-circle" :viewBox="viewBox">
          <circle 
            cx="50%" 
            cy="50%" 
            :r="radius" 
            fill="transparent" 
            stroke="#eee" 
            stroke-width="10">
          </circle>
          <circle v-if="timerRunning" 
            cx="50%" 
            cy="50%" 
            :r="radius" fill="transparent" 
            :stroke="progressColor" 
            :stroke-width="10" 
            :stroke-dasharray="circumference" 
            :stroke-dashoffset="dashoffset"
          >
          </circle>
        </svg>
      </div>
      <h1 class="text-8xl font-bold text-white">{{ formattedTime }}</h1>
      <button @click="startTimer" v-if="!timerRunning" class="text-2xl text-white">Start</button>
      <button @click="stopTimer" v-if="timerRunning" class="text-2xl text-white">Break</button>
    </div>
  </template>
<style scoped>
  .progress-container {
  width: 100px;
  height: 100px;
}

  .progress-circle {
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
  }
</style>
  

  
