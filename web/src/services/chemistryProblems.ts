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
  formulas: { en: 'Formula Basics' },
  counting: { en: 'Count the Atoms' },
  atoms: { en: 'Atomic Structure' },
  bonding: { en: 'Bonding' },
  reactions: { en: 'Chemical Reactions' },
  quantities: { en: 'Moles and Amounts' },
  acids: { en: 'Acids and Bases' },
  energy: { en: 'States and Energy' },
  lab: { en: 'Lab Reasoning' },
  challenge: { en: 'Chemistry Mix' },
} satisfies Record<string, LocalizedText>

const CATEGORIES = {
  formulas: { en: 'Formulas' },
  atoms: { en: 'Atoms' },
  bonding: { en: 'Bonding' },
  reactions: { en: 'Reactions' },
  quantities: { en: 'Quantities' },
  lab: { en: 'Lab Concepts' },
} satisfies Record<string, LocalizedText>

const LEVEL_LABELS: Record<number, LocalizedText> = {
  1: TITLES.formulas,
  2: TITLES.counting,
  3: TITLES.atoms,
  4: TITLES.bonding,
  5: TITLES.reactions,
  6: TITLES.quantities,
  7: TITLES.acids,
  8: TITLES.energy,
  9: TITLES.lab,
  10: TITLES.challenge,
}

const LEVELS_DATA: Record<number, CardTemplate[]> = {
  1: [
    {
      id: 'chem-l1-water',
      skill: 'formula-basics',
      title: { en: 'Name the Compound' },
      categoryLabel: CATEGORIES.formulas,
      illustration: 'code',
      passage: { en: 'H2O' },
      passageFormat: 'code',
      spokenPassage: { en: 'Formula: H two O.' },
      question: { en: 'What substance is this?' },
      correctAnswer: { en: 'Water' },
      wrongAnswer: { en: 'Hydrogen peroxide' },
    },
    {
      id: 'chem-l1-salt',
      skill: 'formula-basics',
      title: { en: 'Recognize a Common Formula' },
      categoryLabel: CATEGORIES.formulas,
      illustration: 'code',
      passage: { en: 'NaCl' },
      passageFormat: 'code',
      spokenPassage: { en: 'Formula: N A C L.' },
      question: { en: 'What substance is this best known as?' },
      correctAnswer: { en: 'Table salt' },
      wrongAnswer: { en: 'Sugar' },
    },
  ],
  2: [
    {
      id: 'chem-l2-carbon-dioxide',
      skill: 'atom-counting',
      title: { en: 'Count Subscripts' },
      categoryLabel: CATEGORIES.formulas,
      illustration: 'code',
      passage: { en: 'CO2' },
      passageFormat: 'code',
      spokenPassage: { en: 'Formula: C O two.' },
      question: { en: 'How many oxygen atoms are in one molecule?' },
      correctAnswer: { en: '2' },
      wrongAnswer: { en: '1' },
      spokenCorrectAnswer: { en: 'two' },
      spokenWrongAnswer: { en: 'one' },
    },
    {
      id: 'chem-l2-ammonia',
      skill: 'atom-counting',
      title: { en: 'Read the Formula' },
      categoryLabel: CATEGORIES.formulas,
      illustration: 'code',
      passage: { en: 'NH3' },
      passageFormat: 'code',
      spokenPassage: { en: 'Formula: N H three.' },
      question: { en: 'How many hydrogen atoms are in one molecule?' },
      correctAnswer: { en: '3' },
      wrongAnswer: { en: '1' },
      spokenCorrectAnswer: { en: 'three' },
      spokenWrongAnswer: { en: 'one' },
    },
  ],
  3: [
    {
      id: 'chem-l3-protons',
      skill: 'atomic-structure',
      title: { en: 'Identify the Element' },
      categoryLabel: CATEGORIES.atoms,
      illustration: 'concept',
      passage: { en: 'The number of protons in an atom determines which element it is.' },
      question: { en: 'Which particle decides the element identity?' },
      correctAnswer: { en: 'Protons' },
      wrongAnswer: { en: 'Neutrons' },
    },
    {
      id: 'chem-l3-neutral',
      skill: 'atomic-structure',
      title: { en: 'Neutral Atom' },
      categoryLabel: CATEGORIES.atoms,
      illustration: 'concept',
      passage: { en: 'An atom is neutral overall.' },
      question: { en: 'What must be equal in a neutral atom?' },
      correctAnswer: { en: 'The number of protons and electrons' },
      wrongAnswer: { en: 'The number of neutrons and electrons' },
    },
  ],
  4: [
    {
      id: 'chem-l4-ionic',
      skill: 'bonding',
      title: { en: 'Choose the Bond Type' },
      categoryLabel: CATEGORIES.bonding,
      illustration: 'concept',
      passage: { en: 'A metal transfers electrons to a nonmetal.' },
      question: { en: 'What kind of bond is that?' },
      correctAnswer: { en: 'Ionic bond' },
      wrongAnswer: { en: 'Covalent bond' },
    },
    {
      id: 'chem-l4-covalent',
      skill: 'bonding',
      title: { en: 'Shared Electrons' },
      categoryLabel: CATEGORIES.bonding,
      illustration: 'concept',
      passage: { en: 'Two nonmetals share electrons in a molecule.' },
      question: { en: 'What kind of bond is that?' },
      correctAnswer: { en: 'Covalent bond' },
      wrongAnswer: { en: 'Ionic bond' },
    },
  ],
  5: [
    {
      id: 'chem-l5-balance-water',
      skill: 'reactions',
      title: { en: 'Balance the Equation' },
      categoryLabel: CATEGORIES.reactions,
      illustration: 'code',
      passage: { en: 'H2 + O2 -> H2O' },
      passageFormat: 'code',
      spokenPassage: { en: 'Equation: H two plus O two gives H two O.' },
      question: { en: 'Which balanced form is correct?' },
      correctAnswer: { en: '2H2 + O2 -> 2H2O' },
      wrongAnswer: { en: 'H2 + O2 -> H2O2' },
      spokenCorrectAnswer: { en: 'two H two plus O two gives two H two O' },
      spokenWrongAnswer: { en: 'H two plus O two gives H two O two' },
    },
    {
      id: 'chem-l5-products',
      skill: 'reactions',
      title: { en: 'Reactants vs Products' },
      categoryLabel: CATEGORIES.reactions,
      illustration: 'code',
      passage: { en: 'N2 + 3H2 -> 2NH3' },
      passageFormat: 'code',
      spokenPassage: { en: 'Equation: N two plus three H two gives two N H three.' },
      question: { en: 'Which side shows the products?' },
      correctAnswer: { en: 'The right side of the arrow' },
      wrongAnswer: { en: 'The left side of the arrow' },
    },
  ],
  6: [
    {
      id: 'chem-l6-mole',
      skill: 'quantities',
      title: { en: 'Know the Unit' },
      categoryLabel: CATEGORIES.quantities,
      illustration: 'concept',
      passage: { en: 'Chemists use the mole to count enormous numbers of particles.' },
      question: { en: 'One mole is closest to which idea?' },
      correctAnswer: { en: 'About 6.022 x 10^23 particles' },
      wrongAnswer: { en: 'Exactly 100 particles' },
      spokenCorrectAnswer: { en: 'about six point zero two two times ten to the twenty third particles' },
      spokenWrongAnswer: { en: 'exactly one hundred particles' },
    },
    {
      id: 'chem-l6-molar-mass',
      skill: 'quantities',
      title: { en: 'Use Molar Mass' },
      categoryLabel: CATEGORIES.quantities,
      illustration: 'concept',
      passage: { en: 'Molar mass links grams and moles for a substance.' },
      question: { en: 'What does molar mass help you convert between?' },
      correctAnswer: { en: 'Mass and amount of substance' },
      wrongAnswer: { en: 'Temperature and pressure' },
    },
  ],
  7: [
    {
      id: 'chem-l7-ph',
      skill: 'acids-bases',
      title: { en: 'Read the pH Scale' },
      categoryLabel: CATEGORIES.lab,
      illustration: 'concept',
      passage: { en: 'A solution has pH 3.' },
      question: { en: 'How should it be classified?' },
      correctAnswer: { en: 'Acidic' },
      wrongAnswer: { en: 'Basic' },
    },
    {
      id: 'chem-l7-naoh',
      skill: 'acids-bases',
      title: { en: 'Recognize a Base' },
      categoryLabel: CATEGORIES.lab,
      illustration: 'code',
      passage: { en: 'NaOH' },
      passageFormat: 'code',
      spokenPassage: { en: 'Formula: N A O H.' },
      question: { en: 'This compound is commonly classified as what?' },
      correctAnswer: { en: 'A base' },
      wrongAnswer: { en: 'An acid' },
    },
  ],
  8: [
    {
      id: 'chem-l8-endothermic',
      skill: 'energy',
      title: { en: 'Heat Flow' },
      categoryLabel: CATEGORIES.lab,
      illustration: 'concept',
      passage: { en: 'An endothermic change takes in heat from its surroundings.' },
      question: { en: 'What happens to heat in an endothermic process?' },
      correctAnswer: { en: 'Heat is absorbed' },
      wrongAnswer: { en: 'Heat is released' },
    },
    {
      id: 'chem-l8-gas',
      skill: 'states-energy',
      title: { en: 'Particle Motion' },
      categoryLabel: CATEGORIES.lab,
      illustration: 'concept',
      passage: { en: 'Particles in a gas move much more freely than in a solid.' },
      question: { en: 'Which state has particles that are far apart and moving freely?' },
      correctAnswer: { en: 'Gas' },
      wrongAnswer: { en: 'Solid' },
    },
  ],
  9: [
    {
      id: 'chem-l9-dilution',
      skill: 'lab-reasoning',
      title: { en: 'Predict a Lab Result' },
      categoryLabel: CATEGORIES.lab,
      illustration: 'concept',
      passage: { en: 'You add more water to the same amount of dissolved salt.' },
      question: { en: 'What happens to the solution concentration?' },
      correctAnswer: { en: 'It decreases' },
      wrongAnswer: { en: 'It increases' },
    },
    {
      id: 'chem-l9-catalyst',
      skill: 'lab-reasoning',
      title: { en: 'Catalyst Role' },
      categoryLabel: CATEGORIES.lab,
      illustration: 'concept',
      passage: { en: 'A catalyst helps a reaction happen faster.' },
      question: { en: 'What is also true about a catalyst in the overall reaction?' },
      correctAnswer: { en: 'It is not permanently consumed' },
      wrongAnswer: { en: 'It becomes one of the main products' },
    },
  ],
  10: [
    {
      id: 'chem-l10-combustion',
      skill: 'chemistry-mix',
      title: { en: 'Reason About a Reaction' },
      categoryLabel: CATEGORIES.reactions,
      illustration: 'concept',
      passage: { en: 'Complete combustion of a hydrocarbon in oxygen usually forms carbon dioxide and water.' },
      question: { en: 'Which pair of products should you expect?' },
      correctAnswer: { en: 'Carbon dioxide and water' },
      wrongAnswer: { en: 'Nitrogen and helium' },
    },
    {
      id: 'chem-l10-conservation',
      skill: 'chemistry-mix',
      title: { en: 'Conservation of Matter' },
      categoryLabel: CATEGORIES.reactions,
      illustration: 'concept',
      passage: { en: 'A chemical equation must show the same number of each kind of atom on both sides.' },
      question: { en: 'Why do chemists balance equations?' },
      correctAnswer: { en: 'To reflect conservation of matter' },
      wrongAnswer: { en: 'To make the reaction happen faster' },
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
