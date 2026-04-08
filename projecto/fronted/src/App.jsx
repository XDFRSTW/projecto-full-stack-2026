import { useState, useEffect } from 'react'
import { Route, BrowserRouter as Router, Routes } from "react-router"
// Este es el archivo css que usaremos para darleestilos a la página (tailwind es usado en pocas ocasiones)
import './index.css'
// Página de inicio
import Home from './components/home';
// Página de iniciar sesión o registrarse
import RegLog from './components/RegLog';

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<RegLog />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
