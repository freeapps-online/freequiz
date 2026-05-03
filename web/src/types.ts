export type Mode = 'practice' | 'preferences'
export type LanguageCode =
  | 'en'
  | 'es'
  | 'fr'
  | 'de'
  | 'it'
  | 'pt'
  | 'ja'
  | 'ko'
  | 'zh'
  | 'ru'
  | 'ar'
  | 'hi'
  | 'tr'
  | 'nl'
  | 'pl'
  | 'uk'

export interface Language {
  code: LanguageCode
  name: string
}

export type QuestionSkill =
  | 'main-idea'
  | 'details'
  | 'sequence'
  | 'inference'
  | 'conclusion'
  | 'feelings'
  | 'riddle'
  | 'pattern'
  | 'logic'
  | 'challenge'
export type CardIllustration =
  | 'story'
  | 'detail'
  | 'sequence'
  | 'inference'
  | 'conclusion'
  | 'feelings'
  | 'riddle'
  | 'pattern'
  | 'logic'
  | 'challenge'

export interface ComprehensionCard {
  id: string
  skill: QuestionSkill
  title: string
  categoryLabel: string
  illustration: CardIllustration
  passage: string
  question: string
  correctAnswer: string
  wrongAnswer: string
}

export interface QuestionRound {
  card: ComprehensionCard
  correctSide: 'left' | 'right'
  leftOption: string
  rightOption: string
}

export interface Score {
  correct: number
  total: number
  streak: number
  bestStreak: number
}
