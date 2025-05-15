import { performanceData } from '../data/performance'
import { Player } from '../types/Player'

const GOAL_POINTS_GK_DEF = 6
const GOAL_POINTS_MID = 5
const GOAL_POINTS_FWD = 4

const ASSIST_POINTS = 3

const CLEAN_SHEET_POINTS_GK_DEF = 4
const CLEAN_SHEET_POINTS_MID = 1

export const calculatePlayerPoints = (player: Player) => {
  const playerPerformance = performanceData[player.id]

  const goalsPoints = (() => {
    switch (player.position) {
      case 'GK':
      case 'DEF':
        return (playerPerformance?.goals || 0) * GOAL_POINTS_GK_DEF
      case 'MID':
        return (playerPerformance?.goals || 0) * GOAL_POINTS_MID
      case 'FWD':
        return (playerPerformance?.goals || 0) * GOAL_POINTS_FWD
      default:
        return 0
    }
  })()

  const points =
    goalsPoints +
    (playerPerformance?.assists || 0) * ASSIST_POINTS +
    (playerPerformance?.cleanSheet
      ? player.position === 'GK' || player.position === 'DEF'
        ? CLEAN_SHEET_POINTS_GK_DEF
        : player.position === 'MID'
          ? CLEAN_SHEET_POINTS_MID
          : 0
      : 0)

  return points
}
