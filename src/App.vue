<script setup lang="ts">
import UrlInput from './components/UrlInput.vue'

import { ref } from 'vue'
import Article from './components/Article.vue'
import StatsCollection from './components/StatsCollection.vue'
import theSunBrexitStudentLoans from './mocks/article-content-the-sun-brexit-student-loans.json'
import theSunBrexitScores from './mocks/statistics-the-sun-brexit-student.json'
import { type ArticleContent, type Statistic } from './models'

const article = ref<ArticleContent | null>(null)
const stats = ref<Statistic[] | null>(null)

async function getPageContent(url: string): Promise<ArticleContent> {
  // use fixture for now
  // todo: fetch from url
  url // unused
  return theSunBrexitStudentLoans
}

async function getStats(): Promise<Statistic[]> {
  // use fixture for now
  return theSunBrexitScores as Statistic[]
}

async function onUrlEntered(url: URL): Promise<void> {
  const content = await getPageContent(url.toString())
  console.log(content)
  article.value = content

  stats.value = await getStats()
}
</script>

<template>
  <UrlInput @url-entered="onUrlEntered" />

  <Article v-if="article" :article="article" />

  <StatsCollection v-if="stats" :stats="stats" />
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
