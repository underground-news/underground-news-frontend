export interface ArticleContent {
  title: string
  content: string
  url: string
  favicon: string
  newsProvider: string
}

export interface Statistic {
  name: string
}

export function isScoreStatistics(statistics: Statistic): statistics is ScoreStatistics {
  return (statistics as ScoreStatistics).scores !== undefined
}

export interface ScoreStatistics extends Statistic {
  scores: { articleUrl: string; score: number }[]
  minLabel: string // label for the lowest score
  maxLabel: string // label for the highest score
}

// export { ArticleContent };
// module.exports = {
//   ArticleContent
// };
