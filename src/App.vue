<script setup lang="ts">
import UrlInput from './components/UrlInput.vue'

import { ref } from 'vue'
import { useArticleStore } from './articleStore'
import Article from './components/Article.vue'
import StatsCollection from './components/StatsCollection.vue'
import theSunBrexitStudentLoans from './mocks/article-content-the-sun-brexit-student-loans.json'
import { type ArticleContent, type ArticleScores } from './models'

const article = ref<ArticleContent | null>(null)
const stats = ref<Statistic[] | null>(null)

const articleStore = useArticleStore()

const scrapperEndpoint = 'https://devstar9502-fwbtu76snq-oe.a.run.app'

async function getPageContent(url: string): Promise<ArticleContent> {
  // schema of the returned object
  interface ScrapArticle {
    title: string
    text: string
    url: string
    date: number[] | null
  }
  const resp = await fetch(`${scrapperEndpoint}/read_article/${url}`)
  return resp.json().then((data) => {
    const scrapArticle = data as ScrapArticle
    const url = new URL(scrapArticle.url)
    const newArticle = {
      title: scrapArticle.title,
      content: scrapArticle.text,
      url: scrapArticle.url,
      favicon: url.origin + '/favicon.ico',
      date: scrapArticle.date,
      newsProvider: url.hostname
    }
    articleStore.clear()
    articleStore.add(newArticle)
    return newArticle
  })
}

const descriptions: Record<string, string> = {
  Attribution_and_Sources: 'The acknowledgment of the original sources of information.',
  Balance: 'Presenting different perspectives and aspects of the issue at hand.',
  Comparative_Analysis:
    'Examining and comparing different cases or examples to provide a deeper understanding.',
  Context: 'Providing background or additional information to give a fuller picture.',
  Editorial_Policies:
    'The guidelines and standards followed by editors to ensure consistency and integrity.',
  Framing:
    'The way an issue or information is presented and what emphasis is given to different aspects.',
  Headline_Accuracy: 'Ensuring that headlines accurately reflect the content of the articles.',
  Historical_Accuracy: 'Ensuring that historical facts and events are accurately represented.',
  Image_and_Graphic_Representation: 'The accuracy and appropriateness of images and graphics used.',
  Misleading_Statistics:
    'Identifying and correcting the misuse or misrepresentation of statistical data.',
  Omission_of_Information:
    'Identifying what information might have been left out and assessing the impact.',
  Source_Diversity: 'Including a variety of sources to provide a well-rounded perspective.',
  Transparency: 'Being open about the processes, methods, and sources used.',
  Use_of_Expertise: 'Employing expert knowledge and insights to enhance understanding.',
  Word_Choice_and_Tone: 'Examining the language and tone used to present information.'
}

const labels: Record<string, string[]> = {
  Attribution_and_Sources: ['More', 'Less'],
  Balance: ['Balanced', 'Unbalanced'],
  Comparative_Analysis: ['More', 'Less'],
  Context: ['More', 'Less'],
  Editorial_Policies: ['Good', 'Bad'],
  Framing: ['Less', 'More'],
  Headline_Accuracy: ['Accurate', 'Inaccurate'],
  Historical_Accuracy: ['Accurate', 'Inaccurate'],
  Image_and_Graphic_Representation: ['Accurate', 'Inaccurate'],
  Misleading_Statistics: ['Accurate', 'Inaccurate'],
  Omission_of_Information: ['Accurate', 'Inaccurate'],
  Source_Diversity: ['Diverse', 'Not Diverse'],
  Transparency: ['Transparent', 'Not Transparent'],
  Use_of_Expertise: ['Expert', 'Not Expert'],
  Word_Choice_and_Tone: ['Accurate', 'Inaccurate']
}

async function getStats(article: ArticleContent): Promise<ScoreStatistics[]> {
  // use fixture for now
  const body = JSON.stringify({ article1: article.content })

  const response = await fetch('https://promptserver-s5ngncfpya-oe.a.run.app/score_json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body
  })
  const data = await response.json()
  const scores = [] as ScoreStatistics[]

  for (const [handle, score] of Object.entries(data.data)) {

    scores.push({
      scores: [{ articleUrl: article.url, score: Number.parseFloat(score) }],
      handle: handle,
      description: descriptions[handle],
      name: handle.replace(/_/g, ' '),
      minLabel: labels[handle][0],
      maxLabel: labels[handle][1]
    })
  }
  return scores
}

async function onUrlEntered(url: URL): Promise<void> {
  article.value = await getPageContent(url.toString())
  stats.value = await getStats(article.value)
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
