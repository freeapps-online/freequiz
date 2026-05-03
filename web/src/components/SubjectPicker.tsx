import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { getSubjectDescription, getSubjectLabel, SUBJECTS } from '../services/quizCatalog.ts'
import type { LanguageCode, SubjectId } from '../types.ts'

interface Props {
  language: LanguageCode
  value: SubjectId
  onChange: (subject: SubjectId) => void
  compact?: boolean
}

export function SubjectPicker({ language, value, onChange, compact = false }: Props) {
  const [open, setOpen] = useState(false)

  if (compact) {
    const currentLabel = getSubjectLabel(value, language)

    return (
      <div className="relative">
        <button
          className="flex w-full items-center justify-between gap-2 rounded-full border border-[var(--line)] bg-[var(--glass)] px-3 py-1.5 text-xs font-semibold text-[var(--muted)] hover:bg-[var(--glass-hover)]"
          onClick={() => setOpen(!open)}
          type="button"
        >
          <span className="truncate">{currentLabel}</span>
          <ChevronDown className={`h-3 w-3 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} strokeWidth={2.2} />
        </button>

        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-y-auto rounded-[1.25rem] border border-[var(--line-strong)] bg-[var(--panel-strong)] p-2 shadow-[var(--shadow-soft)] backdrop-blur-xl">
              {SUBJECTS.map((subject) => {
                const active = subject === value
                return (
                  <button
                    key={subject}
                    className={`flex w-full items-center gap-3 rounded-[1rem] px-3 py-3 text-sm ${
                      active
                        ? 'text-[var(--ink)]'
                        : 'text-[var(--muted)] hover:bg-[var(--glass-hover)] hover:text-[var(--ink)]'
                    }`}
                    style={active ? { background: 'var(--accent-gradient)' } : undefined}
                    onClick={() => {
                      onChange(subject)
                      setOpen(false)
                    }}
                    type="button"
                  >
                    <span className="flex-1 text-left font-medium">{getSubjectLabel(subject, language)}</span>
                  </button>
                )
              })}
            </div>
          </>
        )}
      </div>
    )
  }

  return (
    <div className="grid gap-2 grid-cols-1">
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
