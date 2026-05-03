import { useState, useEffect, useCallback, useRef } from 'react'
import { generateRound, getCardLabel } from '../services/quizCatalog.ts'
import { loadScores, recordAnswer, loadProblemStats, recordProblemAnswer } from '../services/scores.ts'
import { SPEECH_LOCALES, getStrings } from '../services/i18n.ts'
import { speakRound, spokenTextToSide, stopSpeaking } from '../services/speech.ts'
import type { QuestionRound, Score, LanguageCode, SubjectId } from '../types.ts'
import type { ProblemStatsMap } from '../services/scores.ts'
import type { AudioPreference, MicrophonePreference } from '../services/settings.ts'
import { SwipeQuizCard } from './SwipeQuizCard.tsx'

interface Props {
  subject: SubjectId
  language: LanguageCode
  level: number
  showStats: boolean
  audio: AudioPreference
  microphone: MicrophonePreference
  onToggleAudio: () => void
  onToggleMicrophone: () => void
}

export function PracticeTab({
  subject,
  language,
  level,
  showStats,
  audio,
  microphone,
  onToggleAudio,
  onToggleMicrophone,
}: Props) {
  const strings = getStrings(language)
  const [round, setRound] = useState<QuestionRound | null>(null)
  const [scores, setScores] = useState<Score>(() => loadScores(subject))
  const [problemStats, setProblemStats] = useState<ProblemStatsMap>(() => loadProblemStats(subject))
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null)
  const [voiceStatus, setVoiceStatus] = useState<'off' | 'starting' | 'prompting' | 'listening' | 'unsupported' | 'denied'>('off')
  const [heardText, setHeardText] = useState('')
  const [cardReady, setCardReady] = useState(true)
  const [dragX, setDragX] = useState(0)
  const dragging = useRef(false)
  const startX = useRef(0)
  const feedbackTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const restartTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const acceptVoiceRef = useRef(false)
  const problemStatsRef = useRef(problemStats)

  useEffect(() => {
    problemStatsRef.current = problemStats
  }, [problemStats])

  useEffect(() => {
    const nextScores = loadScores(subject)
    const nextProblemStats = loadProblemStats(subject)
    setScores(nextScores)
    setProblemStats(nextProblemStats)
    problemStatsRef.current = nextProblemStats
  }, [subject])

  const nextRound = useCallback(() => {
    setRound((prev) => generateRound(subject, level, language, problemStatsRef.current, prev?.card.id))
    setFeedback(null)
    setDragX(0)
    setHeardText('')
    setCardReady(microphone !== 'on')
  }, [language, level, microphone, subject])

  useEffect(() => {
    nextRound()
  }, [nextRound])

  useEffect(() => {
    return () => {
      clearTimeout(feedbackTimer.current)
      clearTimeout(restartTimer.current)
      stopSpeaking()
      recognitionRef.current?.stop()
    }
  }, [])

  const handleAnswer = useCallback((side: 'left' | 'right') => {
    if (!round || feedback) return

    const correct = side === round.correctSide
    setFeedback(correct ? 'correct' : 'wrong')
    setScores((prev) => recordAnswer(subject, prev, correct))
    setProblemStats((prev) => {
      const next = recordProblemAnswer(subject, prev, round.card.id, correct)
      problemStatsRef.current = next
      return next
    })

    clearTimeout(feedbackTimer.current)
    feedbackTimer.current = setTimeout(nextRound, correct ? 700 : 1400)
  }, [feedback, nextRound, round, subject])

  const submitSpokenAnswer = useCallback((spokenSide: 'left' | 'right') => {
    if (!round || feedback) return false
    handleAnswer(spokenSide)
    return true
  }, [feedback, handleAnswer, round])

  useEffect(() => {
    const recognitionCtor = window.SpeechRecognition ?? window.webkitSpeechRecognition

    clearTimeout(restartTimer.current)
    stopSpeaking()
    acceptVoiceRef.current = false

    if (recognitionRef.current) {
      recognitionRef.current.onstart = null
      recognitionRef.current.onresult = null
      recognitionRef.current.onerror = null
      recognitionRef.current.onend = null
      recognitionRef.current.stop()
      recognitionRef.current = null
    }

    if (!round || showStats || feedback) {
      setVoiceStatus(microphone === 'on' && !recognitionCtor ? 'unsupported' : 'off')
      setCardReady(true)
      return
    }

    const startRecognition = () => {
      if (microphone !== 'on') {
        setVoiceStatus('off')
        setCardReady(true)
        return
      }

      if (!recognitionCtor) {
        setVoiceStatus('unsupported')
        setCardReady(true)
        return
      }

      const nextRecognition = new recognitionCtor()
      recognitionRef.current = nextRecognition
      nextRecognition.lang = SPEECH_LOCALES[language]
      nextRecognition.continuous = true
      nextRecognition.interimResults = true
      nextRecognition.maxAlternatives = 3

      setVoiceStatus('starting')
      setCardReady(false)

      nextRecognition.onstart = () => {
        setCardReady(true)
        setVoiceStatus(audio === 'on' ? 'prompting' : 'listening')
        if (audio === 'on') {
          speakRound(round, language, () => {
            acceptVoiceRef.current = true
            setHeardText('')
            setVoiceStatus('listening')
          })
        } else {
          acceptVoiceRef.current = true
        }
      }

      nextRecognition.onerror = (event) => {
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          setVoiceStatus('denied')
          setCardReady(true)
          return
        }
        if (event.error === 'no-speech') return
        setVoiceStatus('off')
        setCardReady(true)
      }

      nextRecognition.onresult = (event) => {
        for (let i = event.results.length - 1; i >= 0; i--) {
          const result = event.results[i]
          const transcript = result[0]?.transcript?.trim()
          if (transcript) setHeardText(transcript)
          if (!result.isFinal || !acceptVoiceRef.current) continue

          for (let j = 0; j < result.length; j++) {
            const spokenSide = spokenTextToSide(result[j].transcript, language)
            if (spokenSide !== null && submitSpokenAnswer(spokenSide)) return
          }
        }
      }

      nextRecognition.onend = () => {
        if (recognitionRef.current !== nextRecognition) return
        recognitionRef.current = null

        if (microphone !== 'on' || showStats || feedback) {
          setVoiceStatus('off')
          return
        }

        restartTimer.current = window.setTimeout(() => {
          if (recognitionRef.current || microphone !== 'on' || showStats || feedback) return
          startRecognition()
        }, 180)
      }

      nextRecognition.start()
    }

    if (microphone === 'on') {
      startRecognition()
    } else {
      setCardReady(true)
      if (audio === 'on') speakRound(round, language)
    }

    return () => {
      clearTimeout(restartTimer.current)
      stopSpeaking()
      acceptVoiceRef.current = false
      if (recognitionRef.current) {
        recognitionRef.current.onstart = null
        recognitionRef.current.onresult = null
        recognitionRef.current.onerror = null
        recognitionRef.current.onend = null
        recognitionRef.current.stop()
        recognitionRef.current = null
      }
    }
  }, [audio, feedback, language, microphone, round, showStats, submitSpokenAnswer])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') handleAnswer('left')
      else if (event.key === 'ArrowRight') handleAnswer('right')
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handleAnswer])

  const onPointerDown = useCallback((event: React.PointerEvent) => {
    if (feedback) return
    dragging.current = true
    startX.current = event.clientX
    ;(event.target as HTMLElement).setPointerCapture(event.pointerId)
  }, [feedback])

  const onPointerMove = useCallback((event: React.PointerEvent) => {
    if (!dragging.current) return
    setDragX(event.clientX - startX.current)
  }, [])

  const onPointerUp = useCallback(() => {
    if (!dragging.current) return
    dragging.current = false

    const threshold = 60
    if (dragX < -threshold) handleAnswer('left')
    else if (dragX > threshold) handleAnswer('right')
    else setDragX(0)
  }, [dragX, handleAnswer])

  if (showStats) return <StatsView scores={scores} problemStats={problemStats} language={language} subject={subject} />
  if (!round) return null

  const pct = scores.total > 0 ? Math.round((scores.correct / scores.total) * 100) : 0
  const micLabel = microphone === 'off'
    ? strings.micOff
    : voiceStatus === 'starting'
      ? strings.micStarting
      : voiceStatus === 'prompting'
        ? strings.micLive
        : voiceStatus === 'listening'
          ? strings.micLive
          : voiceStatus === 'denied'
            ? strings.micBlocked
            : voiceStatus === 'unsupported'
              ? strings.micUnsupported
              : strings.micOn

  const correctAnswer = round.correctSide === 'left' ? round.leftOption : round.rightOption

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 pb-24 lg:pb-0">
      <div className="flex w-full max-w-md items-center justify-between px-2 text-sm">
        <div className="flex items-center gap-3">
          <span className="font-bold text-[var(--ink)]">{scores.correct}/{scores.total}</span>
          <span className="text-[var(--muted)]">{pct}%</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] ${
              audio === 'on'
                ? 'border-[var(--line-strong)] bg-[var(--glass)] text-[var(--ink)]'
                : 'border-[var(--line)] bg-[var(--glass-soft)] text-[var(--muted)]'
            }`}
            onClick={onToggleAudio}
            type="button"
          >
            {audio === 'on' ? strings.soundOn : strings.muted}
          </button>
          <button
            className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] ${
              microphone === 'on'
                ? 'border-[var(--line-strong)] bg-[var(--glass)] text-[var(--ink)]'
                : 'border-[var(--line)] bg-[var(--glass-soft)] text-[var(--muted)]'
            }`}
            onClick={onToggleMicrophone}
            type="button"
          >
            {micLabel}
          </button>
          <span className="text-[var(--warning)]">
            {scores.streak > 0 && `${scores.streak} ${strings.streak}`}
          </span>
          {scores.bestStreak > 0 && (
            <span className="text-xs text-[var(--muted)]">{strings.best} {scores.bestStreak}</span>
          )}
        </div>
      </div>

      <div className="w-full max-w-md px-4">
        {microphone === 'on' && (
          <div className="mb-4 rounded-[1.4rem] border border-[var(--line)] bg-[var(--glass-soft)] px-4 py-3 shadow-[var(--shadow-card)]">
            <div className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">{strings.voiceInput}</div>
            <div className="mt-2 min-h-[1.75rem] text-sm font-semibold text-[var(--ink)]">
              {heardText || '...'}
            </div>
            <div className="mt-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
              {{
                starting: strings.startingMic,
                prompting: strings.micReady,
                listening: strings.micListening,
                denied: strings.micDenied,
                unsupported: strings.micUnsupported,
                off: strings.micPaused,
              }[voiceStatus]}
            </div>
          </div>
        )}

        {cardReady ? (
          <>
            <SwipeQuizCard
              round={round}
              level={level}
              dragX={dragX}
              feedback={feedback}
              strings={strings}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
            />

            <div className="mt-6 flex gap-4">
              <AnswerButton
                side="left"
                value={round.leftOption}
                feedback={feedback}
                isCorrect={round.correctSide === 'left'}
                onClick={() => handleAnswer('left')}
                label={strings.answerA}
              />
              <AnswerButton
                side="right"
                value={round.rightOption}
                feedback={feedback}
                isCorrect={round.correctSide === 'right'}
                onClick={() => handleAnswer('right')}
                label={strings.answerB}
              />
            </div>
          </>
        ) : (
          <div className="flex h-56 w-full items-center justify-center rounded-[2rem] border border-dashed border-[var(--line-strong)] bg-[var(--glass-soft)] text-center shadow-[var(--shadow-card)] sm:h-64">
            <div className="space-y-2 px-6">
              <div className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">{strings.voiceInput}</div>
              <div className="display-font text-2xl font-bold text-[var(--ink)]">{strings.micStarting}</div>
            </div>
          </div>
        )}
      </div>

      {feedback && (
        <div className={`max-w-md px-4 text-center text-sm font-semibold ${feedback === 'correct' ? 'text-[var(--success)]' : 'text-[var(--error)]'}`}>
          {feedback === 'correct' ? strings.correct : `${strings.bestAnswer}: ${correctAnswer}`}
        </div>
      )}
    </div>
  )
}

function StatsView({
  scores,
  problemStats,
  language,
  subject,
}: {
  scores: Score
  problemStats: ProblemStatsMap
  language: LanguageCode
  subject: SubjectId
}) {
  const strings = getStrings(language)
  const entries = Object.entries(problemStats)
  const totalProblems = entries.length
  const mastered = entries.filter(([, stats]) => stats.correct >= 3 && stats.wrong === 0).length
  const struggling = entries.filter(([, stats]) => stats.wrong > stats.correct).length

  return (
    <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-1">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label={strings.correctLabel} value={scores.correct} color="success" />
        <StatCard label={strings.totalLabel} value={scores.total} color="sky" />
        <StatCard label={strings.bestStreak} value={scores.bestStreak} color="warning" />
        <StatCard label={strings.accuracy} value={scores.total > 0 ? `${Math.round((scores.correct / scores.total) * 100)}%` : '-'} color="accent" />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <StatCard label={strings.cardsSeen} value={totalProblems} color="sky" />
        <StatCard label={strings.mastered} value={mastered} color="success" />
        <StatCard label={strings.struggling} value={struggling} color="error" />
      </div>

      {entries.length > 0 && (
        <div className="mt-2 rounded-[1.25rem] border border-[var(--line)] bg-[var(--glass-soft)] p-3">
          <div className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-[var(--muted)]">{strings.recentCards}</div>
          <div className="grid gap-1">
            {entries
              .sort(([, a], [, b]) => b.lastSeen - a.lastSeen)
              .slice(0, 20)
              .map(([key, stat]) => (
                <div key={key} className="flex items-center justify-between gap-3 rounded-lg px-2 py-1 text-sm">
                  <span className="text-[var(--ink)]">{getCardLabel(subject, key, language)}</span>
                  <span className={stat.wrong > stat.correct ? 'text-[var(--error)]' : 'text-[var(--success)]'}>
                    {stat.correct}/{stat.correct + stat.wrong}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}

function StatCard({ label, value, color }: { label: string; value: string | number; color: string }) {
  return (
    <div className="rounded-[1rem] border border-[var(--line)] bg-[var(--glass-soft)] px-3 py-2.5 text-center">
      <div className={`text-xl font-bold text-[var(--${color})]`}>{value}</div>
      <div className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">{label}</div>
    </div>
  )
}

function AnswerButton({
  side,
  value,
  feedback,
  isCorrect,
  onClick,
  label,
}: {
  side: 'left' | 'right'
  value: string
  feedback: 'correct' | 'wrong' | null
  isCorrect: boolean
  onClick: () => void
  label: string
}) {
  const arrow = side === 'left' ? '\u2190' : '\u2192'

  return (
    <button
      className={`flex flex-1 flex-col items-center justify-center rounded-[1.5rem] border py-3 transition-all duration-200 ${
        feedback
          ? isCorrect
            ? 'border-[var(--success)] bg-[var(--success)]/15 text-[var(--success)]'
            : feedback === 'wrong'
              ? 'border-[var(--error)] bg-[var(--error)]/10 text-[var(--error)]'
              : 'border-[var(--line)] bg-[var(--glass)] text-[var(--muted)]'
          : 'border-[var(--line-strong)] bg-[var(--glass)] text-[var(--ink)] hover:bg-[var(--glass-hover)] hover:shadow-[var(--shadow-card)]'
      }`}
      onClick={onClick}
      disabled={!!feedback}
      type="button"
    >
      <span className="text-[0.65rem] font-bold uppercase tracking-[0.16em] opacity-80">
        {arrow} {label}
      </span>
      <span
        className="px-4 text-center font-bold"
        style={{ fontSize: 'calc(1rem * var(--content-scale))', lineHeight: 1.35 }}
      >
        {value}
      </span>
    </button>
  )
}
