import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';                   
import './index.css';    

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
