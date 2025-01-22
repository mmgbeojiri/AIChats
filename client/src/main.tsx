import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './index.tsx'
import Navbar from './Navbar.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>

      <BrowserRouter>
      <Navbar />
        <Routes>
          
          <Route path="/" element={ <Home />} />
        </Routes>
      </BrowserRouter>
  </StrictMode>,
)
