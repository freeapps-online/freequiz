import type {
  CardContentFormat,
  CardIllustration,
  ComprehensionCard,
  LanguageCode,
  QuestionRound,
  QuestionSkill,
} from '../types.ts'
import { pickWeighted, type ProblemStatsMap } from './scores.ts'

type LocalizedText = { en: string } & Partial<Record<LanguageCode, string>>

interface CardTemplate {
  id: string
  skill: QuestionSkill
  title: LocalizedText
  categoryLabel: LocalizedText
  illustration: CardIllustration
  passage: LocalizedText
  passageFormat?: CardContentFormat
  question: LocalizedText
  correctAnswer: LocalizedText
  wrongAnswer: LocalizedText
  spokenPassage?: LocalizedText
  spokenQuestion?: LocalizedText
  spokenCorrectAnswer?: LocalizedText
  spokenWrongAnswer?: LocalizedText
}

const TITLES = {
  basics: { en: 'Syntax Basics' },
  tracing: { en: 'Trace the Output' },
  conditions: { en: 'Conditionals' },
  loops: { en: 'Loops' },
  functions: { en: 'Functions' },
  data: { en: 'Data Structures' },
  debugging: { en: 'Debugging' },
  complexity: { en: 'Complexity' },
  web: { en: 'Web Concepts' },
  challenge: { en: 'Engineering Mix' },
} satisfies Record<string, LocalizedText>

const CATEGORIES = {
  js: { en: 'JavaScript' },
  control: { en: 'Control Flow' },
  debugging: { en: 'Debugging' },
  algorithms: { en: 'Algorithms' },
  web: { en: 'Web and APIs' },
  architecture: { en: 'Engineering Concepts' },
} satisfies Record<string, LocalizedText>

const LEVEL_LABELS: Record<number, LocalizedText> = {
  1: TITLES.basics,
  2: TITLES.tracing,
  3: TITLES.conditions,
  4: TITLES.loops,
  5: TITLES.functions,
  6: TITLES.data,
  7: TITLES.debugging,
  8: TITLES.complexity,
  9: TITLES.web,
  10: TITLES.challenge,
}

const LEVELS_DATA: Record<number, CardTemplate[]> = {
  1: [
    {
      id: 'prog-l1-count',
      skill: 'syntax-basics',
      title: { en: 'Variable Update' },
      categoryLabel: CATEGORIES.js,
      illustration: 'code',
      passage: { en: "let count = 2\ncount += 3\nconsole.log(count)" },
      passageFormat: 'code',
      spokenPassage: { en: 'JavaScript snippet. Let count equal two. Add three to count. Then log count.' },
      question: { en: 'What prints?' },
      correctAnswer: { en: '5' },
      wrongAnswer: { en: '23' },
      spokenCorrectAnswer: { en: 'five' },
      spokenWrongAnswer: { en: 'twenty three' },
    },
    {
      id: 'prog-l1-const',
      skill: 'syntax-basics',
      title: { en: 'Pick the Better Declaration' },
      categoryLabel: CATEGORIES.js,
      illustration: 'concept',
      passage: { en: 'A value will never change after it is assigned.' },
      question: { en: 'Which declaration communicates that intent best?' },
      correctAnswer: { en: 'Use const.' },
      wrongAnswer: { en: 'Use let because it always means safer.' },
    },
  ],
  2: [
    {
      id: 'prog-l2-template',
      skill: 'output-tracing',
      title: { en: 'String Interpolation' },
      categoryLabel: CATEGORIES.js,
      illustration: 'code',
      passage: { en: "const name = 'Ada'\nconsole.log(`Hello, ${name}!`)" },
      passageFormat: 'code',
      spokenPassage: { en: 'JavaScript snippet. Const name equals Ada. Log hello, name, exclamation mark using a template string.' },
      question: { en: 'What prints?' },
      correctAnswer: { en: 'Hello, Ada!' },
      wrongAnswer: { en: 'Hello, name!' },
    },
    {
      id: 'prog-l2-length',
      skill: 'output-tracing',
      title: { en: 'Array Length' },
      categoryLabel: CATEGORIES.js,
      illustration: 'code',
      passage: { en: "const items = ['api', 'db', 'ui']\nconsole.log(items.length)" },
      passageFormat: 'code',
      spokenPassage: { en: 'JavaScript snippet. Const items equals api, db, and ui. Log items dot length.' },
      question: { en: 'What prints?' },
      correctAnswer: { en: '3' },
      wrongAnswer: { en: '2' },
      spokenCorrectAnswer: { en: 'three' },
      spokenWrongAnswer: { en: 'two' },
    },
  ],
  3: [
    {
      id: 'prog-l3-role',
      skill: 'conditionals',
      title: { en: 'Branch Logic' },
      categoryLabel: CATEGORIES.control,
      illustration: 'code',
      passage: {
        en: "const isAdmin = false\nif (isAdmin) {\n  console.log('edit')\n} else {\n  console.log('view')\n}",
      },
      passageFormat: 'code',
      spokenPassage: { en: 'JavaScript snippet. Const is admin equals false. If is admin log edit, else log view.' },
      question: { en: 'What prints?' },
      correctAnswer: { en: 'view' },
      wrongAnswer: { en: 'edit' },
    },
    {
      id: 'prog-l3-operator',
      skill: 'conditionals',
      title: { en: 'Choose the Safer Check' },
      categoryLabel: CATEGORIES.control,
      illustration: 'concept',
      passage: { en: 'You should show the deploy button only when the user is signed in and has the deploy permission.' },
      question: { en: 'Which condition matches the requirement?' },
      correctAnswer: { en: 'signedIn && canDeploy' },
      wrongAnswer: { en: 'signedIn || canDeploy' },
      spokenCorrectAnswer: { en: 'signed in and can deploy' },
      spokenWrongAnswer: { en: 'signed in or can deploy' },
    },
  ],
  4: [
    {
      id: 'prog-l4-sum',
      skill: 'loops',
      title: { en: 'Loop Counter' },
      categoryLabel: CATEGORIES.control,
      illustration: 'code',
      passage: {
        en: "let total = 0\nfor (let i = 1; i <= 3; i += 1) {\n  total += i\n}\nconsole.log(total)",
      },
      passageFormat: 'code',
      spokenPassage: { en: 'JavaScript snippet. Start total at zero. Loop i from one through three. Add i into total each time. Then log total.' },
      question: { en: 'What prints?' },
      correctAnswer: { en: '6' },
      wrongAnswer: { en: '3' },
      spokenCorrectAnswer: { en: 'six' },
      spokenWrongAnswer: { en: 'three' },
    },
    {
      id: 'prog-l4-while',
      skill: 'loops',
      title: { en: 'While Loop' },
      categoryLabel: CATEGORIES.control,
      illustration: 'code',
      passage: {
        en: "let n = 2\nwhile (n < 5) {\n  n += 1\n}\nconsole.log(n)",
      },
      passageFormat: 'code',
      spokenPassage: { en: 'JavaScript snippet. Start n at two. While n is less than five, add one to n. Then log n.' },
      question: { en: 'What prints?' },
      correctAnswer: { en: '5' },
      wrongAnswer: { en: '4' },
      spokenCorrectAnswer: { en: 'five' },
      spokenWrongAnswer: { en: 'four' },
    },
  ],
  5: [
    {
      id: 'prog-l5-return',
      skill: 'functions',
      title: { en: 'Function Return' },
      categoryLabel: CATEGORIES.js,
      illustration: 'code',
      passage: {
        en: "function double(x) {\n  return x * 2\n}\nconsole.log(double(4))",
      },
      passageFormat: 'code',
      spokenPassage: { en: 'JavaScript snippet. Function double takes x and returns x times two. Then log double of four.' },
      question: { en: 'What prints?' },
      correctAnswer: { en: '8' },
      wrongAnswer: { en: '4' },
      spokenCorrectAnswer: { en: 'eight' },
      spokenWrongAnswer: { en: 'four' },
    },
    {
      id: 'prog-l5-parameter',
      skill: 'functions',
      title: { en: 'Best Function Shape' },
      categoryLabel: CATEGORIES.architecture,
      illustration: 'concept',
      passage: { en: 'A function should turn a price in cents into a display string like "$12.50".' },
      question: { en: 'Which design is easier to test and reuse?' },
      correctAnswer: { en: 'A function that receives cents and returns the formatted string.' },
      wrongAnswer: { en: 'A function that only updates the DOM directly and returns nothing.' },
    },
  ],
  6: [
    {
      id: 'prog-l6-object',
      skill: 'data-structures',
      title: { en: 'Object Access' },
      categoryLabel: CATEGORIES.js,
      illustration: 'code',
      passage: {
        en: "const user = { name: 'Lin', role: 'dev' }\nconsole.log(user.role)",
      },
      passageFormat: 'code',
      spokenPassage: { en: 'JavaScript snippet. Const user is an object with name Lin and role dev. Log user dot role.' },
      question: { en: 'What prints?' },
      correctAnswer: { en: 'dev' },
      wrongAnswer: { en: 'Lin' },
    },
    {
      id: 'prog-l6-queue',
      skill: 'data-structures',
      title: { en: 'Choose the Right Structure' },
      categoryLabel: CATEGORIES.algorithms,
      illustration: 'concept',
      passage: { en: 'Support tickets should be handled in the same order they arrive.' },
      question: { en: 'Which structure models that behavior best?' },
      correctAnswer: { en: 'A queue.' },
      wrongAnswer: { en: 'A stack.' },
    },
  ],
  7: [
    {
      id: 'prog-l7-offbyone',
      skill: 'debugging',
      title: { en: 'Spot the Bug' },
      categoryLabel: CATEGORIES.debugging,
      illustration: 'code',
      passage: {
        en: "const items = ['a', 'b', 'c']\nfor (let i = 0; i <= items.length; i += 1) {\n  console.log(items[i])\n}",
      },
      passageFormat: 'code',
      spokenPassage: { en: 'JavaScript snippet. Items contains a, b, and c. A loop runs while i is less than or equal to items dot length and logs items at i.' },
      question: { en: 'What is the main bug?' },
      correctAnswer: { en: 'The loop runs one step too far because it uses <=.' },
      wrongAnswer: { en: 'The array needs to start at index 1.' },
    },
    {
      id: 'prog-l7-missing-return',
      skill: 'debugging',
      title: { en: 'Find the Missing Piece' },
      categoryLabel: CATEGORIES.debugging,
      illustration: 'code',
      passage: {
        en: "function add(a, b) {\n  a + b\n}\nconsole.log(add(2, 3))",
      },
      passageFormat: 'code',
      spokenPassage: { en: 'JavaScript snippet. Function add takes a and b. Inside, it evaluates a plus b but does not return it. Then it logs add of two and three.' },
      question: { en: 'Which fix is needed?' },
      correctAnswer: { en: 'Add return before a + b.' },
      wrongAnswer: { en: 'Rename the function to sum and keep the body the same.' },
    },
  ],
  8: [
    {
      id: 'prog-l8-search',
      skill: 'complexity',
      title: { en: 'Reason About Growth' },
      categoryLabel: CATEGORIES.algorithms,
      illustration: 'concept',
      passage: { en: 'Linear search checks items one by one until it finds the target or reaches the end.' },
      question: { en: 'What time complexity is the usual worst case?' },
      correctAnswer: { en: 'O(n)' },
      wrongAnswer: { en: 'O(1)' },
      spokenCorrectAnswer: { en: 'big o of n' },
      spokenWrongAnswer: { en: 'big o of one' },
    },
    {
      id: 'prog-l8-nested',
      skill: 'complexity',
      title: { en: 'Nested Loops' },
      categoryLabel: CATEGORIES.algorithms,
      illustration: 'concept',
      passage: { en: 'An algorithm runs one full loop over n items, and inside that loop it runs another full loop over n items.' },
      question: { en: 'What time complexity best matches that description?' },
      correctAnswer: { en: 'O(n^2)' },
      wrongAnswer: { en: 'O(log n)' },
      spokenCorrectAnswer: { en: 'big o of n squared' },
      spokenWrongAnswer: { en: 'big o of log n' },
    },
  ],
  9: [
    {
      id: 'prog-l9-http-method',
      skill: 'web-concepts',
      title: { en: 'Pick the Right HTTP Method' },
      categoryLabel: CATEGORIES.web,
      illustration: 'concept',
      passage: { en: 'A client needs to create a brand new user record on the server.' },
      question: { en: 'Which method is the normal fit?' },
      correctAnswer: { en: 'POST' },
      wrongAnswer: { en: 'GET' },
    },
    {
      id: 'prog-l9-status',
      skill: 'web-concepts',
      title: { en: 'Read the Status Code' },
      categoryLabel: CATEGORIES.web,
      illustration: 'concept',
      passage: { en: 'The client asked for `/users/42`, but that resource does not exist.' },
      question: { en: 'Which response code fits best?' },
      correctAnswer: { en: '404 Not Found' },
      wrongAnswer: { en: '500 Internal Server Error' },
    },
  ],
  10: [
    {
      id: 'prog-l10-pipeline',
      skill: 'engineering-mix',
      title: { en: 'Array Pipeline' },
      categoryLabel: CATEGORIES.js,
      illustration: 'code',
      passage: {
        en: "const out = [1, 2, 3, 4]\n  .filter((n) => n > 2)\n  .map((n) => n * 10)\nconsole.log(out)",
      },
      passageFormat: 'code',
      spokenPassage: { en: 'JavaScript snippet. Start with the array one, two, three, four. Keep numbers greater than two. Multiply the remaining numbers by ten. Then log the output array.' },
      question: { en: 'What prints?' },
      correctAnswer: { en: '[30, 40]' },
      wrongAnswer: { en: '[10, 20]' },
      spokenCorrectAnswer: { en: 'thirty and forty' },
      spokenWrongAnswer: { en: 'ten and twenty' },
    },
    {
      id: 'prog-l10-immutability',
      skill: 'engineering-mix',
      title: { en: 'Safer State Update' },
      categoryLabel: CATEGORIES.architecture,
      illustration: 'concept',
      passage: { en: 'A React state array should be updated without mutating the existing array in place.' },
      question: { en: 'Which approach is safer?' },
      correctAnswer: { en: 'Create a new array with spread, map, or filter.' },
      wrongAnswer: { en: 'Change the existing array directly and hope React notices.' },
    },
  ],
}

function localize(text: LocalizedText | undefined, language: LanguageCode): string | undefined {
  if (!text) return undefined
  return text[language] ?? text.en
}

function materializeCard(card: CardTemplate, language: LanguageCode): ComprehensionCard {
  return {
    id: card.id,
    skill: card.skill,
    title: localize(card.title, language) ?? '',
    categoryLabel: localize(card.categoryLabel, language) ?? '',
    illustration: card.illustration,
    passage: localize(card.passage, language) ?? '',
    passageFormat: card.passageFormat,
    question: localize(card.question, language) ?? '',
    correctAnswer: localize(card.correctAnswer, language) ?? '',
    wrongAnswer: localize(card.wrongAnswer, language) ?? '',
    spokenPassage: localize(card.spokenPassage, language),
    spokenQuestion: localize(card.spokenQuestion, language),
    spokenCorrectAnswer: localize(card.spokenCorrectAnswer, language),
    spokenWrongAnswer: localize(card.spokenWrongAnswer, language),
  }
}

export const LEVELS = Object.keys(LEVELS_DATA).map(Number)

export function getLevelLabel(level: number, language: LanguageCode): string {
  return localize(LEVEL_LABELS[level] ?? LEVEL_LABELS[1], language) ?? ''
}

export function getCardLabel(id: string, language: LanguageCode): string {
  for (const cards of Object.values(LEVELS_DATA)) {
    const card = cards.find((item) => item.id === id)
    if (card) return localize(card.question, language) ?? id
  }
  return id
}

export function generateRound(
  level: number,
  language: LanguageCode,
  stats: ProblemStatsMap = {},
  previousCardId?: string,
): QuestionRound {
  const pool = LEVELS_DATA[level] ?? LEVELS_DATA[1]
  const previous = previousCardId ? pool.find((card) => card.id === previousCardId) : undefined
  const template = pickWeighted(pool, stats, previous)
  const card = materializeCard(template, language)
  const correctSide = Math.random() < 0.5 ? 'left' : 'right' as const

  return {
    card,
    correctSide,
    leftOption: correctSide === 'left' ? card.correctAnswer : card.wrongAnswer,
    rightOption: correctSide === 'right' ? card.correctAnswer : card.wrongAnswer,
  }
}
