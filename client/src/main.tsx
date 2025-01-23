import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Index from './index.tsx'
import Navbar from './Navbar.tsx'

const chatBotName:string= "Glem"

createRoot(document.getElementById('root')!).render(
  <StrictMode>

      <BrowserRouter>
      
        <Routes>
          
          <Route path="/" element={
            <Index />
            } />
        </Routes>
      </BrowserRouter>
  </StrictMode>,
)
