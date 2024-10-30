import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './routes/App';
import './styles/global.css'

// Importar estilos
import './styles/global.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
