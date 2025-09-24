import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Card,
  Button,
  Form,
  Alert,
  Container,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";

function Login({ setIsLoggedIn, setUserInfo }) {
  // State quản lý form đăng nhập
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("success");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // Xử lý thay đổi input form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Kiểm tra tính hợp lệ của email
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Hàm toggle hiển thị mật khẩu
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Xử lý submit form đăng nhập
  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra email hợp lệ
    if (!isValidEmail(formData.email)) {
      setAlertMessage("Vui lòng nhập địa chỉ email hợp lệ!");
      setAlertVariant("danger");
      setShowAlert(true);
      return;
    }

    // Kiểm tra độ dài mật khẩu
    if (formData.password.length < 6) {
      setAlertMessage("Mật khẩu phải có ít nhất 6 ký tự!");
      setAlertVariant("danger");
      setShowAlert(true);
      return;
    }

    // Demo: luôn đăng nhập thành công
    setAlertMessage("Đăng nhập thành công!");
    setAlertVariant("success");
    setShowAlert(true);

    // Lưu thông tin user
    const userInfo = {
      email: formData.email,
      fullName: "Người dùng",
      loginTime: new Date().toISOString(),
    };

    // Chờ 1.5 giây rồi chuyển hướng về trang chủ
    setTimeout(() => {
      setIsLoggedIn(true);
      setUserInfo(userInfo);
      navigate("/");
    }, 1500);
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center py-5"
      style={{
        backgroundColor: "#f8f9fa",
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={7} lg={6}>
            {/* Card chính chứa form đăng nhập */}
            <Card
              className="shadow-lg border-0"
              style={{
                borderRadius: "25px",
                backgroundColor: "#ffffff",
              }}
            >
              <Card.Body className="p-5">
                {/* Tiêu đề form đăng nhập */}
                <div className="text-center mb-4">
                  <h2
                    className="fw-bold mb-2"
                    style={{ color: "#416adcff", fontSize: "2.2rem" }}
                  >
                    Chào Mừng Trở Lại!
                  </h2>
                  <p className="text-muted fs-6">
                    Đăng nhập để tiếp tục khám phá thế giới pin và EV cùng chúng
                    tôi
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
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold text-dark mb-2">
                      Địa Chỉ Email
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="example@email.com"
                      required
                      style={{
                        borderRadius: "12px",
                        padding: "15px",
                        border: "2px solid #e0e0e0",
                        fontSize: "1rem",
                        transition: "all 0.3s ease",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#416adcff";
                        e.target.style.boxShadow =
                          "0 0 0 0.2rem rgba(65, 106, 220, 0.25)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#e0e0e0";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </Form.Group>

                  {/* Trường mật khẩu với nút show/hide */}
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold text-dark mb-2">
                      Mật Khẩu
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Nhập mật khẩu tài khoản của bạn"
                        required
                        style={{
                          borderRadius: "12px 0 0 12px",
                          padding: "15px",
                          border: "2px solid #e0e0e0",
                          fontSize: "1rem",
                          transition: "all 0.3s ease",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "#416adcff";
                          e.target.style.boxShadow =
                            "0 0 0 0.2rem rgba(65, 106, 220, 0.25)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#e0e0e0";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                      <Button
                        variant="light"
                        onClick={togglePasswordVisibility}
                        style={{
                          borderRadius: "0 12px 12px 0",
                          border: "2px solid #e0e0e0",
                          borderLeft: "none",
                          padding: "0 15px",
                          backgroundColor: "transparent",
                        }}
                      >
                        {showPassword ? (
                          <i className="bi bi-eye-slash"></i>
                        ) : (
                          <i className="bi bi-eye-fill"></i>
                        )}
                      </Button>
                    </InputGroup>
                  </Form.Group>

                  {/* Nút đăng nhập */}
                  <Button
                    type="submit"
                    className="w-100 fw-bold py-3 mb-3"
                    style={{
                      borderRadius: "12px",
                      fontSize: "1.1rem",
                      backgroundColor: "#416adcff",
                      border: "none",
                      padding: "15px",
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 15px rgba(65, 106, 220, 0.3)",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow =
                        "0 6px 20px rgba(65, 106, 220, 0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow =
                        "0 4px 15px rgba(65, 106, 220, 0.3)";
                    }}
                  >
                    Đăng Nhập
                  </Button>

                  {/* Link quên mật khẩu */}
                  <div className="text-center">
                    <Link
                      to="/forgot-password"
                      className="text-decoration-none"
                      style={{
                        fontSize: "0.9rem",
                        color: "#6c757d",
                        transition: "color 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = "#416adcff";
                        e.target.style.textDecoration = "underline";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = "#6c757d";
                        e.target.style.textDecoration = "none";
                      }}
                    >
                      Quên mật khẩu?
                    </Link>
                  </div>
                </Form>
              </Card.Body>
            </Card>

            {/* Footer thông tin chuyển đến đăng ký */}
            <div className="text-center mt-4">
              <div
                className="p-3 rounded-3"
                style={{
                  backgroundColor: "#ffffff",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <span style={{ color: "#333", fontSize: "0.95rem" }}>
                  Chưa có tài khoản?{" "}
                  <Link
                    to="/register"
                    className="fw-bold text-decoration-none"
                    style={{
                      color: "#416adcff",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.textDecoration = "underline";
                      e.target.style.color = "#fee877ff";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.textDecoration = "none";
                      e.target.style.color = "#416adcff";
                    }}
                  >
                    Đăng ký ngay
                  </Link>
                </span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
