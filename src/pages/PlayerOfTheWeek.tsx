import { calculatePlayerPoints } from '../utils/calculatePoints'
import { performanceData } from '../data/performance'
import { Player } from '../types/Player'

const PlayerOfTheWeek = ({
  shuffledTeams
}: {
  shuffledTeams: {
    teamA: Record<string, Player[]>
    teamB: Record<string, Player[]>
    teamC: Record<string, Player[]>
  } | null
}) => {
  if (!shuffledTeams) {
    return <div className="mt-6 text-center">No teams shuffled yet.</div>
  }

  const allPlayers = [
    ...shuffledTeams.teamA.GK,
    ...shuffledTeams.teamA.DEF,
    ...shuffledTeams.teamA.MID,
    ...shuffledTeams.teamA.FWD,
    ...shuffledTeams.teamB.GK,
    ...shuffledTeams.teamB.DEF,
    ...shuffledTeams.teamB.MID,
    ...shuffledTeams.teamB.FWD,
    ...shuffledTeams.teamC.GK,
    ...shuffledTeams.teamC.DEF,
    ...shuffledTeams.teamC.MID,
    ...shuffledTeams.teamC.FWD
  ]

  const playerWithHighestPoints = allPlayers.reduce(
    (highest, player) => {
      const playerPoints = calculatePlayerPoints(player)

      if (playerPoints > highest.points) {
        return { player, points: playerPoints }
      }

      return highest
    },
    { player: allPlayers[0], points: 0 }
  )

  return (
    <div className="mx-auto max-w-5xl p-6">
      <h1 className="mb-4 text-2xl font-bold">Player of the Week</h1>
      <div className="rounded border p-4">
        <h2 className="text-lg font-semibold">
          {playerWithHighestPoints.player.name}
        </h2>
        <p>Position: {playerWithHighestPoints.player.position}</p>
        <p>
          Goals:{' '}
          {performanceData[playerWithHighestPoints.player.id]?.goals || 0}
        </p>
        <p>
          Assists:{' '}
          {performanceData[playerWithHighestPoints.player.id]?.assists || 0}
        </p>
        <p>
          Clean Sheet:{' '}
          {performanceData[playerWithHighestPoints.player.id]?.cleanSheet
            ? 'Yes'
            : 'No'}
        </p>
        <p>Weekly Points: {playerWithHighestPoints.points}</p>
      </div>
    </div>
  )
}

export default PlayerOfTheWeek
