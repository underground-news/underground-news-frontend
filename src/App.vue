<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import UrlInput from "./components/UrlInput.vue";

import theSunBrexitStudentLoans from "./fixtures/the-sun-brexit-student-loans.json";

interface ArticleContent {
  title: string;
  content: string;
  url: string;
}

async function getPageContent(url: string): Promise<ArticleContent> {
  // use fixture for now
  // todo: fetch from url
  url; // unused
  return theSunBrexitStudentLoans;
}

async function onUrlEntered(url: string): Promise<void> {
  const content = await getPageContent(url);
  console.log(content);
}
</script>

<template>
  <UrlInput @url-entered="onUrlEntered" />
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
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
