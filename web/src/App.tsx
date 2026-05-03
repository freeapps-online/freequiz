import { useState, useEffect, useCallback } from 'react'
import { Calculator, ChevronDown, Globe, Settings2 } from 'lucide-react'
import { useApplySettings, useSettings, useSubjectDefinition } from './hooks.ts'
import { PracticeTab } from './components/PracticeTab.tsx'
import { PreferencesTab } from './components/PreferencesTab.tsx'
import { LanguagePicker } from './components/LanguagePicker.tsx'
import { SubjectPicker } from './components/SubjectPicker.tsx'
import { getSubjectLabel } from './services/quizCatalog.ts'
import { getStrings } from './services/i18n.ts'
import type { Mode } from './types.ts'

const MODES: Mode[] = ['practice', 'preferences']

const PATH_TO_MODE: Record<string, Mode> = {
  '/': 'practice',
  '/practice': 'practice',
  '/preferences': 'preferences',
}

const MODE_TO_PATH: Record<Mode, string> = {
  practice: '/practice',
  preferences: '/preferences',
}

function getModeFromPath(): Mode {
  return PATH_TO_MODE[window.location.pathname] ?? 'practice'
}

export default function App() {
  const [mode, setMode] = useState<Mode>(getModeFromPath)
  const { settings, update } = useSettings()
  const strings = getStrings(settings.contentLang)
  useApplySettings(settings)
  const subjectDefinition = useSubjectDefinition(settings.subject)
  const levels = subjectDefinition?.LEVELS ?? [settings.level]
  const safeLevel = subjectDefinition
    ? (subjectDefinition.LEVELS.includes(settings.level) ? settings.level : subjectDefinition.LEVELS[0])
    : settings.level

  const [levelOpen, setLevelOpen] = useState(false)
  const [showStats, setShowStats] = useState(false)

  const navigate = useCallback((nextMode: Mode) => {
    setMode(nextMode)
    setShowStats(false)
    window.history.pushState(null, '', MODE_TO_PATH[nextMode])
  }, [setShowStats])

  useEffect(() => {
    const onPop = () => setMode(getModeFromPath())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  useEffect(() => {
    if (subjectDefinition && safeLevel !== settings.level) update({ level: safeLevel })
  }, [safeLevel, settings.level, subjectDefinition, update])

  const levelLabel = subjectDefinition
    ? subjectDefinition.getLevelLabel(safeLevel, settings.contentLang)
    : getSubjectLabel(settings.subject, settings.contentLang)

  const isFullscreen = mode === 'practice'

  return (
    <div className="relative min-h-[100dvh] overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-18%] top-[-8%] h-72 w-72 rounded-full bg-[var(--accent-soft)]/35 blur-3xl lg:h-[34rem] lg:w-[34rem]" />
        <div className="absolute right-[-14%] top-[18%] h-72 w-72 rounded-full bg-[var(--sky-soft)]/30 blur-3xl lg:top-[-2%] lg:h-[28rem] lg:w-[28rem]" />
        <div className="absolute bottom-[-10%] left-[10%] h-80 w-80 rounded-full bg-[var(--mint-soft)]/25 blur-3xl lg:left-[45%] lg:h-[26rem] lg:w-[26rem]" />
      </div>

      <div className={`relative mx-auto max-w-[1540px] px-2 pt-1 sm:px-4 lg:px-8 lg:py-8 ${isFullscreen ? 'flex min-h-[100dvh] flex-col pb-14' : 'min-h-[100dvh] pb-14'}`}>
        <div className={`${isFullscreen ? 'flex flex-1 flex-col lg:grid lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-7' : 'lg:grid lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-7'}`}>
          <aside className="hidden lg:flex lg:min-h-[calc(100dvh-4rem)] lg:flex-col lg:gap-5 lg:rounded-[2rem] lg:border lg:border-[var(--line)] lg:bg-[var(--glass-strong)] lg:p-6 lg:shadow-[var(--shadow-soft)] lg:backdrop-blur-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--line-strong)] bg-[var(--glass)] px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-[var(--accent-deep)]">
              <Globe className="h-4 w-4" strokeWidth={2} />
              {strings.appName}
            </div>

            <div className="space-y-1">
              <div className="px-1 text-[0.65rem] font-bold uppercase tracking-[0.15em] text-[var(--muted)]">{strings.language}</div>
              <LanguagePicker
                compact
                label={strings.language}
                value={settings.contentLang}
                onChange={(code) => update({ contentLang: code })}
              />
            </div>

            <nav className="space-y-1">
              {MODES.map((item) => (
                <button
                  key={item}
                  className={`w-full rounded-[1rem] px-4 py-3 text-left text-sm font-semibold transition duration-200 ${
                    mode === item
                      ? 'border border-[var(--accent-soft)] bg-[var(--accent-gradient)] text-[var(--ink)] shadow-[var(--shadow-card)]'
                      : 'border border-transparent text-[var(--muted)] hover:bg-[var(--glass-hover)] hover:text-[var(--ink)]'
                  }`}
                  onClick={() => navigate(item)}
                  type="button"
                >
                  {item === 'practice' ? strings.practice : strings.preferences}
                </button>
              ))}
              {mode === 'practice' && (
                <button
                  className={`w-full rounded-[1rem] px-4 py-3 text-left text-sm font-semibold transition duration-200 ${
                    showStats
                      ? 'border border-[var(--sky-soft)] bg-[var(--cool-gradient)] text-[var(--ink)] shadow-[var(--shadow-card)]'
                      : 'border border-transparent text-[var(--muted)] hover:bg-[var(--glass-hover)] hover:text-[var(--ink)]'
                  }`}
                  onClick={() => setShowStats(!showStats)}
                  type="button"
                >
                  {showStats ? strings.backToPractice : strings.stats}
                </button>
              )}
            </nav>

            <div className="space-y-1">
              <div className="px-1 text-[0.65rem] font-bold uppercase tracking-[0.15em] text-[var(--muted)]">{strings.subject}</div>
              <SubjectPicker
                language={settings.contentLang}
                value={settings.subject}
                onChange={(subject) => update({ subject })}
              />
            </div>

            <div className="space-y-1">
              <div className="px-1 text-[0.65rem] font-bold uppercase tracking-[0.15em] text-[var(--muted)]">{strings.level}</div>
              <div className="max-h-64 space-y-0.5 overflow-y-auto">
                {levels.map((level) => (
                  <button
                    key={level}
                    className={`flex w-full items-center gap-2 rounded-[0.75rem] px-3 py-2 text-left text-sm ${
                      level === safeLevel
                        ? 'bg-[var(--accent-gradient)] font-semibold text-[var(--ink)]'
                        : 'text-[var(--muted)] hover:bg-[var(--glass-hover)] hover:text-[var(--ink)]'
                    }`}
                    onClick={() => update({ level })}
                    type="button"
                    disabled={!subjectDefinition}
                  >
                    <span className="font-bold">{level}</span>
                    <span>{subjectDefinition ? subjectDefinition.getLevelLabel(level, settings.contentLang) : '...'}</span>
                  </button>
                ))}
              </div>
            </div>

            {mode === 'practice' && (
              <div className="mt-auto space-y-3 rounded-[1rem] border border-[var(--line)] bg-[var(--glass-soft)] p-3 text-[0.75rem] text-[var(--muted)]">
                <div className="font-bold uppercase tracking-[0.15em]">{strings.keyboard}</div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3 rounded-[0.85rem] border border-[var(--line)] bg-[var(--glass)] px-3 py-2">
                    <div className="flex items-center gap-2 font-bold text-[var(--ink)]">
                      <span className="rounded-md border border-[var(--line-strong)] px-2 py-1">&larr;</span>
                    </div>
                    <span>{strings.pickLeftAnswer}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 rounded-[0.85rem] border border-[var(--line)] bg-[var(--glass)] px-3 py-2">
                    <div className="flex items-center gap-2 font-bold text-[var(--ink)]">
                      <span className="rounded-md border border-[var(--line-strong)] px-2 py-1">&rarr;</span>
                    </div>
                    <span>{strings.pickRightAnswer}</span>
                  </div>
                </div>
              </div>
            )}
          </aside>

          <header className="mb-2 space-y-2 lg:hidden">
            <SubjectPicker
              compact
              language={settings.contentLang}
              value={settings.subject}
              onChange={(subject) => update({ subject })}
            />

            <div className="flex items-center gap-2">
              <LanguagePicker
                compact
                label={strings.language}
                value={settings.contentLang}
                onChange={(code) => update({ contentLang: code })}
              />

              <div className="relative">
                <button
                  className="flex items-center gap-1 rounded-full border border-[var(--line)] bg-[var(--glass)] px-2 py-1.5 text-xs font-semibold text-[var(--muted)]"
                  onClick={() => setLevelOpen(!levelOpen)}
                  type="button"
                >
                  {strings.level} {safeLevel} · {levelLabel}
                  <ChevronDown className={`h-3 w-3 transition-transform ${levelOpen ? 'rotate-180' : ''}`} strokeWidth={2.2} />
                </button>
                {levelOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setLevelOpen(false)} />
                    <div className="absolute left-0 top-full z-50 mt-1 max-h-72 w-56 overflow-y-auto rounded-[1rem] border border-[var(--line-strong)] bg-[var(--panel-strong)] p-1 shadow-[var(--shadow-soft)] backdrop-blur-xl">
                      {levels.map((level) => (
                        <button
                          key={level}
                          className={`flex w-full items-center gap-2 rounded-[0.75rem] px-3 py-2 text-left text-sm ${
                            level === safeLevel
                              ? 'bg-[var(--accent-gradient)] font-semibold text-[var(--ink)]'
                              : 'text-[var(--muted)] hover:bg-[var(--glass-hover)] hover:text-[var(--ink)]'
                          }`}
                          onClick={() => {
                            update({ level })
                            setLevelOpen(false)
                          }}
                          type="button"
                          disabled={!subjectDefinition}
                        >
                          <span className="font-bold">{level}</span>
                          <span>{subjectDefinition ? subjectDefinition.getLevelLabel(level, settings.contentLang) : '...'}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="ml-auto flex items-center gap-2">
                {mode === 'practice' && (
                  <button
                    className={`rounded-full px-2 py-1.5 text-xs font-semibold ${showStats ? 'bg-[var(--sky)] text-[var(--paper)]' : 'text-[var(--muted)]'}`}
                    onClick={() => setShowStats(!showStats)}
                    type="button"
                  >
                    {showStats ? strings.play : strings.stats}
                  </button>
                )}
              </div>
            </div>
          </header>

          <main className={`min-w-0 ${isFullscreen ? 'flex min-h-0 flex-1 flex-col lg:block' : ''}`}>
            <section className={`backdrop-blur-xl lg:rounded-[1.5rem] lg:bg-[var(--panel-quiet)] lg:p-5 ${isFullscreen ? 'flex min-h-0 flex-1 flex-col' : 'rounded-[1.25rem] bg-[var(--panel-quiet)] p-3 sm:p-4'}`}>
              <div className={`${isFullscreen ? 'flex min-h-0 flex-1 flex-col' : 'min-h-[34rem] sm:min-h-[36rem] lg:min-h-0'}`}>
                {mode === 'practice' && (
                  <PracticeTab
                    subject={settings.subject}
                    language={settings.contentLang}
                    level={safeLevel}
                    showStats={showStats}
                    audio={settings.audio}
                    microphone={settings.microphone}
                    onToggleAudio={() => update({ audio: settings.audio === 'on' ? 'muted' : 'on' })}
                    onToggleMicrophone={() => update({ microphone: settings.microphone === 'on' ? 'off' : 'on' })}
                  />
                )}
                {mode === 'preferences' && <PreferencesTab settings={settings} update={update} />}
              </div>
            </section>
          </main>
        </div>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--line)] bg-[var(--dock)]/92 px-2 pb-[calc(env(safe-area-inset-bottom)+0.25rem)] pt-1 backdrop-blur-2xl lg:hidden">
        <div className="mx-auto grid max-w-xs grid-cols-2">
          <TabButton icon="practice" label={strings.practice} active={mode === 'practice'} onClick={() => navigate('practice')} />
          <TabButton icon="preferences" label={strings.prefsShort} active={mode === 'preferences'} onClick={() => navigate('preferences')} />
        </div>
      </nav>
    </div>
  )
}

function TabButton({ icon, label, active, onClick }: { icon: string; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      className={`relative flex flex-col items-center gap-1 rounded-[1rem] px-2 py-2 text-center ${
        active
          ? 'bg-[var(--ink)] text-[var(--paper)] shadow-[var(--shadow-card)]'
          : 'text-[var(--muted)]'
      }`}
      onClick={onClick}
      type="button"
    >
      <TabIcon name={icon} />
      <span className="text-[0.6rem] font-bold uppercase tracking-[0.14em]">{label}</span>
    </button>
  )
}

function TabIcon({ name }: { name: string }) {
  switch (name) {
    case 'practice':
      return <Calculator className="h-5 w-5" strokeWidth={1.7} />
    case 'preferences':
      return <Settings2 className="h-5 w-5" strokeWidth={1.7} />
    default:
      return null
  }
}
