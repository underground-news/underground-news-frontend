<script setup lang="ts">
import { type Statistic, isScoreStatistics } from '../models.js';
import ScoreStat from './ScoreStat.vue';
const props = defineProps<{
  stats: Statistic[]
}>()
</script>

<template>
<div class="stats-collection">
  <div v-for="stat in props.stats" :key="stat.name">
    <div>
      <ScoreStat :stat="stat" v-if="isScoreStatistics(stat)" />
    </div>
  </div>
</div>
</template>


<style scoped>
.stats-collection {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px; /* Optional: for spacing between grid items */
}
.stats-collection div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
