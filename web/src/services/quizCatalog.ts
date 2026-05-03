import type { LanguageCode, SubjectId, QuestionRound } from '../types.ts'
import type { ProblemStatsMap } from './scores.ts'
import {
  LEVELS as READING_LEVELS,
  generateRound as generateReadingRound,
  getCardLabel as getReadingCardLabel,
  getLevelLabel as getReadingLevelLabel,
} from './problems.ts'
import {
  LEVELS as PROGRAMMING_LEVELS,
  generateRound as generateProgrammingRound,
  getCardLabel as getProgrammingCardLabel,
  getLevelLabel as getProgrammingLevelLabel,
} from './programmingProblems.ts'

type LocalizedText = { en: string } & Partial<Record<LanguageCode, string>>

const SUBJECT_LABELS: Record<SubjectId, LocalizedText> = {
  reading: { en: 'Reading + Logic' },
  programming: { en: 'Programming' },
}

const SUBJECT_DESCRIPTIONS: Record<SubjectId, LocalizedText> = {
  reading: { en: 'Stories, clues, patterns, and logic warmups.' },
  programming: { en: 'Code tracing, debugging, APIs, and software concepts.' },
}

export const SUBJECTS: SubjectId[] = ['programming', 'reading']

function localize(text: LocalizedText, language: LanguageCode): string {
  return text[language] ?? text.en
}

export function getSubjectLabel(subject: SubjectId, language: LanguageCode): string {
  return localize(SUBJECT_LABELS[subject], language)
}

export function getSubjectDescription(subject: SubjectId, language: LanguageCode): string {
  return localize(SUBJECT_DESCRIPTIONS[subject], language)
}

export function getSubjectLevels(subject: SubjectId): number[] {
  return subject === 'programming' ? PROGRAMMING_LEVELS : READING_LEVELS
}

export function clampLevel(subject: SubjectId, level: number): number {
  const levels = getSubjectLevels(subject)
  return levels.includes(level) ? level : levels[0]
}

export function getLevelLabel(subject: SubjectId, level: number, language: LanguageCode): string {
  return subject === 'programming'
    ? getProgrammingLevelLabel(level, language)
    : getReadingLevelLabel(level, language)
}

export function getCardLabel(subject: SubjectId, id: string, language: LanguageCode): string {
  return subject === 'programming'
    ? getProgrammingCardLabel(id, language)
    : getReadingCardLabel(id, language)
}

export function generateRound(
  subject: SubjectId,
  level: number,
  language: LanguageCode,
  stats: ProblemStatsMap = {},
  previousCardId?: string,
): QuestionRound {
  const safeLevel = clampLevel(subject, level)
  return subject === 'programming'
    ? generateProgrammingRound(safeLevel, language, stats, previousCardId)
    : generateReadingRound(safeLevel, language, stats, previousCardId)
}
