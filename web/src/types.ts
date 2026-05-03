export type Mode = 'practice' | 'preferences'
export type SubjectId = 'reading' | 'programming' | 'chemistry'
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

export type QuestionSkill = string
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
  | 'code'
  | 'concept'

export type CardContentFormat = 'text' | 'code'

export interface ComprehensionCard {
  id: string
  skill: QuestionSkill
  title: string
  categoryLabel: string
  illustration: CardIllustration
  passage: string
  passageFormat?: CardContentFormat
  question: string
  correctAnswer: string
  wrongAnswer: string
  spokenPassage?: string
  spokenQuestion?: string
  spokenCorrectAnswer?: string
  spokenWrongAnswer?: string
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
