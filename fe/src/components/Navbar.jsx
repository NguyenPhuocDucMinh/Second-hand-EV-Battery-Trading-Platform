import { Link, useNavigate, useLocation } from "react-router-dom"
import { Navbar, Nav, Container, NavDropdown, Button } from "react-bootstrap"

function AppNavbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate()
  const location = useLocation() // Lấy thông tin đường dẫn hiện tại

  // Xử lý đăng xuất
  const handleLogout = () => {
    setIsLoggedIn(false)        // Cập nhật trạng thái đăng nhập
    navigate("/")               // Điều hướng về trang chủ
  }

  // Kiểm tra link có đang active không
  const isActiveLink = (path) => {
    return location.pathname === path
  }

  return (
    <Navbar 
      expand="lg" 
      className="shadow-sm sticky-top"
      style={{ 
        background: ' #5fcff1ff ',
        padding: '1rem 0'
      }}
      variant="dark"
    >
      <Container>
        {/* Logo và tên thương hiệu */}
        <Navbar.Brand 
          as={Link} 
          to="/" 
          className="fw-bold fs-3 text-white"
          style={{ textDecoration: 'none' }}
        >
          <span style={{ color: '#ffffffff' }}>EV Battery Hub</span>
        </Navbar.Brand>

        {/* Nút toggle cho mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Menu điều hướng chính */}
          <Nav className="ms-auto align-items-center">
            <Nav.Link 
              as={Link} 
              to="/" 
              className={`fw-semibold mx-2 ${isActiveLink('/') ? 'active' : ''}`}
              style={{ 
                color: isActiveLink('/') ? '#FFD700' : 'white',
                borderBottom: isActiveLink('/') ? '2px solid #FFD700' : 'none',
                paddingBottom: '8px'
              }}
            >
            Trang Chủ
            </Nav.Link>

            <Nav.Link 
              as={Link} 
              to="/buy" 
              className={`fw-semibold mx-2 ${isActiveLink('/buy') ? 'active' : ''}`}
              style={{ 
                color: isActiveLink('/buy') ? '#FFD700' : 'white',
                borderBottom: isActiveLink('/buy') ? '2px solid #FFD700' : 'none',
                paddingBottom: '8px'
              }}
            >
            Mua Pin
            </Nav.Link>

            <Nav.Link 
              as={Link} 
              to="/sell" 
              className={`fw-semibold mx-2 ${isActiveLink('/sell') ? 'active' : ''}`}
              style={{ 
                color: isActiveLink('/sell') ? '#FFD700' : 'white',
                borderBottom: isActiveLink('/sell') ? '2px solid #FFD700' : 'none',
                paddingBottom: '8px'
              }}
            >
            Bán Pin
            </Nav.Link>

            <Nav.Link 
              as={Link} 
              to="/support" 
              className={`fw-semibold mx-2 ${isActiveLink('/support') ? 'active' : ''}`}
              style={{ 
                color: isActiveLink('/support') ? '#FFD700' : 'white',
                borderBottom: isActiveLink('/support') ? '2px solid #FFD700' : 'none',
                paddingBottom: '8px'
              }}
            >
            Hỗ Trợ
            </Nav.Link>

            <Nav.Link 
              as={Link} 
              to="/notifications" 
              className={`fw-semibold mx-2 position-relative ${isActiveLink('/notifications') ? 'active' : ''}`}
              style={{ 
                color: isActiveLink('/notifications') ? '#FFD700' : 'white',
                borderBottom: isActiveLink('/notifications') ? '2px solid #FFD700' : 'none',
                paddingBottom: '8px'
              }}
            >
              Thông Báo
              {/* Badge thông báo mới */}
              <span 
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: '0.6rem' }}
              >
                3
              </span>
            </Nav.Link>

            {/* Phần tài khoản người dùng */}
            {isLoggedIn ? (
              <NavDropdown 
                title={
                  <span className="text-white fw-semibold">
                    👤 Tài Khoản
                  </span>
                } 
                id="basic-nav-dropdown"
                className="mx-2"
                menuVariant="light"
              >
                <NavDropdown.Item as={Link} to="/account">
                Hồ Sơ Cá Nhân
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/orders">
                Đơn Hàng Của Tôi
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/favorites">
                Yêu Thích
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/settings">
                Cài Đặt
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item 
                  onClick={handleLogout}
                  className="text-danger fw-semibold"
                >
                Đăng Xuất
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              // Nút đăng nhập cho người dùng chưa đăng nhập
              <Button
                as={Link}
                to="/login"
                variant="light"
                className="fw-bold ms-3 px-4"
                style={{ 
                  borderRadius: '25px',
                  border: '2px solid white',
                  color: '#667eea'
                }}
              >
              Đăng Nhập
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default AppNavbar
