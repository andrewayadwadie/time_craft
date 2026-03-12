import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'
import { CartProvider } from './context/CartContext'
import { FavoritesProvider } from './context/FavoritesContext'
import ErrorBoundary from './components/ui/ErrorBoundary'
import './styles/index.css'
import './styles/animations.css'
import './styles/rtl.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <CartProvider>
          <FavoritesProvider>
            <ErrorBoundary>
              <App />
            </ErrorBoundary>
          </FavoritesProvider>
        </CartProvider>
      </LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
