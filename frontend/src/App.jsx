import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './components/Home'
import Questions from './components/Questions'
function App() {
  const [questions, setQuestions] = useState([]);

  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home  setQuestions={setQuestions}/>}></Route>
        <Route path='/questions' element = {<Questions questions={questions}></Questions>}/>
      </Routes>
    </BrowserRouter>

  )
}

export default App
