export interface ArticleContent {
  title: string
  content: string
  url: string
  favicon: string
  newsProvider: string
  date: number[] | null
}

export interface Statistic {
  name: string
  description: string
  handle: string
}

export function isScoreStatistics(statistics: Statistic): statistics is ScoreStatistics {
  return (statistics as ScoreStatistics).scores !== undefined
}

export interface ScoreStatistics extends Statistic {
  scores: { articleUrl: string; score: number }[]
  minLabel: string
  maxLabel: string
}

export interface ArticleScores {
  Word_Choice_and_Tone: number
  Framing: number
  Attribution_and_Sources: number
  Omission_of_Information: number
  Misleading_Statistics: number
  Balance: number
  Context: number
  Source_Diversity: number
  Headline_Accuracy: number
  Use_of_Expertise: number
  Transparency: number
  Historical_Accuracy: number
  Image_and_Graphic_Representation: number
  Editorial_Policies: number
  Comparative_Analysis: number
}

