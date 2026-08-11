import { useState, useEffect } from 'react'

const API_KEY = "f496bd4307876dcb4a6b75a00894e656"
const headers = { 'x-api-key': API_KEY }

export default function App() {
  const [matches, setMatches] = useState([])
  const [tiratori, setTiratori] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const res1 = await fetch('https://v3.football.api-sports.io/fixtures?league=135&season=2026&status=NS', {headers})
        const data1 = await res1.json()
        setMatches(data1.response.slice(0,10))

        const res2 = await fetch('https://v3.football.api-sports.io/players?league=135&season=2026', {headers})
        const data2 = await res2.json()
        const sorted = data2.response.sort((a,b) => b.statistics[0].shots.on - a.statistics[0].shots.on)
        setTiratori(sorted.slice(0,5))
      } catch(e) {
        console.log(e)
      }
      setLoading(false)
    }
    loadData()
  }, [])

  return (
    <div style={{color:'white', padding:20, fontFamily:'Arial', background:'#0a0a0a', minHeight:'100vh'}}>
      <h1>⚽ XI-Prob 2026/27</h1>

      {loading? <p>Caricamento dati...</p> : (
        <>
          <h2>Prossime Partite</h2>
          {matches.map(m => (
            <div key={m.fixture.id} style={{background:'#1a1a1a', padding:10, margin:5, borderRadius:8}}>
              <b>{m.teams.home.name}</b> vs <b>{m.teams.away.name}</b>
              <br/>
              <small>{new Date(m.fixture.date).toLocaleDateString('it-IT')}</small>
            </div>
          ))}

          <h2>📊 Top 5 Tiratori</h2>
          {tiratori.map(p => (
            <p key={p.player.id}>{p.player.name} - {p.statistics[0].shots.on} tiri nello specchio</p>
          ))}
        </>
      )}
    </div>
  )Apaggiunta API
}
