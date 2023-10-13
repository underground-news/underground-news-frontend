<script setup lang="ts">
import { type ScoreStatistics, type isScoreStatistics } from '../models.js'
import ScoreStat from './ScoreStat.vue'
const props = defineProps<{
  stat: ScoreStatistics
}>()
</script>

<template>
  <div class="stats-collection">
    Name: {{ props.stat.name }}
    Scores:
    <ul>
      <li v-for="score in props.stat.scores" :key="score">
        {{ score.articleUrl }} - {{ score.score }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>
