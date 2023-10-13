import { defineStore } from 'pinia'
import type { ArticleContent } from './models'

export const useArticleStore = defineStore('article', {
  state: () => ({ _articles: [] as ArticleContent[] }),
  getters: {
    articles: (state) => state._articles
  },
  actions: {
    add(article: ArticleContent) {
      this._articles.push(article)
    },
    clear() {
      this._articles = []
    },
    getFromUrl(url: string): ArticleContent | undefined {
      return this._articles.find((article) => article.url === url)
    }
  }
})
