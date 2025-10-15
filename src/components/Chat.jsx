import { useState, useEffect } from "react"
import { useChat } from "../context/ChatContext"
import { useNavigate, Link } from "react-router-dom"


export default function Chat() {
  const [msg, setMsg] = useState("")
  const [showPopup, setShowPopup] = useState(false);

  // Cargamos el tema guardado (si existe), si no usamos 'light' por defecto
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [username, setUsername] = useState(localStorage.getItem("username") || "Invitado");
  const [language, setLanguage] = useState(localStorage.getItem("language") || "es");

  // Obtenemos del contexto todo lo necesario
  const { users, selectedUser, setUsers } = useChat()
  // Buscamos el usuario activo
  const user = users.find(u => u.id === selectedUser)
  const navigate = useNavigate()

  useEffect(() => {
    // Aplicar el tema actual al montar / cuando cambie
    applyTheme(theme)
  }, [theme]);


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
    return (
      <div className="user-not-found">
        <p>No hay usuario seleccionado...</p>
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

    const newMessage = {
      id: crypto.randomUUID(),
      text: msg,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }

    // ✅ Actualizamos el estado de manera INMUTABLE
    const updatedUsers = users.map(u =>
      u.id === user.id
        ? { ...u, messages: [...u.messages, newMessage] }
        : u
    )

    setUsers(updatedUsers)

    setMsg("")
  }

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
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
        <div>
          <div className="chat-user">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s"
              alt={user.name}
              className="chat-avatar"
            />
            <strong>{user.name}</strong>
            {user.lastSeen !== "" && <span className="last-seen">Last seen: {user.lastSeen}</span>}
          </div>
        </div>

        <div className="chat-actions">
          <button title="Camera">📷</button>
          <button title="Gallery">🖼️</button>
          <button title="Settings" onClick={handleShowPopup}>⚙️</button>
          <Link to="/help" title="Help">❓</Link>
          <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      </header>

      <section className="chat-messages">
        {user.messages.map((message) => (
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
}
