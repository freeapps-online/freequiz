import type { Score, SubjectId } from '../types.ts'

const SCORES_KEY = 'freequiz-scores'
const PROBLEM_STATS_KEY = 'freequiz-card-stats'

type ScoresBySubject = Partial<Record<SubjectId, Score>>

function isScore(value: unknown): value is Score {
  return typeof value === 'object'
    && value !== null
    && 'correct' in value
    && 'total' in value
    && 'streak' in value
    && 'bestStreak' in value
}

function defaultScore(): Score {
  return { correct: 0, total: 0, streak: 0, bestStreak: 0 }
}

function loadScoresMap(): ScoresBySubject {
  try {
    const raw = localStorage.getItem(SCORES_KEY)
    if (!raw) return {}

    const parsed = JSON.parse(raw) as unknown
    if (isScore(parsed)) {
      return { reading: parsed }
    }

    return typeof parsed === 'object' && parsed !== null ? parsed as ScoresBySubject : {}
  } catch { /* ignore */ }
  return {}
}

export function loadScores(subject: SubjectId): Score {
  return loadScoresMap()[subject] ?? defaultScore()
}

function saveScores(subject: SubjectId, scores: Score) {
  const next = { ...loadScoresMap(), [subject]: scores }
  localStorage.setItem(SCORES_KEY, JSON.stringify(next))
}

export function recordAnswer(subject: SubjectId, scores: Score, correct: boolean): Score {
  const streak = correct ? scores.streak + 1 : 0
  const bestStreak = Math.max(scores.bestStreak, streak)
  const next = {
    correct: scores.correct + (correct ? 1 : 0),
    total: scores.total + 1,
    streak,
    bestStreak,
  }
  saveScores(subject, next)
  return next
}

// --- Per-problem-type stats ---

export interface ProblemStat {
  correct: number
  wrong: number
  lastSeen: number
}

export type ProblemStatsMap = Record<string, ProblemStat>

type ProblemStatsBySubject = Partial<Record<SubjectId, ProblemStatsMap>>

function isProblemStatsMap(value: unknown): value is ProblemStatsMap {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return false
  return Object.values(value).every((entry) => typeof entry === 'object' && entry !== null && 'lastSeen' in entry)
}

function loadProblemStatsMap(): ProblemStatsBySubject {
  try {
    const raw = localStorage.getItem(PROBLEM_STATS_KEY)
    if (!raw) return {}

    const parsed = JSON.parse(raw) as unknown
    if (isProblemStatsMap(parsed)) {
      return { reading: parsed }
    }

    return typeof parsed === 'object' && parsed !== null ? parsed as ProblemStatsBySubject : {}
  } catch { /* ignore */ }
  return {}
}

export function loadProblemStats(subject: SubjectId): ProblemStatsMap {
  return loadProblemStatsMap()[subject] ?? {}
}

function saveProblemStats(subject: SubjectId, stats: ProblemStatsMap) {
  const next = { ...loadProblemStatsMap(), [subject]: stats }
  localStorage.setItem(PROBLEM_STATS_KEY, JSON.stringify(next))
}

export function recordProblemAnswer(
  subject: SubjectId,
  stats: ProblemStatsMap,
  key: string,
  correct: boolean,
): ProblemStatsMap {
  const prev = stats[key] ?? { correct: 0, wrong: 0, lastSeen: 0 }
  const next = {
    ...stats,
    [key]: {
      correct: prev.correct + (correct ? 1 : 0),
      wrong: prev.wrong + (correct ? 0 : 1),
      lastSeen: Date.now(),
    },
  }
  saveProblemStats(subject, next)
  return next
}

export function pickWeighted<T extends { id: string }>(
  pool: T[],
  stats: ProblemStatsMap,
  exclude?: T,
): T {
  const filtered = exclude ? pool.filter(p => p.id !== exclude.id) : pool
  if (filtered.length === 0) return pool[0]

  const now = Date.now()
  const weights = filtered.map((item) => {
    const s = stats[item.id]
    if (!s) return 3

    const total = s.correct + s.wrong
    const errorRate = total > 0 ? s.wrong / total : 0.5
    const hoursSince = (now - s.lastSeen) / (1000 * 60 * 60)
    const timeFactor = Math.min(hoursSince / 24, 2)

    return 1 + errorRate * 3 + timeFactor + (total < 3 ? 1 : 0)
  })

  const totalWeight = weights.reduce((a, b) => a + b, 0)
  let r = Math.random() * totalWeight
  for (let i = 0; i < filtered.length; i++) {
    r -= weights[i]
    if (r <= 0) return filtered[i]
  }
  return filtered[filtered.length - 1]
}
