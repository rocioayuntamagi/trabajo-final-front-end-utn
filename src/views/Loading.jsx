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
    <main
      style={{
        height: '100vh',
        boxSizing: 'border-box',
        padding: 18,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg, #fff)'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, maxWidth: 640 }}>
        <div style={{ width: 72, height: 72, borderRadius: 36, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', boxShadow: '0 6px 18px rgba(0,0,0,0.06)', border: '2px solid rgba(0,0,0,0.04)' }}>
          <img src={logo} alt="logo" style={{ width: 64, height: 64, objectFit: 'cover', display: 'block' }} />
        </div>

        <h2 style={{ margin: 0, fontSize: 20, lineHeight: '1.1', textAlign: 'center' }}>Cargando tus mensajes</h2>

        <div style={{ marginTop: 6, display: 'flex', gap: 8, alignItems: 'center', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: 6, background: '#02c4dd' }} />
            <span style={{ fontSize: 13, color: '#666' }}>Cargando... {Math.max(0, secondsLeft)}s</span>
          </div>

          {/* progress bar */}
          <div style={{ width: 220, maxWidth: '78vw', height: 8, borderRadius: 999, background: '#eee', overflow: 'hidden', marginTop: 8 }}>
            <div
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
              style={{ width: `${progress}%`, height: '100%', background: '#02c4dd', transition: 'width 400ms linear' }}
            />
          </div>
        </div>

        {/* encryption paragraph moved here with footer-like styles and lock icon */}
        <p style={{ margin: '8px 0 0', fontSize: 12, color: '#666', textAlign: 'center', maxWidth: 520, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden focusable="false" style={{ display: 'inline-block', verticalAlign: 'middle', flex: '0 0 auto', color: '#666' }}>
            <path fill="currentColor" d="M17 8h-1V6a4 4 0 10-8 0v2H7a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1V9a1 1 0 00-1-1zM9 8V6a3 3 0 116 0v2H9z" />
          </svg>
          <span style={{ color: 'inherit' }}>Cifrado de extremo a extremo. Estamos descargando tu historial de mensajes.</span>
        </p>
      </div>

      <p
        style={{
          position: 'absolute',
          bottom: 12,
          left: 0,
          right: 0,
          textAlign: 'center',
          color: '#666',
          fontSize: 12,
          margin: 0,
          paddingLeft: 12,
          paddingRight: 12,
          opacity: 0.95
        }}
      >
        No cierres ésta ventana — se están descargando tus mensajes.
      </p>
    </main>
  )
}

export default Loading
