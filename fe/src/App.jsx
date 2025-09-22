import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AppNavbar from "./components/Navbar"
import Home from "./pages/Home"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import { useState, useEffect } from "react"
import { Container } from "react-bootstrap"

function App() {
  // State quản lý trạng thái đăng nhập
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userInfo, setUserInfo] = useState(null)

  // Khi load app, lấy trạng thái từ localStorage
  useEffect(() => {
    const savedLogin = localStorage.getItem("isLoggedIn")
    const savedUserInfo = localStorage.getItem("userInfo")
    
    if (savedLogin === "true") {
      setIsLoggedIn(true)
      if (savedUserInfo) {
        try {
          setUserInfo(JSON.parse(savedUserInfo))
        } catch (error) {
          console.error("Lỗi khi parse thông tin user:", error)
        }
      }
    }
  }, [])

  // Mỗi khi thay đổi trạng thái đăng nhập, lưu vào localStorage
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn)
    if (!isLoggedIn) {
      // Xóa thông tin user khi đăng xuất
      localStorage.removeItem("userInfo")
      setUserInfo(null)
    }
  }, [isLoggedIn])

  // Lưu thông tin user vào localStorage
  useEffect(() => {
    if (userInfo) {
      localStorage.setItem("userInfo", JSON.stringify(userInfo))
    }
  }, [userInfo])

  return (
    <Router>
      {/* Navbar cố định ở trên */}
      <AppNavbar 
        isLoggedIn={isLoggedIn} 
        setIsLoggedIn={setIsLoggedIn}
        userInfo={userInfo}
      />
      
      {/* Nội dung chính */}
      <main style={{ minHeight: 'calc(100vh - 80px)' }}>
        <Routes>
          {/* Trang chủ */}
          <Route 
            path="/" 
            element={<Home isLoggedIn={isLoggedIn} />} 
          />
          
          {/* Trang mua pin */}
          <Route 
            path="/buy" 
            element={
              <Container className="py-5">
                <div className="text-center">
                  <h2 className="fw-bold text-primary mb-4">Tìm Kiếm Pin EV</h2>
                  <p className="text-muted">Tính năng đang được phát triển...</p>
                </div>
              </Container>
            } 
          />
          
          {/* Trang bán pin */}
          <Route 
            path="/sell" 
            element={
              <Container className="py-5">
                <div className="text-center">
                  <h2 className="fw-bold text-success mb-4">Đăng Bán Pin</h2>
                  <p className="text-muted">Tính năng đang được phát triển...</p>
                </div>
              </Container>
            } 
          />
          
          {/* Trang hỗ trợ */}
          <Route 
            path="/support" 
            element={
              <Container className="py-5">
                <div className="text-center">
                  <h2 className="fw-bold text-warning mb-4">Hỗ Trợ Khách Hàng</h2>
                  <p className="text-muted">Liên hệ: support@evbatteryhub.com</p>
                </div>
              </Container>
            } 
          />
          
          {/* Trang thông báo */}
          <Route 
            path="/notifications" 
            element={
              <Container className="py-5">
                <div className="text-center">
                  <h2 className="fw-bold text-info mb-4">Thông Báo</h2>
                  <p className="text-muted">Bạn chưa có thông báo mới</p>
                </div>
              </Container>
            } 
          />
          
          {/* Trang tài khoản */}
          <Route 
            path="/account" 
            element={
              <Container className="py-5">
                <div className="text-center">
                  <h2 className="fw-bold text-secondary mb-4">Hồ Sơ Cá Nhân</h2>
                  {userInfo ? (
                    <div>
                      <p>Chào mừng: {userInfo.email}</p>
                    </div>
                  ) : (
                    <p className="text-muted">Vui lòng đăng nhập để xem thông tin</p>
                  )}
                </div>
              </Container>
            } 
          />

          {/* Các trang mới */}
          <Route 
            path="/orders" 
            element={
              <Container className="py-5">
                <div className="text-center">
                  <h2 className="fw-bold mb-4">Đơn Hàng Của Tôi</h2>
                  <p className="text-muted">Tính năng đang được phát triển...</p>
                </div>
              </Container>
            } 
          />

          <Route 
            path="/favorites" 
            element={
              <Container className="py-5">
                <div className="text-center">
                  <h2 className="fw-bold text-danger mb-4">Danh Sách Yêu Thích</h2>
                  <p className="text-muted">Tính năng đang được phát triển...</p>
                </div>
              </Container>
            } 
          />

          <Route 
            path="/settings" 
            element={
              <Container className="py-5">
                <div className="text-center">
                  <h2 className="fw-bold mb-4">Cài Đặt</h2>
                  <p className="text-muted">Tính năng đang được phát triển...</p>
                </div>
              </Container>
            } 
          />
          
          {/* Trang đăng nhập */}
          <Route 
            path="/login" 
            element={
              <Login 
                setIsLoggedIn={setIsLoggedIn} 
                setUserInfo={setUserInfo}
              />
            } 
          />

          {/* Trang đăng ký */}
          <Route 
            path="/register" 
            element={
              <Register 
                setIsLoggedIn={setIsLoggedIn} 
                setUserInfo={setUserInfo}
              />
            } 
          />

          {/* Redirect từ /auth cũ đến /login */}
          <Route 
            path="/auth" 
            element={
              <Login 
                setIsLoggedIn={setIsLoggedIn} 
                setUserInfo={setUserInfo}
              />
            } 
          />
        </Routes>
      </main>

      {/* Footer đơn giản */}
      <footer className="bg-dark text-white text-center py-3 mt-5">
        <Container>
          <p className="mb-0">
            © 2024 EV Battery Hub - Nền tảng pin EV cũ hàng đầu Việt Nam
          </p>
        </Container>
      </footer>
    </Router>
  )
}

export default App
