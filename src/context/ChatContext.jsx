import { createContext, useContext, useState, useEffect } from "react"

const ChatContext = createContext()


const defaultUsers = [
  {
    id: 1,
    name: "Juan perez",
    status: "online",
    lastSeen: "",
    messages: [
      { id: 1, text: "Hola, como estas?", time: "00:40" }
    ]
  },
  {
    id: 2,
    name: "Marita Rodriguez",
    status: "offline",
    lastSeen: "3 hours ago",
    messages: [
      { id: 1, text: "RESPONDEEEE QUE TENGO HAMBREE!", time: "15:00" },
      { id: 2, text: "estoy desde las 12 en el banco!!", time: "15:10" },
      { id: 3, text: "ahora voy a casa, llevo empanadas :)", time: "20:00" }
    ]
  },
  {
    id: 3,
    name: "Luka Nicolas Piaggi",
    status: "online",
    lastSeen: "",
    messages: [
      { id: 1, text: "Me encanta programación!!", time: "19:00" },
      { id: 2, text: "El profe es un capo!!!!!", time: "19:01" }
    ]
  },
  {
    id: 4,
    name: "Lucas Hernan Figueroa",
    status: "offline",
    lastSeen: "1 minute ago",
    messages: [
      { id: 1, text: "Estoy en programación, después te mando...", time: "18:59" }
    ]
  }
]

const ChatProvider = ({ children }) => {

  const [users, setUsers] = useState(() => {
    try {
      const stored = localStorage.getItem("users")
      if (stored) return JSON.parse(stored)
    } catch (err) {
      console.warn('Could not parse users from localStorage', err)
    }
    return defaultUsers
  })


  const [selectedUser, setSelectedUser] = useState(() => null)


  useEffect(() => {
    try {
      if (Array.isArray(users)) {
        localStorage.setItem("users", JSON.stringify(users))
      }
    } catch (err) {
      console.warn('Could not persist users to localStorage', err)
    }
  }, [users])


  useEffect(() => {
    try {
      if (selectedUser !== null && selectedUser !== undefined) {
        localStorage.setItem("selectedUser", JSON.stringify(selectedUser))
      }
    } catch (err) {
      console.warn('Could not persist selectedUser to localStorage', err)
    }
  }, [selectedUser])

  return (
    <ChatContext.Provider value={{ users, setUsers, selectedUser, setSelectedUser }}>
      {children}
    </ChatContext.Provider>
  )
}

const useChat = () => useContext(ChatContext)

export { useChat, ChatProvider }
