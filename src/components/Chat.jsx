import { useState, useEffect } from "react"
import { useChat } from "../context/ChatContext"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";

export default function Chat() {
  const [msg, setMsg] = useState("")
  const [showPopup, setShowPopup] = useState(false);
  const [theme, setTheme] = useState("light")

  // 1. Obtenemos del contexto todo lo necesario
  const { users, selectedUser, setUsers } = useChat()

  // 2. Buscamos el usuario activo
  const user = users.find(u => u.id === selectedUser)

  const navigate = useNavigate()

  useEffect(() => {
    // Forzar modo claro por defecto al iniciar (ignoramos localStorage)
    // Si quieres mantener la preferencia previa almacenada, cambiamos esto.
    setTheme("light")
    document.body.classList.remove("dark-mode")
  }, [])


  // Aplica el tema a la página (añade/quita la clase 'dark-mode')
  const applyTheme = (themeName) => {
    if (themeName === "dark") {
      document.body.classList.add("dark-mode")
    } else {
      document.body.classList.remove("dark-mode")
    }
  }



  if (!user) {
    return (
      <div className="user-not-found">
        <p>No hay usuario seleccionado...</p>
      </div>
    )
  }

  // 3. Manejo del input
  const handleChange = (event) => {
    setMsg(event.target.value)
  }

  // 4. Cuando enviamos el formulario
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

    setUsers(updatedUsers) // esto dispara el useEffect del contexto que guarda en localStorage

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
    // Aplicamos y persistimos la elección cuando el usuario hace click en "Guardar cambios"
    applyTheme(theme)
    localStorage.setItem("theme", theme)
    setShowPopup(false)
  }

  const handleThemeChange = (e) => {
    const selectedTheme = e.target.value
    // Hacemos preview del tema al cambiar la selección dentro del popup
    setTheme(selectedTheme)
    applyTheme(selectedTheme)
  }



  return (
    <div className="chat">
      {
        showPopup === true &&
        <section className="cont-popup">
          <div className="popup">
            <h2>Configuración</h2>
            <div className="setting-item">
              <label htmlFor="theme-select">Tema:</label>
              <select id="theme-select" value={theme} onChange={handleThemeChange}>
                <option value="light">Claro 🌞</option>
                <option value="dark">Oscuro 🌙</option>
              </select>
            </div>
            <div className="popup-actions">
              <button className="keep-info" onClick={handleSaveChanges} > Guardar cambios </button>
              <button className="close" onClick={handleClosePopup}>Cerrar</button>
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
