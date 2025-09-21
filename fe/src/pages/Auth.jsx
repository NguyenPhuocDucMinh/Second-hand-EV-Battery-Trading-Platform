import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, Button, Form, Nav } from "react-bootstrap"

function Auth({ setIsLoggedIn }) {
  const [isLogin, setIsLogin] = useState(true)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // Demo: luôn login thành công
    setIsLoggedIn(true)
    navigate("/")
  }

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <Card style={{ width: "400px" }} className="shadow">
        <Card.Body>
          <Nav variant="tabs" defaultActiveKey="login" className="mb-3">
            <Nav.Item>
              <Nav.Link eventKey="login" onClick={() => setIsLogin(true)}>
                Đăng nhập
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="register" onClick={() => setIsLogin(false)}>
                Đăng ký
              </Nav.Link>
            </Nav.Item>
          </Nav>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control type="text" required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control type="password" required />
            </Form.Group>

            {!isLogin && (
              <Form.Group className="mb-3">
                <Form.Label>Xác nhận mật khẩu</Form.Label>
                <Form.Control type="password" required />
              </Form.Group>
            )}

            <Button type="submit" variant="primary" className="w-100">
              {isLogin ? "Đăng nhập" : "Đăng ký"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Auth
