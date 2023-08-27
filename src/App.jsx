import Start from './pages/Start'
import Game from './pages/Game'
import Restart from './pages/Restart'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Start />} />
          <Route exact path="/game" element={<Game />} />
          <Route exact path="/restart" element={<Restart />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
