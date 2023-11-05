import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
// import App from './App1.tsx'  // Use App1.tsx for Section 4
// import App from './App2.tsx'  // Use App2.tsx for Sections 5-6 (timer)
import App from './App3.tsx'  // use App3.tsx for Section 6 (fetch)

// import './index.css'  // use index.css for App1.tsx and App2.tsx
import './index3.css'  // use index3.css for App3.tsx

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
