import catalog from '../../public/rankings.json'

export type PriceField = {
  status: string
  amountMajor?: string
  currency?: string
  unit?: string
}

export type RankingRow = {
  rank: number
  channelId: string
  officialName: string
  stationId: string
  stationName: string
  modelId: string
  publishedAt: string
  measuredAt: string
  availability: { status: string; value: number }
  sampleSize: number
  inputPrice: PriceField
  outputPrice: PriceField
  operations: { statusWindows: string[] }
  stationDetails: {
    evaluationMode: string
    websiteUrl?: string
    baseUrl?: string
  }
  latency: { p50Ms: number; p95Ms: number }
  multiplier: number
  authenticity: {
    status: 'passed' | 'failed' | 'unknown'
    checks: { name: string; status: string }[]
  }
}

export type Catalog = typeof catalog & { rows: RankingRow[] }

export function loadCatalog(): Catalog {
  return catalog as Catalog
}

export function formatBps(value: number): string {
  return (value / 100).toFixed(2) + '%'
}

export function formatPrice(price: PriceField | undefined): string | null {
  if (!price || price.status !== 'published') return null
  return `${price.amountMajor} ${price.currency}`
}

export function minutesAgo(iso: string, now: Date): number {
  const then = new Date(iso).getTime()
  return Math.max(0, Math.round((now.getTime() - then) / 60_000))
}

export function issueDate(iso: string): string {
  return iso.slice(0, 10)
}
