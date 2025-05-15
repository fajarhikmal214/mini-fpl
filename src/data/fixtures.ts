export interface Match {
  match: string
  scoreA: number
  scoreB: number
}

export const matchScores: Match[] = [
  { match: 'Team A vs Team B', scoreA: 2, scoreB: 1 },
  { match: 'Team B vs Team C', scoreA: 3, scoreB: 3 },
  { match: 'Team A vs Team C', scoreA: 1, scoreB: 0 }
]
