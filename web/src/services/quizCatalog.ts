import type { LanguageCode, QuestionRound, SubjectId } from '../types.ts'
import type { ProblemStatsMap } from './scores.ts'

type LocalizedText = { en: string } & Partial<Record<LanguageCode, string>>

export interface SubjectDefinition {
  LEVELS: number[]
  getLevelLabel: (level: number, language: LanguageCode) => string
  getCardLabel: (id: string, language: LanguageCode) => string
  generateRound: (
    level: number,
    language: LanguageCode,
    stats?: ProblemStatsMap,
    previousCardId?: string,
  ) => QuestionRound
}

interface SubjectManifestEntry {
  label: LocalizedText
  description: LocalizedText
  load: () => Promise<SubjectDefinition>
}

const SUBJECT_MANIFEST = {
  programming: {
    label: { en: 'Programming' },
    description: { en: 'Code tracing, debugging, APIs, and software concepts.' },
    load: async () => import('./programmingProblems.ts'),
  },
  chemistry: {
    label: { en: 'Chemistry' },
    description: { en: 'Formulas, bonding, reactions, lab reasoning, and core concepts.' },
    load: async () => import('./chemistryProblems.ts'),
  },
  reading: {
    label: { en: 'Reading + Logic' },
    description: { en: 'Stories, clues, patterns, and logic warmups.' },
    load: async () => import('./problems.ts'),
  },
} satisfies Record<SubjectId, SubjectManifestEntry>

const loadedSubjects: Partial<Record<SubjectId, SubjectDefinition>> = {}
const subjectLoads: Partial<Record<SubjectId, Promise<SubjectDefinition>>> = {}

export const SUBJECTS: SubjectId[] = Object.keys(SUBJECT_MANIFEST) as SubjectId[]

function localize(text: LocalizedText, language: LanguageCode): string {
  return text[language] ?? text.en
}

export function getSubjectLabel(subject: SubjectId, language: LanguageCode): string {
  return localize(SUBJECT_MANIFEST[subject].label, language)
}

export function getSubjectDescription(subject: SubjectId, language: LanguageCode): string {
  return localize(SUBJECT_MANIFEST[subject].description, language)
}

export function getCachedSubjectDefinition(subject: SubjectId): SubjectDefinition | null {
  return loadedSubjects[subject] ?? null
}

export function loadSubjectDefinition(subject: SubjectId): Promise<SubjectDefinition> {
  const cached = loadedSubjects[subject]
  if (cached) return Promise.resolve(cached)

  const inFlight = subjectLoads[subject]
  if (inFlight) return inFlight

  const nextLoad = SUBJECT_MANIFEST[subject]
    .load()
    .then((definition) => {
      loadedSubjects[subject] = definition
      return definition
    })

  subjectLoads[subject] = nextLoad
  return nextLoad
}
