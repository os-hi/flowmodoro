<script setup lang="ts">
  import { ref, computed, onBeforeUnmount } from 'vue';

const timerRunning = ref(false);
const countdownRunning = ref(false);
 // Initial countdown time in seconds
const time = ref(0)
const iTime = ref(0);
const countdown = ref(10);
let intervalId:any = null;

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
  timerRunning.value = true;
  intervalId = setInterval(() => {
    time.value++;
  }, 1000);
};

const stopTimer = () => {
  clearInterval(intervalId);
  timerRunning.value = false;
  iTime.value = countdown.value;
  countDown();
};
const countDown = () => {
  countdownRunning.value = true;
    intervalId = setInterval(() => {
        if (iTime.value != 0) {
          iTime.value--;
        }
        else {
          countdownRunning.value = false;
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

    <div class="w-80 h-80 flex flex-col items-center justify-center rounded-full shadow-2xl">
      <h1 v-if="timerRunning" class="text-8xl font-bold text-white">{{ formattedTime }}</h1>
      <h1 v-if="countdownRunning" class="text-8xl font-bold text-white">{{ countdownFormattedTime }}</h1>
      <button @click="startTimer" v-if="!timerRunning" class="text-2xl text-white">Start</button>
      <button @click="stopTimer" v-if="timerRunning" class="text-2xl text-white">Break</button>
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