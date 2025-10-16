import { useState, useEffect, useRef } from "react"
import { useChat } from "../context/ChatContext"
import { useNavigate, Link } from "react-router-dom"

export default function Chat() {
  const [msg, setMsg] = useState("")
  const [showPopup, setShowPopup] = useState(false);

  // Obtenemos del contexto todo lo necesario
  const { users, selectedUser, setUsers } = useChat()
  // Buscamos el usuario activo
  const user = users.find(u => u.id === selectedUser)
  const navigate = useNavigate()
  const [showOptions, setShowOptions] = useState(false)
  const optionsRef = useRef(null)

  // Cargamos el tema guardado (si existe), si no usamos 'light' por defecto
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [username, setUsername] = useState(localStorage.getItem("username") || "Invitado");
  const [language, setLanguage] = useState(localStorage.getItem("language") || "es");

  useEffect(() => {
    // Aplicar el tema actual al montar / cuando cambie
    applyTheme(theme)
  }, [theme]);

  // cerrar popup de opciones si se hace click fuera
  useEffect(() => {
    const onDocClick = (e) => {
      if (showOptions && optionsRef.current && !optionsRef.current.contains(e.target)) {
        setShowOptions(false)
      }
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [showOptions])

  // Log para diagnostico cuando cambia selectedUser o users
  useEffect(() => {
    console.debug('Chat: selectedUser=', selectedUser, 'users.length=', (users || []).length)
  }, [selectedUser, users])

  const applyTheme = (themeName) => {
    if (themeName === "dark") {
      document.body.classList.add("dark-mode")
    } else {
      document.body.classList.remove("dark-mode")
    }
  }

  // Traducciones para los textos contenidos únicamente dentro del popup
  const texts = {
    es: {
      title: "Configuración",
      usernameLabel: "Nombre de usuario:",
      usernamePlaceholder: "Nombre de usuario",
      languageLabel: "Idioma:",
      energyLabel: "Ahorro de energia:",
      optionLight: "Apagado",
      optionDark: "Encendido",
      save: "Guardar cambios",
      close: "Cerrar"
    },
    en: {
      title: "Settings",
      usernameLabel: "Username:",
      usernamePlaceholder: "Username",
      languageLabel: "Language:",
      energyLabel: "Energy saver:",
      optionLight: "Off",
      optionDark: "On",
      save: "Save changes",
      close: "Close"
    }
  }

  if (!user) {
    console.warn('Chat: no user found for selectedUser=', selectedUser)
    return (
      <div className="user-not-found">
        <p>Selecciona un usuario</p>
      </div>
    )
  }

  // Manejo del input
  const handleChange = (event) => {
    setMsg(event.target.value)
  }

  // Cuando enviamos el formulario
  const handleSubmit = (event) => {
    event.preventDefault()
    try {
      const id = (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : Date.now().toString()
      const newMessage = {
        id,
        text: msg,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      }

      // ✅ Actualizamos el estado de manera INMUTABLE
      const updatedUsers = (users || []).map(u =>
        u.id === user.id
          ? { ...u, messages: [...(u.messages || []), newMessage] }
          : u
      )

      setUsers(updatedUsers)
      setMsg("")
    } catch (err) {
      console.error('Error en handleSubmit:', err)
    }
  }

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    setShowOptions(false)
    navigate("/")
  }


  // Abrir y cerrar Popup
  const handleShowPopup = () => {
    setShowPopup(true);
  }

  const handleClosePopup = () => {
    setShowPopup(false);
  }

  // Guardar cambios del tema en localStorage
  const handleSaveChanges = () => {
    applyTheme(theme)
    localStorage.setItem("theme", theme)
    localStorage.setItem("username", username)
    localStorage.setItem("language", language)
    setShowPopup(false)
  }

  const handleThemeChange = (e) => {
    const selectedTheme = e.target.value
    setTheme(selectedTheme)
    applyTheme(selectedTheme)
  }

  const toggleOptions = () => setShowOptions(s => !s)

  const handleStarred = () => {

    console.log('Mensajes destacados toggled')
    setShowOptions(false)
  }

  const handleSelectChat = () => {
    console.log('Seleccionar chat toggled')
    setShowOptions(false)
  }


  try {
    return (
      <div className="chat">
        {
          showPopup === true &&
          <section className="cont-popup">
            <div className="popup">
              <h2>{texts[language].title}</h2>
              <div className="setting-item">
                <label htmlFor="username">{texts[language].usernameLabel}</label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={texts[language].usernamePlaceholder} />
              </div>
              <div className="setting-item">
                <label htmlFor="language-select">{texts[language].languageLabel}</label>
                <select id="language-select" value={language} onChange={(e) => setLanguage(e.target.value)}>
                  <option value="es">Español</option>
                  <option value="en">English</option>
                </select>
              </div>
              <div className="setting-item">
                <label htmlFor="theme-select">{texts[language].energyLabel}</label>
                <select id="theme-select" value={theme} onChange={handleThemeChange}>
                  <option value="light">{texts[language].optionLight}</option>
                  <option value="dark">{texts[language].optionDark}</option>
                </select>
              </div>
              <div className="popup-actions">
                <button className="keep-info" onClick={handleSaveChanges} > {texts[language].save} </button>
                <button className="close" onClick={handleClosePopup}>{texts[language].close}</button>
              </div>
            </div>
          </section>
        }
        <header className="chat-header">
          { }
          <button type="button" aria-label="Volver a contactos" title="Volver" className="mobile-back" onClick={() => document.body.classList.remove('show-chat-on-mobile')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="mobile-back-label">Volver</span>
          </button>
          <div>
            <div className="chat-user">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s"
                alt={user && user.name}
                className="chat-avatar"
              />
              <strong>{user && user.name}</strong>
              {user && user.lastSeen !== "" && <span className="last-seen">Last seen: {user.lastSeen}</span>}
            </div>
          </div>

          <div className="chat-actions">
            <button title="Camera">📷</button>
            <button title="Gallery">🖼️</button>
            <button title="Settings" onClick={handleShowPopup}>⚙️</button>
            <Link to="/help" title="Help">❓</Link>

            <div className="options-container" ref={optionsRef}>
              <button className="options-toggle" onClick={toggleOptions} aria-expanded={showOptions} title="Menu">👥</button>
              {showOptions && (
                <div className="options-popup">
                  <button className="option" onClick={handleStarred}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 17.3L6.18 20l1.18-6.88L2 9.75l6.91-1L12 2l3.09 6.75L22 9.75l-5.36 3.37L17.82 20z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" /></svg>
                    Mensajes destacados
                  </button>

                  <button className="option" onClick={handleSelectChat}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    Seleccionar chat
                  </button>

                  <button className="option logout-option" onClick={handleLogout}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /><path d="M16 17l5-5-5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /><path d="M21 12H9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>

          </div>
        </header>

        <section className="chat-messages">
          {(user && user.messages ? user.messages : []).map((message) => (
            <div className="message" key={message.id}>
              <p>{message.text}</p>
              <span className="time">{message.time}</span>
            </div>
          ))}
        </section>

        <footer className="chat-footer">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter text here..."
              onChange={handleChange}
              value={msg}
            />
            <button>➤</button>
          </form>
        </footer>
      </div>
    )
  } catch (err) {
    console.error('Render error in Chat component:', err)
    return (
      <div style={{ padding: 20 }}>
        <h3>Ocurrió un error al mostrar el chat</h3>
        <pre style={{ whiteSpace: 'pre-wrap', color: 'red' }}>{String(err && err.stack ? err.stack : err)}</pre>
      </div>
    )
  }
}
