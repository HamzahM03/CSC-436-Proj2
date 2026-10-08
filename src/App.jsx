import { useState } from 'react'

import './App.css'

import Header from "./components/Header.jsx"
import Hero from "./components/Hero.jsx"
import GameStats from "./components/GameStats.jsx"


function App() {
  

  return (
    <>
     <Header />
     
     <main class="container">
      <Hero />
      <GameStats/>
     </main>
     
    </>
  )
}

export default App
