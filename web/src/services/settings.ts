import type { LanguageCode } from '../types.ts'

const STORAGE_KEY = 'freequiz-settings'

export type ThemePreference = 'system' | 'light' | 'dark'
export type FontSizePreference = 'small' | 'medium' | 'large' | 'xlarge'
export type MotionPreference = 'full' | 'reduced'
export type SurfacePreference = 'soft' | 'bold'
export type AudioPreference = 'on' | 'muted'
export type MicrophonePreference = 'off' | 'on'

export interface Settings {
  contentLang: LanguageCode
  theme: ThemePreference
  labelSize: FontSizePreference
  contentSize: FontSizePreference
  motion: MotionPreference
  surface: SurfacePreference
  audio: AudioPreference
  microphone: MicrophonePreference
  level: number
}

const defaults: Settings = {
  contentLang: 'en',
  theme: 'dark',
  labelSize: 'medium',
  contentSize: 'medium',
  motion: 'full',
  surface: 'soft',
  audio: 'on',
  microphone: 'off',
  level: 1,
}

export function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { ...defaults, ...JSON.parse(raw) }
  } catch { /* ignore */ }
  return defaults
}

export function saveSettings(settings: Settings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
}
