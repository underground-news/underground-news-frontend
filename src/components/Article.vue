<template>
  <div class="article">
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
.article {
  padding: 3em;
  max-width: 700px;
}
</style>
./models