<script setup lang="ts">
    import { ref, watch } from "vue";
    // import { Board } from '../../constant/board'
    import Button from "primevue/button"
    const props = defineProps({
        data: Array
    })
    const emits = defineEmits([
        'onRestart'
    ])

    const numberLeft = ref(25)
    const numberClicked = ref(0)
    const countNumberLeft = () => {
        let counter = 0
        props.data?.map((item: any) => {
            if(item.clicked === 'true') {
                counter++
            }
        })
        numberClicked.value = counter
        numberLeft.value = 25 - counter
    }
    const status = ref(false)

    watch(() => props.data, () => {
        console.log(1)
        countNumberLeft()
    });

    const handleRestart = () => {
        emits('onRestart')
    }
</script>

<template>
    <div class="text-center">
        <p>Live Statistic</p>
        <div class="flex flex-wrap justify-content-center card-container blue-container gap-2 mb-2">
            <div class="surface-500 m-2 p-2 border-round text-white">Number Left: {{ numberLeft }}</div>
            <div class="surface-500 m-2 p-2 border-round text-white">Number Clicked: {{ numberClicked }}</div>
            <div class="surface-500 m-2 p-2 border-round text-white">Status : {{ status }}</div>
        </div>
        <Button @click="handleRestart">Restart</Button>
    </div>

</template>