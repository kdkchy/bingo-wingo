<script setup lang="ts">
import Button from "primevue/button"
</script>

<template>
    <div class="flex flex-wrap justify-content-center gap-3"> 
        <router-link :to="{name: 'Disintegrated Gameplay'}" custom v-slot="{ navigate }">       
            <Button label="Disintegrated Gameplay" @click="navigate"/>
        </router-link>

        <router-link :to="{name: 'Integrated Gameplay'}" custom v-slot="{ navigate }">    
            <Button label="Integrated Gameplay" @click="navigate"/>
        </router-link>
    </div>
</template>