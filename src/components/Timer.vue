<script setup lang="ts">
  import { ref, onBeforeUnmount, computed } from 'vue';
  import {useTimerStore} from '../stores/data';

// const timerRunning = ref(false);
// const countdownRunning = ref(false);
 // Initial countdown time in seconds
const time = ref(0)
const iTime = ref(0);
let intervalId:any = null;
const store = useTimerStore()

const formattedTime = computed(() => {
  const minutes = Math.floor(time.value / 60);
  const seconds = time.value % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
});
const countdownFormattedTime = computed(() => {
  const minutes = Math.floor(iTime.value / 60);
  const seconds = iTime.value % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
});

const startTimer = () => {
  store.timerRunning = true;
  intervalId = setInterval(() => {
    time.value++;
  }, 1000);
};

const stopTimer = () => {
  clearInterval(intervalId);
  store.timerRunning = false;
  iTime.value = store.countdown;
  countDown();
};
const countDown = () => {
  store.countdownRunning = true;
    intervalId = setInterval(() => {
        if (iTime.value != 0) {
          iTime.value--;
        }
        else {
          store.countdownRunning = false;
          clearInterval(intervalId);
          startTimer();
        }
    }, 1000);
};

onBeforeUnmount(() => {
  clearInterval(intervalId);
});

// const progress = computed(() => ((countdown.value - time.value) / countdown.value) * 100);
</script>

<template>

    <div class="w-96 h-96 flex flex-col items-center justify-center rounded-full shadow-2xl bg-secondary">
      <h1 v-if="store.timerRunning" class="text-8xl font-bold text-white">{{ formattedTime }}</h1>
      <h1 v-if="store.countdownRunning" class="text-8xl font-bold text-white">{{ countdownFormattedTime }}</h1>
      <button @click="startTimer" v-if="!store.timerRunning && !store.countdownRunning" class="text-6xl font-bold text-white">Start</button>
      <button @click="stopTimer" v-if="store.timerRunning && !store.countdownRunning" class="text-2xl text-white">Break</button>
    </div>
  </template>















<style scoped>
  .progress-container {
  width: 450px;
  height: 450px;
  border-radius: 50%;
  border: 1px solid red;
  overflow: hidden;
}

  .progress-circle {
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
  }
</style>
  

  
<!-- // const radius = 50;
// const circumference = 2 * Math.PI * radius;
// const viewBox = `0 0 ${2 * radius} ${2 * radius}`;
// const progressColor = '#4caf50';
// const dashoffset = computed(() => circumference - (progress.value / 100) * circumference); -->

  <!-- <div class="progress-container">
    <svg class="progress-circle" :viewBox="viewBox">
    <circle 
      cx="50%" 
      cy="50%" 
      :r="radius" 
      fill="transparent" 
      stroke="#eee" 
      stroke-width="5">
    </circle>
    <circle v-if="timerRunning" 
      cx="50%" 
      cy="50%" 
      :r="radius" 
      fill="transparent" 
      :stroke="progressColor" 
      :stroke-width="5" 
      :stroke-dasharray="circumference" 
      :stroke-dashoffset="dashoffset"
    >
    </circle>
  </svg>
</div> -->