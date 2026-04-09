import { useState } from 'react'
import './Login.css'

function Login({ onLogin }) {
  const getImagePath = (path) => {
    if (!path) return path
    const base = import.meta.env.BASE_URL
    return path.startsWith('http') ? path : `${base}${path}`
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <img src={getImagePath("logo_tec.png")} alt="Tecnológico de Monterrey" className="login-logo" />
          <h1>Tec Learners Wallet</h1>
          <p className="login-subtitle">Gestiona y comparte tus credenciales académicas</p>
        </div>

        <div className="login-card">
          <h2>Iniciar Sesión</h2>

          <button className="linkedin-sso-button" onClick={onLogin}>
            <svg className="linkedin-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
            Iniciar sesión con SSO
          </button>
        </div>

        <div className="login-footer">
          <p>© 2024 Tecnológico de Monterrey</p>
        </div>
      </div>
    </div>
  )
}

export default Login
