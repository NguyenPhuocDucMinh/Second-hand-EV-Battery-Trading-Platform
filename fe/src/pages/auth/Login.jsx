import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Card, Button, Form, Alert, Container, Row, Col, InputGroup } from "react-bootstrap"

function Login({ setIsLoggedIn, setUserInfo }) {
  // State quản lý form đăng nhập
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertVariant, setAlertVariant] = useState('success')
  const [showPassword, setShowPassword] = useState(false)
  
  const navigate = useNavigate()

  // Xử lý thay đổi input form
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Kiểm tra tính hợp lệ của email
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Hàm toggle hiển thị mật khẩu
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  // Xử lý submit form đăng nhập
  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Kiểm tra email hợp lệ
    if (!isValidEmail(formData.email)) {
      setAlertMessage('Vui lòng nhập địa chỉ email hợp lệ!')
      setAlertVariant('danger')
      setShowAlert(true)
      return
    }

    // Kiểm tra độ dài mật khẩu
    if (formData.password.length < 6) {
      setAlertMessage('Mật khẩu phải có ít nhất 6 ký tự!')
      setAlertVariant('danger')
      setShowAlert(true)
      return
    }

    // Demo: luôn đăng nhập thành công
    setAlertMessage('Đăng nhập thành công!')
    setAlertVariant('success')
    setShowAlert(true)
    
    // Lưu thông tin user
    const userInfo = {
      email: formData.email,
      fullName: 'Người dùng',
      loginTime: new Date().toISOString()
    }
    
    // Chờ 1.5 giây rồi chuyển hướng về trang chủ
    setTimeout(() => {
      setIsLoggedIn(true)
      setUserInfo(userInfo)
      navigate("/")
    }, 1500)
  }

  return (
    <div 
      className="min-vh-100 d-flex align-items-center py-5" 
      style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            {/* Card chính chứa form đăng nhập */}
            <Card className="shadow-lg border-0" style={{ borderRadius: '20px' }}>
              <Card.Body className="p-5">
                {/* Tiêu đề form đăng nhập */}
                <div className="text-center mb-4">
                  <div style={{ fontSize: '3rem' }}>🔋</div>
                  <h2 className="fw-bold text-primary mb-2">
                    Chào Mừng Trở Lại!
                  </h2>
                  <p className="text-muted">
                    Đăng nhập để tiếp tục sử dụng dịch vụ
                  </p>
                </div>

                {/* Hiển thị thông báo */}
                {showAlert && (
                  <Alert 
                    variant={alertVariant} 
                    onClose={() => setShowAlert(false)} 
                    dismissible
                    className="text-center"
                  >
                    {alertMessage}
                  </Alert>
                )}

                {/* Form đăng nhập */}
                <Form onSubmit={handleSubmit}>
                  {/* Trường email */}
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">
                      Địa Chỉ Email
                    </Form.Label>
                    <Form.Control 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="example@email.com"
                      required
                      style={{ borderRadius: '10px', padding: '12px' }}
                    />
                  </Form.Group>

                  {/* Trường mật khẩu với nút show/hide */}
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">
                      Mật Khẩu
                    </Form.Label>
                    <InputGroup>
                      <Form.Control 
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
                        required
                        style={{ borderRadius: '10px 0 0 10px', padding: '12px' }}
                      />
                      <Button
                        variant="outline-secondary"
                        onClick={togglePasswordVisibility}
                        style={{ 
                          borderRadius: '0 10px 10px 0',
                          borderLeft: 'none',
                          padding: '12px 15px'
                        }}
                        title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                      >
                        {showPassword ? "Ẩn" : "Hiện"}
                      </Button>
                    </InputGroup>
                  </Form.Group>

                  {/* Nút đăng nhập */}
                  <Button 
                    type="submit" 
                    variant="primary"
                    className="w-100 fw-bold py-3 mb-3"
                    style={{ borderRadius: '10px', fontSize: '1.1rem' }}
                  >
                    Đăng Nhập
                  </Button>

                  {/* Link quên mật khẩu */}
                  <div className="text-center">
                    <Button 
                      variant="link" 
                      className="text-decoration-none text-muted"
                      style={{ fontSize: '0.9rem' }}
                    >
                      Quên mật khẩu?
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>

            {/* Footer thông tin chuyển đến đăng ký */}
            <div className="text-center mt-4 text-white">
              <small>
                Chưa có tài khoản? {' '}
                <Link 
                  to="/register"
                  className="text-white fw-bold text-decoration-underline"
                >
                  Đăng ký ngay
                </Link>
              </small>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Login
