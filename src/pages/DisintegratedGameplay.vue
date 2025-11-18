<script setup lang="ts">
import { ref, onMounted } from "vue";
import { board } from "../constant/board";
import Statistic from "../components/Play/Statistic.vue";
import Button from "primevue/button";
import JSConfetti from "js-confetti";

let jsConfetti: JSConfetti | null = null;

onMounted(() => {
  const canvas = document.getElementById("topCanvas") as HTMLCanvasElement;
  jsConfetti = new JSConfetti({ canvas });
});

const fireConfetti = () => {
  jsConfetti?.addConfetti({
    emojis: ["WINNER!"],
    emojiSize: 100,
    confettiNumber: 100,
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

const rowCount = ref([0, 0, 0, 0, 0]);
const colCount = ref([0, 0, 0, 0, 0]);
const diag1Count = ref(0);
const diag2Count = ref(0);

const wins = ref(0);

// ---- When number clicked ----
const handleNumberClick = (val: number) => {
  if (shuffledArray.value[val].clicked) return;

  shuffledArray.value[val].clicked = true;

  const r = Math.floor(val / 5);
  const c = val % 5;

  matrix.value[r][c] = 1;

  updateCounts(r, c, 1);

  checkWin();
};

const updateCounts = (r: number, c: number, value: number) => {
  if (value === 1) {
    rowCount.value[r]++;
    colCount.value[c]++;

    if (r === c) diag1Count.value++;
    if (r + c === 4) diag2Count.value++;
  }
};
const checkWin = () => {
  wins.value = 0;

  // row / col
  wins.value += rowCount.value.filter((x) => x === 5).length;
  wins.value += colCount.value.filter((x) => x === 5).length;

  // diagonals
  if (diag1Count.value === 5) wins.value++;
  if (diag2Count.value === 5) wins.value++;

  if (wins.value === 5) fireConfetti();
};

const handleRestart = () => {
  wins.value = 0;

  // reset matrix
  matrix.value = Array.from({ length: 5 }, () => Array(5).fill(0));

  // reset counters
  rowCount.value = [0, 0, 0, 0, 0];
  colCount.value = [0, 0, 0, 0, 0];
  diag1Count.value = 0;
  diag2Count.value = 0;

  // reset board
  shuffledArray.value = createBoard.value
    .map((i) => ({ ...i }))
    .sort(() => Math.random() - 0.5);

  shuffledArray.value.forEach((x) => (x.clicked = false));
};
</script>

<template>
  <div class="text-center">
    <canvas
      id="topCanvas"
      style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
      "
    ></canvas>
    <button @click="fireConfetti">Fire Confetti</button>
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
