import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AppNavbar from "./components/Navbar"
import Home from "./pages/Home"
import Auth from "./pages/Auth"
import { useState, useEffect } from "react"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Khi load app, lấy trạng thái từ localStorage
  useEffect(() => {
    const savedLogin = localStorage.getItem("isLoggedIn")
    if (savedLogin === "true") {
      setIsLoggedIn(true)
    }
  }, [])

  // Mỗi khi thay đổi trạng thái, lưu vào localStorage
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn)
  }, [isLoggedIn])

  return (
    <Router>
      <AppNavbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buy" element={<h2>Mua xe</h2>} />
          <Route path="/sell" element={<h2>Bán xe</h2>} />
          <Route path="/support" element={<h2>Support</h2>} />
          <Route path="/notifications" element={<h2>Thông báo</h2>} />
          <Route path="/account" element={<h2>Tài khoản</h2>} />
          <Route path="/auth" element={<Auth setIsLoggedIn={setIsLoggedIn} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
