<script setup lang="ts">
    import { ref } from 'vue'
    import { board } from '../constant/board'
    import Statistic from '../components/Play/Statistic.vue';
    import Button from "primevue/button"
    const createBoard = ref(board);
    const shuffledArray = ref(createBoard.value.sort(() => 0.5 - Math.random()));

    const handleNumberClick = (val: any) => {
        shuffledArray.value[val].clicked = true
    }

    const handleRestart = () => {
        shuffledArray.value = createBoard.value.sort(() => 0.5 - Math.random())
        shuffledArray.value.map((newArray) => {
            newArray.clicked = false
        })
    }
</script>

<template>
    <div class="text-center">
        <span>Disintegrated Gameplay</span>
        <h2>Bingo Selawe</h2>

        <div class="card">
            <div 
                v-for="index in 5" 
                :key="index" 
                class="flex flex-wrap justify-content-center card-container blue-container gap-2 mb-2"> 
                <div 
                    v-for="innerIndex in 5" 
                    :key="innerIndex">
                    <Button 
                        v-if="shuffledArray[(5 * (index-1)) + innerIndex - 1].clicked"
                        severity="secondary"
                        @click="handleNumberClick((5 * (index-1)) + innerIndex - 1)"
                        class="
                            transition-transform transition-duration-500
                            w-5rem h-5rem text-white font-bold flex align-items-center justify-content-center">{{ shuffledArray[(5 * (index-1)) + innerIndex - 1].value }}
                    </Button>
                    <Button 
                        v-else                        
                        @click="handleNumberClick((5 * (index-1)) + innerIndex - 1)"
                        class="
                            transition-transform transition-duration-500
                            w-5rem h-5rem text-white font-bold flex align-items-center justify-content-center">{{ shuffledArray[(5 * (index-1)) + innerIndex - 1].value }}
                    </Button>
                </div>
            </div> 
        </div>
    </div>
    <Statistic :data="shuffledArray" @onRestart="handleRestart"/>
</template>