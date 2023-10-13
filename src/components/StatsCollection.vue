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
    <ScoreStat :stat="stat" v-if="isScoreStatistics(stat)" />
  </div>
</div>
</template>

<style scoped>
/* Add your styles here */
</style>
