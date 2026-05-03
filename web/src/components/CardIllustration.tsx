import type { CardIllustration as IllustrationKind } from '../types.ts'

interface Props {
  kind: IllustrationKind
  cardId?: string
}

export function CardIllustration({ kind, cardId }: Props) {
  return (
    <div className="overflow-hidden rounded-[1.4rem] border border-[var(--line)] bg-[var(--warm-gradient)]">
      <svg viewBox="0 0 320 150" className="h-36 w-full" aria-hidden="true">
        <rect width="320" height="150" fill="transparent" />
        <path d="M0 118C44 102 92 112 132 101C171 90 208 68 252 74C280 78 302 92 320 101V150H0Z" fill="var(--paper)" opacity="0.45" />
        {renderCardScene(cardId, kind)}
      </svg>
    </div>
  )
}

function renderCardScene(cardId: string | undefined, kind: IllustrationKind) {
  switch (cardId) {
    case 'l1-garden':
      return (
        <>
          <WindowScene />
          <Sun x={250} y={34} r={16} />
          <Pot x={64} y={88} sprout />
          <Pot x={126} y={90} sprout />
          <Pot x={188} y={92} />
          <WaterCan x={236} y={98} />
        </>
      )
    case 'l1-library':
      return (
        <>
          <Bookshelf />
          <Rug x={86} y={116} width={108} color="var(--sky-soft)" />
          <Rug x={212} y={116} width={108} color="var(--accent-soft)" />
          <Reader x={88} y={86} shirt="var(--mint)" />
          <Reader x={214} y={84} shirt="var(--sky)" />
          <OpenBook x={150} y={80} color="var(--warning)" />
        </>
      )
    case 'l2-lunchbox':
      return (
        <>
          <Lunchbox />
          <AppleSlices />
          <Sandwich />
          <NoteCard />
          <Magnifier x={260} y={92} />
        </>
      )
    case 'l2-zoo':
      return (
        <>
          <ZooSign />
          <Penguin x={112} y={102} scale={1} />
          <Penguin x={154} y={106} scale={0.82} />
          <Penguin x={192} y={100} scale={1.08} />
          <WaterLine />
          <Postcard x={246} y={84} />
        </>
      )
    case 'l3-seed':
      return (
        <>
          <SequenceDots />
          <SeedHole x={56} />
          <SeedStepArrow x={92} />
          <SeedPlant x={138} stage="seed" />
          <SeedStepArrow x={174} />
          <SeedPlant x={220} stage="sprout" />
          <SeedStepArrow x={256} />
          <WaterCan x={274} y={94} scale={0.85} />
        </>
      )
    case 'l3-suitcase':
      return (
        <>
          <Suitcase x={146} y={88} />
          <FoldedShirt x={70} y={54} color="var(--sky-soft)" />
          <FoldedShirt x={106} y={66} color="var(--accent-soft)" />
          <SocksInShoes />
          <DoorFrame />
        </>
      )
    case 'l4-boots':
      return (
        <>
          <RainCloud x={68} y={42} />
          <RainCloud x={130} y={36} scale={0.8} />
          <Puddle />
          <MudBoots />
          <TinyShovel />
        </>
      )
    case 'l4-stage':
      return (
        <>
          <StageCurtains />
          <Spotlight />
          <Actor x={160} y={88} />
          <ScriptCard />
        </>
      )
    case 'l5-shelter':
      return (
        <>
          <ShelterHouse />
          <Dog x={122} y={104} />
          <DogBrush />
          <TowelStack />
          <ToyBall />
        </>
      )
    case 'l5-teamwork':
      return (
        <>
          <BlockTower />
          <Builder x={76} y={108} shirt="var(--sky)" />
          <Builder x={242} y={110} shirt="var(--mint)" />
          <Builder x={168} y={122} shirt="var(--accent)" small />
        </>
      )
    case 'l6-bike':
      return (
        <>
          <Mailbox />
          <Bike />
          <Runner />
          <BurstStar />
        </>
      )
    case 'l6-sandwich':
      return (
        <>
          <LunchTable />
          <PersonFace x={104} y={74} fill="var(--sky-soft)" smile />
          <PersonFace x={214} y={76} fill="var(--accent-soft)" />
          <SharedSandwich />
          <HeartSpark x={160} y={46} />
        </>
      )
    case 'l7-key':
      return (
        <>
          <DoorLock />
          <BigKey />
          <QuestionBurst />
        </>
      )
    case 'l7-shadow':
      return (
        <>
          <Sun x={76} y={34} r={15} />
          <StandingFigure x={146} y={96} color="var(--accent-soft)" />
          <ShadowShape />
        </>
      )
    case 'l8-beads':
      return (
        <>
          <BraceletString />
          <Bead x={72} y={76} fill="var(--accent)" />
          <Bead x={114} y={76} fill="var(--sky)" />
          <Bead x={156} y={76} fill="var(--accent)" />
          <Bead x={198} y={76} fill="var(--sky)" />
          <Bead x={240} y={76} fill="var(--accent)" />
          <Bead x={282} y={76} fill="var(--sky)" dashed />
        </>
      )
    case 'l8-tiles':
      return (
        <>
          <TileGrid />
          <TriangleTile x={78} y={80} fill="var(--accent-soft)" />
          <SquareTile x={132} y={80} fill="var(--sky-soft)" />
          <TriangleTile x={186} y={80} fill="var(--accent-soft)" />
          <SquareTile x={240} y={80} fill="var(--sky-soft)" />
          <TriangleTile x={294} y={80} fill="var(--mint-soft)" dashed />
        </>
      )
    case 'l9-bench':
      return (
        <>
          <Bench />
          <PersonBadge x={92} y={68} label="B" fill="var(--accent-soft)" />
          <PersonBadge x={160} y={68} label="C" fill="var(--sky-soft)" />
          <PersonBadge x={228} y={68} label="A" fill="var(--mint-soft)" />
        </>
      )
    case 'l9-cups':
      return (
        <>
          <Cup x={76} label="*" fill="var(--accent-soft)" />
          <Cup x={160} label="M" fill="var(--sky-soft)" />
          <Cup x={244} label="S" fill="var(--warning)" />
          <Coin x={244} y={110} />
        </>
      )
    case 'l10-robot':
      return (
        <>
          <NumberTrack />
          <Robot />
          <NumberBadge x={78} y={108} label="2" active />
          <NumberBadge x={140} y={108} label="4" />
          <NumberBadge x={202} y={108} label="6" />
          <NumberBadge x={264} y={108} label="8" goal />
        </>
      )
    case 'l10-tools':
      return (
        <>
          <WorkTable />
          <PaperSheet />
          <ScissorsIcon x={120} y={86} />
          <GlueStick x={222} y={84} />
          <CutLine />
        </>
      )
    default:
      return renderKindFallback(kind)
  }
}

function renderKindFallback(kind: IllustrationKind) {
  if (kind === 'story') {
    return (
      <>
        <Reader x={76} y={88} shirt="var(--sky)" />
        <OpenBook x={160} y={86} color="var(--accent)" />
        <Sun x={252} y={40} r={15} />
      </>
    )
  }

  if (kind === 'detail') {
    return (
      <>
        <Magnifier x={90} y={82} />
        <NoteCard x={190} y={56} />
      </>
    )
  }

  if (kind === 'sequence') {
    return (
      <>
        <SequenceDots />
        <SeedPlant x={72} stage="seed" />
        <SeedStepArrow x={108} />
        <SeedPlant x={170} stage="sprout" />
        <SeedStepArrow x={208} />
        <SeedPlant x={270} stage="flower" />
      </>
    )
  }

  if (kind === 'inference') {
    return (
      <>
        <ThoughtBubble />
        <QuestionBurst />
      </>
    )
  }

  if (kind === 'conclusion') {
    return (
      <>
        <ChecklistPanel />
      </>
    )
  }

  if (kind === 'feelings') {
    return (
      <>
        <HeartSpark x={106} y={54} />
        <PersonFace x={120} y={84} fill="var(--warning)" smile />
        <PersonFace x={212} y={84} fill="var(--accent-soft)" />
      </>
    )
  }

  if (kind === 'riddle') {
    return (
      <>
        <QuestionBurst />
        <BigKey scale={0.72} x={224} y={78} />
      </>
    )
  }

  if (kind === 'pattern') {
    return (
      <>
        <BraceletString />
        <Bead x={92} y={76} fill="var(--accent)" />
        <Bead x={136} y={76} fill="var(--sky)" />
        <Bead x={180} y={76} fill="var(--accent)" />
        <Bead x={224} y={76} fill="var(--sky)" />
      </>
    )
  }

  if (kind === 'logic') {
    return (
      <>
        <Bench />
        <PersonBadge x={110} y={68} label="A" fill="var(--accent-soft)" />
        <PersonBadge x={160} y={68} label="B" fill="var(--sky-soft)" />
        <PersonBadge x={210} y={68} label="C" fill="var(--mint-soft)" />
      </>
    )
  }

  if (kind === 'code') {
    return (
      <>
        <rect x="42" y="30" width="236" height="90" rx="16" fill="var(--paper-deep)" stroke="var(--line-strong)" />
        <circle cx="64" cy="48" r="4" fill="var(--error)" />
        <circle cx="80" cy="48" r="4" fill="var(--warning)" />
        <circle cx="96" cy="48" r="4" fill="var(--mint)" />
        <path d="M76 74h92M76 90h134M76 106h86" stroke="var(--sky)" strokeWidth="6" strokeLinecap="round" opacity="0.8" />
        <path d="M210 72l-14 16 14 16M234 72l14 16-14 16" fill="none" stroke="var(--accent)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </>
    )
  }

  if (kind === 'concept') {
    return (
      <>
        <rect x="54" y="42" width="62" height="62" rx="16" fill="var(--sky-soft)" opacity="0.75" />
        <rect x="130" y="28" width="138" height="28" rx="14" fill="var(--paper)" stroke="var(--line-strong)" />
        <rect x="130" y="64" width="138" height="16" rx="8" fill="var(--accent-soft)" opacity="0.8" />
        <rect x="130" y="88" width="102" height="16" rx="8" fill="var(--mint-soft)" opacity="0.8" />
        <path d="M72 74h26l10 10 20-26" fill="none" stroke="var(--mint)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      </>
    )
  }

  return (
    <>
      <Robot />
      <BurstStar />
      <QuestionBurst x={248} y={52} />
    </>
  )
}

function WindowScene() {
  return (
    <>
      <rect x="22" y="24" width="118" height="78" rx="14" fill="var(--paper)" stroke="var(--line-strong)" />
      <path d="M81 24v78M22 63h118" stroke="var(--line)" strokeWidth="4" />
      <path d="M28 92c20-8 40-10 54-4 16 6 36 6 52-2" fill="none" stroke="var(--mint)" strokeWidth="6" strokeLinecap="round" />
    </>
  )
}

function Bookshelf() {
  return (
    <>
      <rect x="28" y="28" width="264" height="18" rx="8" fill="var(--line-strong)" opacity="0.18" />
      <rect x="40" y="38" width="18" height="40" rx="5" fill="var(--accent-soft)" />
      <rect x="64" y="34" width="18" height="44" rx="5" fill="var(--sky-soft)" />
      <rect x="88" y="32" width="20" height="46" rx="5" fill="var(--mint-soft)" />
      <rect x="222" y="34" width="18" height="44" rx="5" fill="var(--accent-soft)" />
      <rect x="246" y="30" width="18" height="48" rx="5" fill="var(--warning)" opacity="0.7" />
      <rect x="270" y="36" width="14" height="42" rx="5" fill="var(--sky-soft)" />
    </>
  )
}

function Rug({ x, y, width, color }: { x: number; y: number; width: number; color: string }) {
  return <rect x={x} y={y} width={width} height="18" rx="9" fill={color} opacity="0.82" />
}

function Reader({ x, y, shirt }: { x: number; y: number; shirt: string }) {
  return (
    <>
      <circle cx={x} cy={y - 20} r="12" fill="var(--accent-soft)" />
      <rect x={x - 16} y={y - 8} width="32" height="26" rx="12" fill={shirt} />
      <rect x={x - 14} y={y - 4} width="28" height="12" rx="6" fill="var(--paper)" opacity="0.8" />
    </>
  )
}

function OpenBook({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <>
      <path d={`M${x - 24} ${y}c12-8 24-8 36 0v26c-12-8-24-8-36 0Z`} fill="var(--paper)" stroke="var(--line-strong)" />
      <path d={`M${x + 24} ${y}c-12-8-24-8-36 0v26c12-8 24-8 36 0Z`} fill={color} opacity="0.2" stroke="var(--line-strong)" />
      <path d={`M${x} ${y}v26`} stroke="var(--line)" strokeWidth="3" />
    </>
  )
}

function Pot({ x, y, sprout, scale = 1 }: { x: number; y: number; sprout?: boolean; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x="-18" y="0" width="36" height="18" rx="6" fill="var(--accent)" opacity="0.84" />
      <rect x="-22" y="-6" width="44" height="8" rx="4" fill="var(--accent-deep)" opacity="0.9" />
      <rect x="-14" y="-10" width="28" height="8" rx="4" fill="#7d5a3b" opacity="0.45" />
      {sprout && (
        <>
          <path d="M0-10V-24" stroke="var(--mint-deep)" strokeWidth="4" strokeLinecap="round" />
          <path d="M0-18c0-8 6-12 14-12-1 8-6 12-14 12Z" fill="var(--mint)" />
          <path d="M0-16c0-6-5-9-12-9 1 6 5 9 12 9Z" fill="var(--mint-soft)" />
        </>
      )}
    </g>
  )
}

function WaterCan({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x="-18" y="-10" width="28" height="20" rx="8" fill="var(--sky)" />
      <path d="M10-4h10l8 6" fill="none" stroke="var(--sky-deep)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M-18-2c-10 0-10 16 0 16" fill="none" stroke="var(--sky-deep)" strokeWidth="5" strokeLinecap="round" />
    </g>
  )
}

function Lunchbox() {
  return (
    <>
      <rect x="42" y="44" width="128" height="66" rx="18" fill="var(--paper)" stroke="var(--line-strong)" />
      <rect x="58" y="56" width="96" height="42" rx="12" fill="var(--accent-soft)" opacity="0.35" />
      <path d="M84 44c0-12 8-18 22-18s22 6 22 18" fill="none" stroke="var(--line-strong)" strokeWidth="6" strokeLinecap="round" />
    </>
  )
}

function AppleSlices() {
  return (
    <>
      <path d="M86 74c12-18 20-18 32 0-12 10-20 10-32 0Z" fill="var(--warning)" opacity="0.88" />
      <path d="M112 74c10-16 18-16 28 0-10 9-18 9-28 0Z" fill="var(--warning)" opacity="0.72" />
    </>
  )
}

function Sandwich() {
  return (
    <>
      <path d="M104 98h42c10 0 14-8 10-14l-6-10H98l-4 10c-4 8 0 14 10 14Z" fill="var(--warning)" opacity="0.65" />
      <path d="M100 78h52" stroke="var(--mint)" strokeWidth="5" strokeLinecap="round" />
    </>
  )
}

function NoteCard({ x = 214, y = 52 }: { x?: number; y?: number }) {
  return (
    <>
      <rect x={x} y={y} width="66" height="48" rx="10" fill="var(--paper)" stroke="var(--line-strong)" />
      <path d={`M${x + 14} ${y + 16}h38M${x + 14} ${y + 26}h30M${x + 14} ${y + 36}h22`} stroke="var(--accent-deep)" strokeWidth="4" strokeLinecap="round" />
    </>
  )
}

function Magnifier({ x, y }: { x: number; y: number }) {
  return (
    <>
      <circle cx={x} cy={y} r="20" fill="var(--paper)" stroke="var(--sky)" strokeWidth="8" />
      <path d={`M${x + 14} ${y + 14}l22 22`} stroke="var(--sky)" strokeWidth="9" strokeLinecap="round" />
    </>
  )
}

function ZooSign() {
  return (
    <>
      <rect x="30" y="30" width="78" height="44" rx="12" fill="var(--mint-soft)" stroke="var(--line-strong)" />
      <path d="M48 52h42" stroke="var(--mint-deep)" strokeWidth="6" strokeLinecap="round" />
      <path d="M42 74v18M96 74v18" stroke="var(--line-strong)" strokeWidth="6" strokeLinecap="round" />
    </>
  )
}

function Penguin({ x, y, scale }: { x: number; y: number; scale: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse cx="0" cy="0" rx="18" ry="24" fill="var(--ink)" />
      <ellipse cx="0" cy="4" rx="10" ry="16" fill="var(--paper)" />
      <circle cx="0" cy="-20" r="10" fill="var(--ink)" />
      <path d="M-4-10h8" stroke="var(--warning)" strokeWidth="4" strokeLinecap="round" />
      <path d="M-10 24h8M2 24h8" stroke="var(--warning)" strokeWidth="4" strokeLinecap="round" />
    </g>
  )
}

function WaterLine() {
  return <path d="M90 120c22-10 38-10 58 0 20 10 38 10 58 0 20-10 36-10 54 0" fill="none" stroke="var(--sky)" strokeWidth="6" strokeLinecap="round" />
}

function Postcard({ x, y }: { x: number; y: number }) {
  return (
    <>
      <rect x={x} y={y} width="48" height="34" rx="8" fill="var(--paper)" stroke="var(--line-strong)" transform={`rotate(8 ${x + 24} ${y + 17})`} />
      <path d={`M${x + 10} ${y + 15}h18M${x + 10} ${y + 22}h24`} stroke="var(--accent-deep)" strokeWidth="3" strokeLinecap="round" transform={`rotate(8 ${x + 24} ${y + 17})`} />
    </>
  )
}

function SequenceDots() {
  return <path d="M38 118h244" stroke="var(--line)" strokeWidth="4" strokeDasharray="5 8" strokeLinecap="round" />
}

function SeedHole({ x }: { x: number }) {
  return (
    <>
      <ellipse cx={x} cy="108" rx="20" ry="8" fill="#8b6d50" opacity="0.55" />
      <circle cx={x} cy="100" r="5" fill="var(--warning)" />
    </>
  )
}

function SeedPlant({ x, stage }: { x: number; stage: 'seed' | 'sprout' | 'flower' }) {
  if (stage === 'seed') return <Pot x={x} y={96} scale={0.8} />
  if (stage === 'sprout') return <Pot x={x} y={96} sprout scale={0.8} />
  return (
    <g transform={`translate(${x} 96) scale(0.8)`}>
      <Pot x={0} y={0} sprout />
      <circle cx="0" cy="-38" r="8" fill="var(--accent)" />
      <circle cx="-8" cy="-32" r="6" fill="var(--warning)" />
      <circle cx="8" cy="-32" r="6" fill="var(--warning)" />
    </g>
  )
}

function SeedStepArrow({ x }: { x: number }) {
  return <path d={`M${x} 96h18m-8-8 8 8-8 8`} fill="none" stroke="var(--ink)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
}

function Suitcase({ x, y }: { x: number; y: number }) {
  return (
    <>
      <rect x={x - 44} y={y - 22} width="88" height="50" rx="12" fill="var(--accent-soft)" stroke="var(--line-strong)" />
      <path d={`M${x - 14} ${y - 22}c0-10 6-16 14-16s14 6 14 16`} fill="none" stroke="var(--line-strong)" strokeWidth="5" strokeLinecap="round" />
      <path d={`M${x - 12} ${y}h24`} stroke="var(--accent-deep)" strokeWidth="5" strokeLinecap="round" />
    </>
  )
}

function FoldedShirt({ x, y, color }: { x: number; y: number; color: string }) {
  return <path d={`M${x} ${y}h26l8 8-7 8v16h-28V70l-7-8 8-8Z`} fill={color} stroke="var(--line-strong)" />
}

function SocksInShoes() {
  return (
    <>
      <path d="M236 92c-10 0-18 8-18 18h34c0-10-6-18-16-18Z" fill="var(--ink)" />
      <path d="M256 88c-10 0-18 8-18 18h34c0-10-6-18-16-18Z" fill="var(--muted)" />
      <rect x="224" y="60" width="12" height="22" rx="5" fill="var(--paper)" stroke="var(--line-strong)" />
      <rect x="250" y="56" width="12" height="26" rx="5" fill="var(--paper)" stroke="var(--line-strong)" />
    </>
  )
}

function DoorFrame() {
  return (
    <>
      <rect x="18" y="24" width="20" height="96" rx="6" fill="var(--paper)" opacity="0.82" />
      <rect x="18" y="20" width="72" height="10" rx="5" fill="var(--line-strong)" opacity="0.25" />
    </>
  )
}

function RainCloud({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <circle cx="-14" cy="4" r="12" fill="var(--paper)" />
      <circle cx="0" cy="0" r="15" fill="var(--paper)" />
      <circle cx="18" cy="5" r="11" fill="var(--paper)" />
      <rect x="-24" y="4" width="50" height="14" rx="7" fill="var(--paper)" />
      <path d="M-16 22v12M0 22v12M16 22v12" stroke="var(--sky)" strokeWidth="4" strokeLinecap="round" />
    </g>
  )
}

function Puddle() {
  return <ellipse cx="138" cy="114" rx="56" ry="14" fill="var(--sky-soft)" opacity="0.86" />
}

function MudBoots() {
  return (
    <>
      <path d="M104 100V72h18v18c8 0 16 8 16 18h-34c0-4 0-6 0-8Z" fill="var(--warning)" />
      <path d="M148 98V68h18v20c8 0 16 8 16 18h-34c0-4 0-6 0-8Z" fill="var(--warning)" opacity="0.88" />
      <circle cx="124" cy="114" r="3" fill="#7b5734" />
      <circle cx="166" cy="110" r="4" fill="#7b5734" />
    </>
  )
}

function TinyShovel() {
  return (
    <>
      <path d="M234 56 214 100" stroke="var(--line-strong)" strokeWidth="6" strokeLinecap="round" />
      <path d="M206 102c0-10 8-18 18-18 2 8 0 18-8 24-6-2-10-4-10-6Z" fill="var(--accent)" opacity="0.82" />
    </>
  )
}

function StageCurtains() {
  return (
    <>
      <path d="M30 18h48c-6 20-6 44 0 72H30c6-28 6-52 0-72Z" fill="var(--accent)" opacity="0.86" />
      <path d="M290 18h-48c6 20 6 44 0 72h48c-6-28-6-52 0-72Z" fill="var(--accent)" opacity="0.86" />
      <rect x="88" y="26" width="144" height="10" rx="5" fill="var(--warning)" opacity="0.55" />
      <rect x="58" y="102" width="204" height="16" rx="8" fill="#6d4e3a" opacity="0.42" />
    </>
  )
}

function Spotlight() {
  return <path d="M160 28 118 104h84Z" fill="var(--warning)" opacity="0.22" />
}

function Actor({ x, y }: { x: number; y: number }) {
  return (
    <>
      <circle cx={x} cy={y - 22} r="12" fill="var(--accent-soft)" />
      <rect x={x - 14} y={y - 8} width="28" height="28" rx="12" fill="var(--sky)" />
      <path d={`M${x - 8} ${y + 20}v16M${x + 8} ${y + 20}v16`} stroke="var(--ink)" strokeWidth="5" strokeLinecap="round" />
    </>
  )
}

function ScriptCard() {
  return (
    <>
      <rect x="206" y="72" width="54" height="34" rx="8" fill="var(--paper)" stroke="var(--line-strong)" transform="rotate(-10 233 89)" />
      <path d="M218 84h24M218 92h20" stroke="var(--accent-deep)" strokeWidth="3" strokeLinecap="round" transform="rotate(-10 233 89)" />
    </>
  )
}

function ShelterHouse() {
  return (
    <>
      <path d="M44 82 92 42l48 40v38H44Z" fill="var(--paper)" stroke="var(--line-strong)" />
      <path d="M64 98h20v22H64Z" fill="var(--accent-soft)" />
      <path d="M56 60h72" stroke="var(--accent)" strokeWidth="6" strokeLinecap="round" />
    </>
  )
}

function Dog({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="-16" y="-10" width="36" height="18" rx="9" fill="var(--warning)" opacity="0.88" />
      <circle cx="22" cy="-6" r="12" fill="var(--warning)" />
      <path d="M18-18l-8 6M28-18l8 6" stroke="#8a5f2b" strokeWidth="5" strokeLinecap="round" />
      <path d="M-8 8v14M6 8v14M20 8v14M34 8v14" stroke="#8a5f2b" strokeWidth="4" strokeLinecap="round" />
    </g>
  )
}

function DogBrush() {
  return (
    <>
      <rect x="206" y="74" width="44" height="16" rx="8" fill="var(--sky-soft)" />
      <path d="M210 90h30" stroke="var(--ink)" strokeWidth="4" strokeLinecap="round" strokeDasharray="1 6" />
    </>
  )
}

function TowelStack() {
  return (
    <>
      <rect x="208" y="96" width="46" height="10" rx="5" fill="var(--accent-soft)" />
      <rect x="214" y="86" width="38" height="10" rx="5" fill="var(--mint-soft)" />
    </>
  )
}

function ToyBall() {
  return <circle cx="272" cy="108" r="10" fill="var(--warning)" opacity="0.82" />
}

function BlockTower() {
  return (
    <>
      <rect x="140" y="92" width="40" height="18" rx="4" fill="var(--accent-soft)" />
      <rect x="146" y="72" width="28" height="18" rx="4" fill="var(--sky-soft)" />
      <rect x="150" y="52" width="20" height="18" rx="4" fill="var(--mint-soft)" />
    </>
  )
}

function Builder({ x, y, shirt, small }: { x: number; y: number; shirt: string; small?: boolean }) {
  const s = small ? 0.8 : 1
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cx="0" cy="-18" r="10" fill="var(--accent-soft)" />
      <rect x="-12" y="-6" width="24" height="22" rx="10" fill={shirt} />
      <rect x="10" y="-2" width="12" height="12" rx="3" fill="var(--warning)" opacity="0.7" />
    </g>
  )
}

function Mailbox() {
  return (
    <>
      <rect x="240" y="52" width="42" height="26" rx="8" fill="var(--sky-soft)" stroke="var(--line-strong)" />
      <path d="M261 78v30" stroke="var(--line-strong)" strokeWidth="6" strokeLinecap="round" />
    </>
  )
}

function Bike() {
  return (
    <>
      <circle cx="112" cy="104" r="20" fill="none" stroke="var(--ink)" strokeWidth="5" />
      <circle cx="170" cy="104" r="20" fill="none" stroke="var(--ink)" strokeWidth="5" />
      <path d="M112 104l28-26 22 26h-24l-14-24" fill="none" stroke="var(--accent)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M138 78h16M156 80l10-10" stroke="var(--ink)" strokeWidth="4" strokeLinecap="round" />
    </>
  )
}

function Runner() {
  return (
    <>
      <circle cx="204" cy="72" r="10" fill="var(--accent-soft)" />
      <path d="M204 82l-8 18 12 10M204 86l16 10 8 14M204 86l-16 10" fill="none" stroke="var(--mint-deep)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  )
}

function BurstStar() {
  return <path d="M202 28 208 40 222 42 212 52 214 66 202 60 190 66 192 52 182 42 196 40Z" fill="var(--warning)" opacity="0.85" />
}

function LunchTable() {
  return <rect x="50" y="102" width="220" height="16" rx="8" fill="#9a7a5d" opacity="0.52" />
}

function PersonFace({ x, y, fill, smile }: { x: number; y: number; fill: string; smile?: boolean }) {
  return (
    <>
      <circle cx={x} cy={y} r="20" fill={fill} />
      <circle cx={x - 6} cy={y - 3} r="2.5" fill="var(--ink)" />
      <circle cx={x + 6} cy={y - 3} r="2.5" fill="var(--ink)" />
      <path d={smile ? `M${x - 8} ${y + 8}c4 4 12 4 16 0` : `M${x - 8} ${y + 10}h16`} fill="none" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />
    </>
  )
}

function SharedSandwich() {
  return (
    <>
      <path d="M134 86h52c8 0 12 6 8 12l-6 10h-56l-6-10c-4-6 0-12 8-12Z" fill="var(--warning)" opacity="0.72" />
      <path d="M160 86v32" stroke="var(--paper)" strokeWidth="4" strokeDasharray="4 5" />
    </>
  )
}

function HeartSpark({ x, y }: { x: number; y: number }) {
  return <path d={`M${x} ${y}c0-7 5-12 12-12 4 0 8 2 10 6 2-4 6-6 10-6 7 0 12 5 12 12 0 10-10 16-22 22-12-6-22-12-22-22Z`} fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="3" />
}

function DoorLock() {
  return (
    <>
      <rect x="46" y="34" width="82" height="92" rx="12" fill="var(--paper)" stroke="var(--line-strong)" />
      <circle cx="104" cy="78" r="6" fill="var(--warning)" />
    </>
  )
}

function BigKey({ scale = 1, x = 204, y = 78 }: { scale?: number; x?: number; y?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <circle cx="-20" cy="0" r="16" fill="none" stroke="var(--warning)" strokeWidth="8" />
      <path d="M-4 0h36l8-10h10v10h8v10h-8v10h-10V10h-8l-6 6" fill="none" stroke="var(--warning)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  )
}

function QuestionBurst({ x = 108, y = 52 }: { x?: number; y?: number }) {
  return (
    <>
      <circle cx={x} cy={y} r="22" fill="var(--paper)" stroke="var(--accent)" strokeWidth="8" />
      <path d={`M${x} ${y - 10}c0-8 6-12 14-12 8 0 14 5 14 12 0 7-6 10-10 12-4 2-4 4-4 8`} fill="none" stroke="var(--accent-deep)" strokeWidth="5" strokeLinecap="round" />
      <circle cx={x} cy={y + 18} r="4" fill="var(--accent-deep)" />
    </>
  )
}

function StandingFigure({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <>
      <circle cx={x} cy={y - 28} r="12" fill={color} />
      <rect x={x - 12} y={y - 14} width="24" height="34" rx="12" fill={color} />
      <path d={`M${x - 8} ${y + 20}v20M${x + 8} ${y + 20}v20`} stroke="var(--ink)" strokeWidth="5" strokeLinecap="round" />
    </>
  )
}

function ShadowShape() {
  return <ellipse cx="188" cy="116" rx="48" ry="12" fill="var(--ink)" opacity="0.18" />
}

function BraceletString() {
  return <path d="M46 76c28-20 58-20 86 0 28 20 58 20 86 0 28-20 58-20 86 0" fill="none" stroke="var(--line-strong)" strokeWidth="4" strokeLinecap="round" />
}

function Bead({ x, y, fill, dashed }: { x: number; y: number; fill: string; dashed?: boolean }) {
  return <circle cx={x} cy={y} r="16" fill={fill} opacity={dashed ? 0.35 : 0.88} stroke={fill} strokeWidth="6" strokeDasharray={dashed ? '6 6' : undefined} />
}

function TileGrid() {
  return <rect x="44" y="42" width="256" height="72" rx="16" fill="var(--paper)" opacity="0.55" />
}

function TriangleTile({ x, y, fill, dashed }: { x: number; y: number; fill: string; dashed?: boolean }) {
  return <path d={`M${x} ${y - 18}l18 32h-36Z`} fill={fill} opacity={dashed ? 0.35 : 0.9} stroke="var(--accent)" strokeWidth="4" strokeDasharray={dashed ? '5 5' : undefined} />
}

function SquareTile({ x, y, fill }: { x: number; y: number; fill: string }) {
  return <rect x={x - 18} y={y - 18} width="36" height="36" rx="8" fill={fill} stroke="var(--sky)" strokeWidth="4" />
}

function Bench() {
  return (
    <>
      <rect x="68" y="90" width="184" height="14" rx="7" fill="#9c7a5d" opacity="0.62" />
      <path d="M84 104v18M236 104v18" stroke="#7a5f47" strokeWidth="6" strokeLinecap="round" />
    </>
  )
}

function PersonBadge({ x, y, label, fill }: { x: number; y: number; label: string; fill: string }) {
  return (
    <>
      <circle cx={x} cy={y} r="18" fill={fill} stroke="var(--line-strong)" />
      <text x={x} y={y + 6} textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--ink)">
        {label}
      </text>
    </>
  )
}

function Cup({ x, label, fill }: { x: number; label: string; fill: string }) {
  return (
    <>
      <path d={`M${x - 24} 56h48l-10 52h-28Z`} fill={fill} stroke="var(--line-strong)" />
      <text x={x} y="86" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--ink)">
        {label}
      </text>
    </>
  )
}

function Coin({ x, y }: { x: number; y: number }) {
  return <circle cx={x} cy={y} r="8" fill="var(--warning)" stroke="white" strokeWidth="3" />
}

function NumberTrack() {
  return <path d="M52 118h224" stroke="var(--line-strong)" strokeWidth="6" strokeLinecap="round" />
}

function Robot() {
  return (
    <>
      <rect x="56" y="54" width="30" height="30" rx="8" fill="var(--paper)" stroke="var(--line-strong)" />
      <circle cx="66" cy="68" r="3" fill="var(--accent)" />
      <circle cx="76" cy="68" r="3" fill="var(--accent)" />
      <path d="M71 54v-8M90 84l18-14" stroke="var(--line-strong)" strokeWidth="4" strokeLinecap="round" />
    </>
  )
}

function NumberBadge({ x, y, label, active, goal }: { x: number; y: number; label: string; active?: boolean; goal?: boolean }) {
  const fill = goal ? 'var(--mint)' : active ? 'var(--accent-soft)' : 'var(--paper)'
  return (
    <>
      <circle cx={x} cy={y} r="18" fill={fill} stroke="var(--line-strong)" />
      <text x={x} y={y + 6} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)">
        {label}
      </text>
    </>
  )
}

function WorkTable() {
  return <rect x="42" y="98" width="236" height="18" rx="9" fill="#a17b5f" opacity="0.48" />
}

function PaperSheet() {
  return <rect x="74" y="48" width="72" height="44" rx="8" fill="var(--paper)" stroke="var(--line-strong)" />
}

function ScissorsIcon({ x, y }: { x: number; y: number }) {
  return (
    <>
      <circle cx={x - 8} cy={y + 10} r="9" fill="none" stroke="var(--accent)" strokeWidth="5" />
      <circle cx={x + 8} cy={y + 10} r="9" fill="none" stroke="var(--accent)" strokeWidth="5" />
      <path d={`M${x - 2} ${y + 4}l28-20M${x + 2} ${y + 4}l28 20`} stroke="var(--line-strong)" strokeWidth="5" strokeLinecap="round" />
    </>
  )
}

function GlueStick({ x, y }: { x: number; y: number }) {
  return (
    <>
      <rect x={x - 14} y={y - 18} width="28" height="40" rx="8" fill="var(--sky-soft)" stroke="var(--line-strong)" />
      <rect x={x - 10} y={y - 28} width="20" height="12" rx="5" fill="var(--sky)" />
    </>
  )
}

function CutLine() {
  return <path d="M120 56c10 6 18 10 28 12 12 2 18 0 28-4" fill="none" stroke="var(--accent)" strokeWidth="4" strokeDasharray="5 6" strokeLinecap="round" />
}

function Sun({ x, y, r }: { x: number; y: number; r: number }) {
  return (
    <>
      <circle cx={x} cy={y} r={r} fill="var(--warning)" />
      <path d={`M${x} ${y - r - 8}v10M${x} ${y + r - 2}v10M${x - r - 8} ${y}h10M${x + r - 2} ${y}h10M${x - r} ${y - r}l8 8M${x + r - 8} ${y + r - 8}l8 8M${x - r} ${y + r}l8-8M${x + r - 8} ${y - r + 8}l8-8`} stroke="var(--warning)" strokeWidth="4" strokeLinecap="round" />
    </>
  )
}

function ThoughtBubble() {
  return (
    <>
      <circle cx="102" cy="70" r="18" fill="var(--paper)" stroke="var(--sky)" strokeWidth="6" />
      <circle cx="130" cy="58" r="12" fill="var(--paper)" stroke="var(--sky)" strokeWidth="6" />
      <circle cx="154" cy="72" r="16" fill="var(--paper)" stroke="var(--sky)" strokeWidth="6" />
      <circle cx="82" cy="96" r="6" fill="var(--paper)" stroke="var(--sky)" strokeWidth="4" />
    </>
  )
}

function ChecklistPanel() {
  return (
    <>
      <rect x="56" y="30" width="208" height="90" rx="18" fill="var(--paper)" stroke="var(--line-strong)" />
      <circle cx="92" cy="58" r="8" fill="var(--mint)" />
      <circle cx="92" cy="82" r="8" fill="var(--mint)" />
      <circle cx="92" cy="106" r="8" fill="var(--mint)" />
      <path d="M108 58h104M108 82h84M108 106h112" stroke="var(--accent-deep)" strokeWidth="5" strokeLinecap="round" />
    </>
  )
}
