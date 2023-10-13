<script setup lang="ts">
import UrlInput from './components/UrlInput.vue'

import { ref } from 'vue'
import Article from './components/Article.vue'
import StatsCollection from './components/StatsCollection.vue'
import theSunBrexitStudentLoans from './mocks/article-content-the-sun-brexit-student-loans.json'
import { type ArticleContent, type ArticleScores } from './models'

const article = ref<ArticleContent | null>(null)
const stats = ref<ArticleScores | null>(null)

async function getPageContent(url: string): Promise<ArticleContent> {
  // use fixture for now
  // todo: fetch from url
  url // unused
  return theSunBrexitStudentLoans
}

async function getStats(): Promise<ArticleScores> {
  // use fixture for now
    const body = JSON.stringify({ article1: theSunBrexitStudentLoans.content })
    console.log(body)
    const response = await fetch("https://promptserver-s5ngncfpya-oe.a.run.app/score_json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body,
    })
    const data = await response.json()
    const scores = data.data as ArticleScores
    return scores
}

async function onUrlEntered(url: URL): Promise<void> {
  const content = await getPageContent(url.toString())
  console.log(content)
  article.value = content
  stats.value = await getStats()
}
</script>

<template>
  <div class="container">
    <UrlInput @url-entered="onUrlEntered" />

    <StatsCollection v-if="stats" :stats="stats" />

    <Article v-if="article" :article="article" />
  </div>
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
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
</style>
