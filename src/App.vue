<script setup lang="ts">
import UrlInput from './components/UrlInput.vue';

import { ref } from 'vue';
import theSunBrexitStudentLoans from './mocks/article-content-the-sun-brexit-student-loans.json';
import { type ArticleContent } from './models';

// interface ArticleContent {
//   title: string
//   content: string
//   url: string
//   favicon: string
//   newsProvider: string
// }

const article = ref<ArticleContent | null>(null)

async function getPageContent(url: string): Promise<ArticleContent> {
  // use fixture for now
  // todo: fetch from url
  url // unused
  return theSunBrexitStudentLoans
}

async function onUrlEntered(url: URL): Promise<void> {
  const content = await getPageContent(url.toString())
  console.log(content)
  article.value = content
}
</script>

<template>
  <UrlInput @url-entered="onUrlEntered" />

  <div v-if="article">
    <h1>{{ article.title }}</h1>
    <p>{{ article.content }}</p>
  </div>
  <ArticleContent v-if="article" :article="article" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
./components/models
