export interface Player {
  id: number
  name: string
  position: 'GK' | 'DEF' | 'MID' | 'FWD'
  price: number
  totalPoints: number
  weeklyPoints: number
}
