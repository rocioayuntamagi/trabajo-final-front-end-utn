import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "../views/Login";
import { Messages } from "../views/Messages";
import { NotFound } from "../views/NotFound";
import ProtectedRoute from "../components/ProctectedRoute";

const RouterApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat"
          element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export { RouterApp }