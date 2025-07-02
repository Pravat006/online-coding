import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'


const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;


if (!publishableKey) {
  throw new Error('VITE_CLERK_PUBLISHABLE_KEY is not defined. Please set it in your .env file.');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <App />

  </StrictMode >,
)
