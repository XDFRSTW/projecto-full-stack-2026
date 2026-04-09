import { useState, useEffect } from 'react'
import { Route, BrowserRouter as Router, Routes } from "react-router"
// Este es el archivo css que usaremos para darleestilos a la página (tailwind es usado en pocas ocasiones)
import './index.css'
// Página de inicio
import Home from './components/Homes';
// Página de iniciar sesión o registrarse
import RegLog from './components/RegLog';
import Perfil from './components/Perfil';

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<RegLog />} />
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
