import { useState, useEffect } from "react"
import { useChat } from "../context/ChatContext"

export default function Sidebar() {
  const { users, setSelectedUser } = useChat()
  const [usersToRender, setUsersToRender] = useState(users)

  // Cada vez que cambien los usuarios globales, actualizo la lista a renderizar
  useEffect(() => {
    setUsersToRender(users)
  }, [users])

  // Filtro por búsqueda
  const handleChange = (event) => {
    const searchTerm = event.target.value.toLowerCase()
    const result = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm)
    )
    setUsersToRender(result)
  }

  // Seleccionar usuario y, en móvil, mostrar el chat a pantalla completa
  const handleSelect = (id) => {
    setSelectedUser(id)
    try {

      if (typeof window !== 'undefined' && window.innerWidth <= 768) {
        document.body.classList.add('show-chat-on-mobile')
      }
    } catch (err) {
      // ignore
    }
  }

  return (
    <div className="sidebar">
      <input
        type="text"
        placeholder="Search..."
        className="search"
        onChange={handleChange}
      />

      {usersToRender.length === 0 && (
        <p className="search-result">No search found...</p>
      )}

      <ul className="user-list">
        {usersToRender.map((user) => (
          <li
            key={user.id}
            onClick={() => handleSelect(user.id)}
            className="user"
          >
            <img
              className="avatar"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s"
              alt={user.name}
            />
            <div className="user-info">
              <strong>
                <span
                  style={{
                    color: user.status === "online" ? "green" : "red",
                    marginRight: "3px",
                  }}
                >
                  •
                </span>
                {user.name}
              </strong>
              <small>
                {user.status === "offline" ? user.lastSeen : "online"}
              </small>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
