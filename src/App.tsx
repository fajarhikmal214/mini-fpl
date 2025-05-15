import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Player } from 'types/Player'
import ShuffleTeams from 'pages/ShuffleTeams'
import PerformanceRecap from 'pages/PerformanceRecap'
import PlayerOfTheWeek from 'pages/PlayerOfTheWeek'
import Fixture from 'pages/Fixture'

const App = () => {
  const [shuffledTeams, setShuffledTeams] = useState<{
    teamA: Record<string, Player[]>
    teamB: Record<string, Player[]>
    teamC: Record<string, Player[]>
  } | null>(null)

  const handleShuffle = (
    teams: {
      teamA: Record<string, Player[]>
      teamB: Record<string, Player[]>
      teamC: Record<string, Player[]>
    } | null
  ) => {
    setShuffledTeams(teams)
  }

  return (
    <Router>
      <div className="mx-auto max-w-5xl p-6">
        <nav className="mb-6 flex space-x-8 text-lg font-semibold">
          <Link to="/" className="text-blue-500 hover:underline">
            Shuffle Teams
          </Link>
          <Link to="/recap" className="text-blue-500 hover:underline">
            Performance Recap
          </Link>
          <Link
            to="/player-of-the-week"
            className="text-blue-500 hover:underline"
          >
            Player of the Week
          </Link>
          <Link to="/fixture" className="text-blue-500 hover:underline">
            Fixture
          </Link>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <ShuffleTeams
                onShuffle={handleShuffle}
                shuffledTeams={shuffledTeams}
              />
            }
          />
          <Route
            path="/recap"
            element={
              <PerformanceRecap
                shuffledTeams={shuffledTeams}
                onShuffle={handleShuffle}
              />
            }
          />
          <Route
            path="/player-of-the-week"
            element={<PlayerOfTheWeek shuffledTeams={shuffledTeams} />}
          />
          <Route
            path="/fixture"
            element={<Fixture shuffledTeams={shuffledTeams} />}
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
