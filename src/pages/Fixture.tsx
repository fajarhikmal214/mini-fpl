import React from 'react'
import { Player } from '../types/Player'
import { matchScores } from '../data/fixtures'

interface FixtureProps {
  shuffledTeams: {
    teamA: Record<string, Player[]>
    teamB: Record<string, Player[]>
    teamC: Record<string, Player[]>
  } | null
}

const Fixture: React.FC<FixtureProps> = ({ shuffledTeams }) => {
  if (!shuffledTeams) {
    return <div className="mt-6 text-center">No teams shuffled yet.</div>
  }

  return (
    <div className="mx-auto max-w-5xl p-6">
      <h1 className="mb-4 text-2xl font-bold">Fixture</h1>

      <div className="grid grid-cols-2 gap-6">
        {matchScores.map((match, index) => (
          <div key={index} className="rounded border p-4">
            <h2 className="text-lg font-semibold">{match.match}</h2>
            <p>
              Score: {match.scoreA} - {match.scoreB}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Fixture
