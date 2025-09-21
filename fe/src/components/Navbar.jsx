import { Link, useNavigate } from "react-router-dom"
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap"

function AppNavbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    setIsLoggedIn(false)        // cập nhật trạng thái
    navigate("/")               // điều hướng về Home
  }

  return (
    <Navbar bg="light" expand="lg" className="mb-4 shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">🚗 EV Market</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/buy">Mua xe</Nav.Link>
            <Nav.Link as={Link} to="/sell">Bán xe</Nav.Link>
            <Nav.Link as={Link} to="/support">Support</Nav.Link>
            <Nav.Link as={Link} to="/notifications">🔔 Noti</Nav.Link>

            {isLoggedIn ? (
              <NavDropdown title="👤 Account" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/account">Profile</NavDropdown.Item>
                <NavDropdown.Item>Settings</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link as={Link} to="/auth">Đăng nhập</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default AppNavbar
