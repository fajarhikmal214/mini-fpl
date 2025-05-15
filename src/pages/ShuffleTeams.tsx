import { players as playerData } from '../data/players'
import { Player } from '../types/Player'

// Enforce Player Data Type
const typedPlayerData: Player[] = playerData.map((player) => ({
  ...player,
  position: player.position as 'GK' | 'DEF' | 'MID' | 'FWD'
}))

// Shuffle Players by Position
const shuffleTeams = (players: Player[]) => {
  const shuffled = [...players].sort(() => Math.random() - 0.5)
  const teamA: Record<string, Player[]> = { GK: [], DEF: [], MID: [], FWD: [] }
  const teamB: Record<string, Player[]> = { GK: [], DEF: [], MID: [], FWD: [] }
  const teamC: Record<string, Player[]> = { GK: [], DEF: [], MID: [], FWD: [] }

  shuffled.forEach((player) => {
    if (player.position === 'GK') {
      if (teamA.GK.length < 1) teamA.GK.push(player)
      else if (teamB.GK.length < 1) teamB.GK.push(player)
      else teamC.GK.push(player)
    } else if (player.position === 'DEF') {
      if (teamA.DEF.length < 3) teamA.DEF.push(player)
      else if (teamB.DEF.length < 3) teamB.DEF.push(player)
      else teamC.DEF.push(player)
    } else if (player.position === 'MID') {
      if (teamA.MID.length < 2) teamA.MID.push(player)
      else if (teamB.MID.length < 2) teamB.MID.push(player)
      else teamC.MID.push(player)
    } else if (player.position === 'FWD') {
      if (teamA.FWD.length < 3) teamA.FWD.push(player)
      else if (teamB.FWD.length < 3) teamB.FWD.push(player)
      else teamC.FWD.push(player)
    }
  })

  return { teamA, teamB, teamC }
}

const ShuffleTeams = ({
  onShuffle,
  shuffledTeams
}: {
  onShuffle: (
    teams: {
      teamA: Record<string, Player[]>
      teamB: Record<string, Player[]>
      teamC: Record<string, Player[]>
    } | null
  ) => void
  shuffledTeams: {
    teamA: Record<string, Player[]>
    teamB: Record<string, Player[]>
    teamC: Record<string, Player[]>
  } | null
}) => {
  const handleShuffle = () => {
    if (shuffledTeams) {
      if (
        !window.confirm('Teams are already shuffled. Do you want to reshuffle?')
      )
        return
    }
    const newTeams = shuffleTeams(typedPlayerData)
    onShuffle(newTeams)
  }

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset the shuffled teams?')) {
      onShuffle(null)
    }
  }

  return (
    <div className="mx-auto max-w-5xl p-4">
      <h1 className="mb-4 text-2xl font-bold">Shuffle Teams</h1>
      <button
        className="mb-4 rounded bg-blue-500 px-4 py-2 text-white"
        onClick={handleShuffle}
      >
        Shuffle Teams
      </button>
      <button
        className="mb-4 ml-4 rounded bg-red-500 px-4 py-2 text-white"
        onClick={handleReset}
      >
        Reset Teams
      </button>

      {shuffledTeams ? (
        <div className="mt-6 grid grid-cols-3 gap-4">
          {Object.entries(shuffledTeams).map(([teamName, team], index) => (
            <div key={index} className="rounded border p-4">
              <h2 className="text-lg font-semibold">
                {teamName.replace('team', 'TEAM ')}
              </h2>
              {Object.entries(team).map(([position, players]) => (
                <div key={position} className="mb-4">
                  <h4 className="font-semibold">{position}</h4>
                  <ul>
                    {players.map((player) => (
                      <li key={player.id}>{player.name}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-gray-600">
          No teams shuffled yet. Please shuffle teams first.
        </p>
      )}
    </div>
  )
}

export default ShuffleTeams
