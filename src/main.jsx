import React from 'react'
import ReactDOM from 'react-dom/client'
// import './index.css'
import { ProductApp } from './components/ProductApp.jsx'
import { AlertProvider } from './components/alert/AlertContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AlertProvider>
      <ProductApp title={'Lista de Productos!'} />
    </AlertProvider>
  </React.StrictMode>,
)
