import React from 'react'
import ReactDOM from 'react-dom/client'
// import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AlertProvider } from './components/alert/AlertContext.jsx'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AlertProvider>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </AlertProvider>
  </React.StrictMode>,
)
