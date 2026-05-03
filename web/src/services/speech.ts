import { SPEECH_LOCALES, getStrings } from './i18n.ts'
import type { LanguageCode, QuestionRound } from '../types.ts'

const SPOKEN_SIDE_PATTERNS: Partial<Record<LanguageCode, { left: RegExp; right: RegExp }>> = {
  en: {
    left: /\b(left|first|one|1|option a|answer a|a)\b/i,
    right: /\b(right|second|two|2|option b|answer b|b)\b/i,
  },
  es: {
    left: /\b(izquierda|primera|uno|1|opcion a|respuesta a|a)\b/i,
    right: /\b(derecha|segunda|dos|2|opcion b|respuesta b|b)\b/i,
  },
  fr: {
    left: /\b(gauche|premiere|premier|un|1|option a|reponse a|a)\b/i,
    right: /\b(droite|deuxieme|deux|2|option b|reponse b|b)\b/i,
  },
  de: {
    left: /\b(links|erste|eins|1|option a|antwort a|a)\b/i,
    right: /\b(rechts|zweite|zwei|2|option b|antwort b|b)\b/i,
  },
  pt: {
    left: /\b(esquerda|primeira|um|1|opcao a|resposta a|a)\b/i,
    right: /\b(direita|segunda|dois|2|opcao b|resposta b|b)\b/i,
  },
  hi: {
    left: /(बायां|बाएं|पहला|एक|1|विकल्प a|उत्तर a|\ba\b)/i,
    right: /(दायां|दाएं|दूसरा|दो|2|विकल्प b|उत्तर b|\bb\b)/i,
  },
  it: {
    left: /\b(sinistra|prima|uno|1|opzione a|risposta a|a)\b/i,
    right: /\b(destra|seconda|due|2|opzione b|risposta b|b)\b/i,
  },
  tr: {
    left: /\b(sol|birinci|bir|1|secenek a|cevap a|a)\b/i,
    right: /\b(sag|ikinci|iki|2|secenek b|cevap b|b)\b/i,
  },
  nl: {
    left: /\b(links|eerste|een|1|optie a|antwoord a|a)\b/i,
    right: /\b(rechts|tweede|twee|2|optie b|antwoord b|b)\b/i,
  },
  pl: {
    left: /\b(lewo|pierwsza|jeden|1|opcja a|odpowiedz a|a)\b/i,
    right: /\b(prawo|druga|dwa|2|opcja b|odpowiedz b|b)\b/i,
  },
  uk: {
    left: /\b(ліворуч|ліва|перша|один|1|варіант a|відповідь a|a)\b/i,
    right: /\b(праворуч|права|друга|два|2|варіант b|відповідь b|b)\b/i,
  },
  ru: {
    left: /\b(лево|слева|первый|один|1|вариант a|ответ a|a)\b/i,
    right: /\b(право|справа|второй|два|2|вариант b|ответ b|b)\b/i,
  },
  ar: {
    left: /(يسار|الاول|واحد|1|الخيار a|الاجابة a|\ba\b)/i,
    right: /(يمين|الثاني|اثنان|2|الخيار b|الاجابة b|\bb\b)/i,
  },
  ja: {
    left: /(ひだり|左|いち|1|a)/i,
    right: /(みぎ|右|に|2|b)/i,
  },
  ko: {
    left: /(왼쪽|하나|1|a)/i,
    right: /(오른쪽|둘|2|b)/i,
  },
  zh: {
    left: /(左边|左側|左|一|1|a)/i,
    right: /(右边|右側|右|二|2|b)/i,
  },
}

export function roundToSpeech(round: QuestionRound, language: LanguageCode): string {
  const strings = getStrings(language)
  const passage = round.card.spokenPassage ?? round.card.passage
  const question = round.card.spokenQuestion ?? round.card.question
  const leftOption = round.correctSide === 'left'
    ? (round.card.spokenCorrectAnswer ?? round.leftOption)
    : (round.card.spokenWrongAnswer ?? round.leftOption)
  const rightOption = round.correctSide === 'right'
    ? (round.card.spokenCorrectAnswer ?? round.rightOption)
    : (round.card.spokenWrongAnswer ?? round.rightOption)

  return `${passage} ${question} ${strings.optionA}: ${leftOption}. ${strings.optionB}: ${rightOption}.`
}

export function spokenTextToSide(text: string, language: LanguageCode): 'left' | 'right' | null {
  const patterns = SPOKEN_SIDE_PATTERNS[language] ?? SPOKEN_SIDE_PATTERNS.en!
  if (patterns.left.test(text)) return 'left'
  if (patterns.right.test(text)) return 'right'
  return null
}

export function speakRound(round: QuestionRound, language: LanguageCode, onEnd?: () => void) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    onEnd?.()
    return
  }

  window.speechSynthesis.cancel()

  const utterance = new SpeechSynthesisUtterance(roundToSpeech(round, language))
  utterance.rate = 0.95
  utterance.pitch = 1
  utterance.lang = SPEECH_LOCALES[language] ?? SPEECH_LOCALES.en
  if (onEnd) utterance.onend = onEnd
  window.speechSynthesis.speak(utterance)
}

export function stopSpeaking() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
}
