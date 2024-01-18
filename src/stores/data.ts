import {defineStore} from 'pinia'
import {ref} from 'vue'
export const useTimerStore = defineStore('timer', () => {

    const countdown = ref(300);
    const breaktime = (time: number) =>{
        countdown.value = time*60
    }

    let timerRunning = ref(false)
    let countdownRunning = ref(false)

    
    return {timerRunning, countdownRunning, breaktime, countdown }
})