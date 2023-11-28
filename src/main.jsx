import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider, AuthContext } from './contexts/authContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <AuthProvider value={AuthContext}>  
    <App />
  </AuthProvider>  
  </React.StrictMode>,
)
