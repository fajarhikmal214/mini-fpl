import { calculatePlayerPoints } from '../utils/calculatePoints'
import { Player } from '../types/Player'

const PerformanceRecap = ({
  shuffledTeams,
  onShuffle
}: {
  shuffledTeams: {
    teamA: Record<string, Player[]>
    teamB: Record<string, Player[]>
    teamC: Record<string, Player[]>
  } | null
  onShuffle: (teams: null) => void
}) => {
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset the shuffled teams?')) {
      onShuffle(null)
    }
  }

  return (
    <div className="mx-auto max-w-5xl p-6">
      <h1 className="mb-4 text-2xl font-bold">Performance Recap</h1>
      <button
        className="mb-4 rounded bg-red-500 px-4 py-2 text-white"
        onClick={handleReset}
      >
        Reset Teams
      </button>

      {shuffledTeams ? (
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(shuffledTeams).map(([teamName, team]) => (
            <div key={teamName} className="rounded border p-4">
              <h2 className="text-lg font-semibold">
                {teamName.replace('team', 'TEAM ')}
              </h2>
              {Object.entries(team).map(([position, players]) => (
                <div key={position} className="mb-4">
                  <h4 className="font-semibold">{position}</h4>
                  <ul>
                    {players.map((player) => (
                      <li key={player.id}>
                        {player.name} - {calculatePlayerPoints(player)} pts
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p>No teams shuffled yet. Please shuffle teams first.</p>
      )}
    </div>
  )
}

export default PerformanceRecap
