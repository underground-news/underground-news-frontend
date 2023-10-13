<script setup lang="ts">
import { useArticleStore } from '@/articleStore'
import { ref } from 'vue'
import { type ArticleContent, type ScoreStatistics } from '../models.js'

const props = defineProps<{
  stat: ScoreStatistics
}>()

const dropdown = ref<string | null>(null)

const articleStore = useArticleStore()

function getArticle(url: string): ArticleContent {
  const article = articleStore.getFromUrl(url)
  if (!article) {
    throw new Error(`Article not found for url: ${url}`)
  }
  return article
}

function showDropdown(url: string | null) {
  console.log('showDropdown')
  dropdown.value = url
}
</script>

<template>
  <div class="stats-collection">
    <div class="name">{{ props.stat.name }}</div>
    <div class="scale">
      <div class="labels">
        <div>Left</div>
        <div>Right</div>
      </div>

      <div class="articles">
        <div
          v-for="score in props.stat.scores"
          :key="score.articleUrl"
          class="article"
          :style="{ left: `calc(${(score.score / 10) * 100}% - 100px)` }"
        >
          <div
            :href="score.articleUrl"
            target="_blank"
            class="score"
            :onMouseenter="
              () => {
                showDropdown(score.articleUrl)
              }
            "
            :onMouseout="
              () => {
                showDropdown(null)
              }
            "
          >
            <div>
              <img :src="getArticle(score.articleUrl).favicon" class="favicon" />
            </div>
            <div class="dropdown" v-if="score.articleUrl === dropdown">
              {{ getArticle(score.articleUrl).title }}
            </div>
          </div>
        </div>
      </div>
      <svg width="100%" height="30">
        <defs>
          <marker
            id="arrowhead-start"
            markerWidth="10"
            markerHeight="10"
            refX="2"
            refY="3"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path transform="rotate(180 5 3)" d="M0,0 L0,6 L9,3 z" fill="black" />
          </marker>
          <marker
            id="arrowhead-end"
            markerWidth="10"
            markerHeight="10"
            refX="8"
            refY="3"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M0,0 L0,6 L9,3 z" fill="black" />
          </marker>
        </defs>
        <line
          x2="0"
          y2="5"
          x1="100%"
          y1="5"
          stroke="black"
          stroke-width="2"
          marker-start="url(#arrowhead-start)"
          marker-end="url(#arrowhead-end)"
        />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.stats-collection {
  border: 1px solid black;
  border-radius: 4px;
  padding: 1em;
  padding-top: 0.5em;
  margin: 1em;
  width: 300px;
}
.name {
  text-align: center;
  font-weight: bold;
  margin-bottom: 0.5em;
}

.scale {
  position: relative;
  width: 100%;
  height: 50px;
}
.scale a:hover {
  background-color: #00000000;
}
.dropdown {
  margin-top: 10px;
  background-color: black;
  color: white;
  padding: 5px;
  border-radius: 4px;

  /* position: relative;
     top: -1.5em;
     background-color: black;
     color: white;*/
}
.labels,
.score-labels {
  display: flex;
  justify-content: space-between;
}

.articles {
  position: relative;
  width: 100%;
  height: 20px;
}

.article {
  position: absolute;
  bottom: 0;
}
.score {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: -1.5em;
  left: 0;
  width: 200px;
}
.favicon {
  display: block;
  width: 20px;
}

/* Add your styles here */
/*

        {{ score.articleUrl }} - {{ score.score }}
{{ getArticleName(score.articleUrl) }} - {{ score.score }}


            {
                "articleUrl": "https://www.nytimes.com/2019/10/23/us/politics/trump-impeachment.html",
                "score": "3"
            },
            {
                "articleUrl": "https://www.cnn.com/2019/10/23/politics/donald-trump-impeachment-inquiry/index.html",
                "score": "1"
            },

*/
</style>
