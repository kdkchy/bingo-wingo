<script setup lang="ts">
import { ref, onMounted } from "vue";
import { board } from "../constant/board";
import Statistic from "../components/Play/Statistic.vue";
import Button from "primevue/button";
import JSConfetti from "js-confetti";

let jsConfetti: JSConfetti | null = null;

onMounted(() => {
  jsConfetti = new JSConfetti();
});

const fireConfetti = () => {
  jsConfetti?.addConfetti({
    emojis: ["WINNER!"],
    emojiSize: 500,
    confettiNumber: 30,
    confettiColors: [
      "#ff0a54",
      "#ff477e",
      "#ff7096",
      "#ff85a1",
      "#fbb1bd",
      "#f9bec7",
    ],
  });
};

const createBoard = ref(board.map((item) => ({ ...item })));
const shuffledArray = ref(
  createBoard.value.map((item) => ({ ...item })).sort(() => 0.5 - Math.random())
);
const matrix = ref(Array.from({ length: 5 }, () => Array(5).fill(0)));

const handleNumberClick = (val: any) => {
  shuffledArray.value[val].clicked = true;

  const row = Math.floor(val / 5);
  const col = val % 5;

  matrix.value[row][col] = 1;

  checkWin();
};
const wins = ref(0);

const handleRestart = () => {
  wins.value = 0;
  shuffledArray.value = createBoard.value.sort(() => 0.5 - Math.random());
  shuffledArray.value.map((newArray) => {
    newArray.clicked = false;
  });
};

const checkWin = () => {
  const m = matrix.value;
  wins.value = 0;

  for (let r = 0; r < 5; r++) {
    if (m[r].every((x) => x === 1)) {
      wins.value++;
    }
  }

  for (let c = 0; c < 5; c++) {
    let full = true;
    for (let r = 0; r < 5; r++) {
      if (m[r][c] !== 1) {
        full = false;
        break;
      }
    }
    if (full) wins.value++;
  }

  let diag1 = true;
  for (let i = 0; i < 5; i++) {
    if (m[i][i] !== 1) diag1 = false;
  }
  if (diag1) wins.value++;

  let diag2 = true;
  for (let i = 0; i < 5; i++) {
    if (m[i][4 - i] !== 1) diag2 = false;
  }
  if (diag2) wins.value++;

  if (wins.value === 5) {
    fireConfetti();
  }

  return wins.value === 5;
};
</script>

<template>
  <div class="text-center">
    <span>Disintegrated Gameplay</span>
    <h2>Bingo Selawe</h2>

    <div class="card">
      <div
        v-for="index in 5"
        :key="index"
        class="flex flex-wrap justify-content-center card-container blue-container gap-2 mb-2"
      >
        <div v-for="innerIndex in 5" :key="innerIndex">
          <Button
            v-if="shuffledArray[5 * (index - 1) + innerIndex - 1].clicked"
            severity="secondary"
            @click="handleNumberClick(5 * (index - 1) + innerIndex - 1)"
            class="transition-transform transition-duration-500 w-5rem h-5rem text-white font-bold flex align-items-center justify-content-center"
            >{{ shuffledArray[5 * (index - 1) + innerIndex - 1].value }}
          </Button>
          <Button
            v-else
            @click="handleNumberClick(5 * (index - 1) + innerIndex - 1)"
            class="transition-transform transition-duration-500 w-5rem h-5rem text-white font-bold flex align-items-center justify-content-center"
            >{{ shuffledArray[5 * (index - 1) + innerIndex - 1].value }}
          </Button>
        </div>
      </div>
    </div>
  </div>
  <div class="text-center">
    <p class="text-2xl">Row Completed: {{ wins }}</p>
  </div>

  <Statistic
    :matrix="matrix"
    :data="shuffledArray"
    @onRestart="handleRestart"
  />
</template>
