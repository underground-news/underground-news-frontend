<template>
  <div>
    <h1>{{ props.article.title }}</h1>

    <div class="card">
      <p>{{ props.article.content }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type ArticleContent } from "../models.js";

const props = defineProps<{
  article: ArticleContent;
}>();
</script>

<style scoped>
/* Add your styles here */
</style>
./models