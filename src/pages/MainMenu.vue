<script setup lang="ts">
import MainMenu from '../components/Main/MainMenu.vue';
</script>


<template>
    <div class="card">
        <div class="flex align-content-center justify-content-center flex-wrap main-section">
            <div class="card-container">
                <div class="flex justify-content-center">
                    <h1>BINGO SELAWE</h1>
                </div>
                <div class="flex justify-content-center">
                    <p>Main Menu</p>
                </div>
                <div class="flex justify-content-center">
                    <MainMenu/>                  
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.main-section {
  min-height: 80vh;
}
</style>