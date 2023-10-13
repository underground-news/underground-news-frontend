<script setup lang="ts">
import { type ArticleScores } from '../models.js';
const props = defineProps<{
  stats: ArticleScores | null
}>()
</script>

<template>
<div class="stats-collection">
  <ul>
    <li v-for="[key, value] in Object.entries(props.stats|| {} as Record<string, unknown>)" :key="key">
        {{ key }} - {{ value }}
    </li>
  </ul>
</div>
</template>

<style scoped>
/* Add your styles here */
</style>
