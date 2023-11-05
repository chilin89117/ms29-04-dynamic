import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
// import App from './App1.tsx'  // Use App1.tsx for Section 4
import App from './App2.tsx'  // Use App2.tsx for Sections 5-6
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
