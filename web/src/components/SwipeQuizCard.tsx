import type { UiStrings } from '../services/i18n.ts'
import type { QuestionRound } from '../types.ts'

interface Props {
  round: QuestionRound
  level: number
  dragX: number
  feedback: 'correct' | 'wrong' | null
  strings: UiStrings
  onPointerDown: (event: React.PointerEvent) => void
  onPointerMove: (event: React.PointerEvent) => void
  onPointerUp: () => void
}

export function SwipeQuizCard({
  round,
  level,
  dragX,
  feedback,
  strings,
  onPointerDown,
  onPointerMove,
  onPointerUp,
}: Props) {
  const isCode = round.card.passageFormat === 'code'

  return (
    <div
      className="relative select-none"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      style={{ touchAction: 'none' }}
    >
      <div
        className={`rounded-[2rem] border px-5 py-5 transition-colors duration-200 sm:px-6 sm:py-6 ${
          feedback === 'correct'
            ? 'border-[var(--success)] bg-[var(--mint-soft)]'
            : feedback === 'wrong'
              ? 'border-[var(--error)] bg-[var(--error)]/10'
              : 'border-[var(--line-strong)] bg-[var(--card-gradient)]'
        } shadow-[var(--shadow-card)]`}
        style={{
          minHeight: '22rem',
          transform: feedback ? undefined : `translateX(${dragX}px) rotate(${dragX * 0.05}deg)`,
        }}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-end gap-3 sm:justify-between">
            <span className="hidden rounded-full border border-[var(--line)] bg-[var(--glass)] px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[var(--muted)] sm:inline-flex">
              {round.card.categoryLabel}
            </span>
            <span className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
              {strings.level} {level}
            </span>
          </div>

          <div className="display-font text-[1.35rem] font-bold text-[var(--ink)] sm:text-[1.55rem]">
            {round.card.title}
          </div>

          {isCode ? (
            <pre className="overflow-x-auto rounded-[1.2rem] border border-[var(--line)] bg-[var(--paper-deep)] px-4 py-4 font-mono text-[0.92rem] leading-6 text-[var(--ink)]">
              <code>{round.card.passage}</code>
            </pre>
          ) : (
            <div
              className="text-[var(--ink)]"
              style={{ fontSize: 'calc(1.02rem * var(--content-scale))', lineHeight: 1.6 }}
            >
              {round.card.passage}
            </div>
          )}

          <div className="rounded-[1.2rem] bg-[var(--glass)] px-4 py-3">
            <div className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">{strings.question}</div>
            <div
              className="mt-2 display-font font-bold text-[var(--ink)]"
              style={{ fontSize: 'calc(1.25rem * var(--content-scale))', lineHeight: 1.15 }}
            >
              {round.card.question}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 hidden text-center text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)] sm:block">
        {strings.readPrompt}
      </div>

      {!feedback && Math.abs(dragX) > 20 && (
        <div className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-2xl font-bold ${
          dragX < 0 ? 'left-[-3rem]' : 'right-[-3rem]'
        }`}>
          <span className={dragX < 0
            ? (round.correctSide === 'left' ? 'text-[var(--success)]' : 'text-[var(--error)]')
            : (round.correctSide === 'right' ? 'text-[var(--success)]' : 'text-[var(--error)]')
          }>
            {dragX < 0 ? 'A' : 'B'}
          </span>
        </div>
      )}
    </div>
  )
}
