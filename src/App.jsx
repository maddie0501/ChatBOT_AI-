
import './App.css'
import ChatBot from './components/ChatBot'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PastConvo from './components/Pastconvo';

function App() {
 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatBot />} />
        <Route path ="/history" element= {<PastConvo />} />
      </Routes>
      </Router>
  )
}

export default App
