import { getSubjectDescription, getSubjectLabel, SUBJECTS } from '../services/quizCatalog.ts'
import type { LanguageCode, SubjectId } from '../types.ts'

interface Props {
  language: LanguageCode
  value: SubjectId
  onChange: (subject: SubjectId) => void
  compact?: boolean
}

export function SubjectPicker({ language, value, onChange, compact = false }: Props) {
  return (
    <div className={`grid gap-2 ${compact ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
      {SUBJECTS.map((subject) => {
        const active = subject === value
        return (
          <button
            key={subject}
            className={`rounded-[1rem] border px-4 py-3 text-left transition duration-200 ${
              active
                ? 'border-[var(--accent-soft)] bg-[var(--accent-gradient)] text-[var(--ink)] shadow-[var(--shadow-card)]'
                : 'border-[var(--line)] bg-[var(--glass-soft)] text-[var(--muted)] hover:bg-[var(--glass-hover)] hover:text-[var(--ink)]'
            }`}
            onClick={() => onChange(subject)}
            type="button"
          >
            <div className="font-semibold">{getSubjectLabel(subject, language)}</div>
            {!compact && (
              <div className="mt-1 text-xs text-[var(--muted)]">{getSubjectDescription(subject, language)}</div>
            )}
          </button>
        )
      })}
    </div>
  )
}
