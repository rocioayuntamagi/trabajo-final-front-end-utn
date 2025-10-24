import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from "../assets/images/logo.png"

const Loading = () => {
  const navigate = useNavigate()
  const TOTAL = 20
  const [secondsLeft, setSecondsLeft] = useState(TOTAL)

  useEffect(() => {
    // countdown
    const interval = setInterval(() => {
      setSecondsLeft(s => s - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (secondsLeft <= 0) {
      navigate('/chat')
    }
  }, [secondsLeft, navigate])

  // progress percent (0 - 100)
  const progress = Math.round(((TOTAL - Math.max(0, secondsLeft)) / TOTAL) * 100)

  return (
    <main className="loading-main">
      <div className="loading-container">
        <div className="loading-logo">
          <img src={logo} alt="logo" className="loading-logo-img" />
        </div>

        <h2 className="loading-title">Cargando tus mensajes</h2>

        <div className="loading-status">
          <div className="loading-status-row">
            <div className="loading-dot" />
            <span className="loading-status-text">Cargando... {Math.max(0, secondsLeft)}s</span>
          </div>

          <div className="loading-progress" aria-hidden>
            <div
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
              className="loading-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <p className="loading-encryption">
          <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden focusable="false" className="loading-lock-icon">
            <path fill="currentColor" d="M17 8h-1V6a4 4 0 10-8 0v2H7a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1V9a1 1 0 00-1-1zM9 8V6a3 3 0 116 0v2H9z" />
          </svg>
          <span>Cifrado de extremo a extremo. Estamos descargando tu historial de mensajes.</span>
        </p>
      </div>

      <p className="loading-footer">No cierres ésta ventana — se están descargando tus mensajes.</p>
    </main>
  )
}

export default Loading
