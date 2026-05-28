import {Routes, Route} from 'react-router-dom'
import Header from './components/Header'
import Home from './routes/Home'
import Drama from './routes/Drama'
import Comedy from './routes/Comedy'
import RecommendDetail from './components/RecommendDetail'
import Footer from './components/Footer'
import QuickBtn from './components/QuickBtn'
import './App.css'


function App() {

  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/drama" element={<Drama />} />
        <Route path="/comedy" element={<Comedy />} />
        <Route path="/recommendDetail/:id" element={<RecommendDetail />} />
      </Routes>
      <Footer />
      <QuickBtn/>
    </>
  )
}

export default App
