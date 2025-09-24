import { Link } from "react-router-dom";
import { Button, Card, Row, Col, Container } from "react-bootstrap";
import backgroundImage from "../assets/background.jpg";

function Home() {
  return (
    <>
      {/* Hero Section - Phần giới thiệu chính */}
      <div
        className="hero-section d-flex align-items-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center", // ảnh xe nằm bên phải
          backgroundRepeat: "no-repeat",
          minHeight: "60vh", // hoặc 100vh nếu muốn full màn hình
          color: "white",
        }}
      >
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="text-start">
              <h6
                className="display-4 fw-bold mb-4"
                style={{ color: "#416adcff", fontSize: "2.0 rem" }}
              >
                FPT Car hãy sủa theo cách của bạn
              </h6>

              <p
                className="lead mb-4 fs-5 fw-bold"
                style={{ color: "#000000ff" }}
              >
                Xe và Pin điện cũ – Kết nối giá trị, tiếp năng lượng
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Button
                  as={Link}
                  to="/buy"
                  variant="light"
                  size="lg"
                  className="px-4 py-2 fw-semibold"
                  style={{ color: "#416adcff", backgroundColor: "#fee877ff" }}
                >
                  Tìm Pin ngay
                </Button>
                <Button
                  as={Link}
                  to="/sell"
                  variant="outline-light"
                  size="lg"
                  className="px-4 py-2 fw-semibold"
                  style={{
                    color: "#416adcff",
                    borderColor: "#416adcff",
                    borderWidth: "1.5px",
                  }}
                >
                  Tìm xe
                </Button>
              </div>
            </Col>
            {/* Col trống để giữ chỗ cho phần xe bên phải */}
            <Col md={6}></Col>
          </Row>
        </Container>
      </div>

      {/* Features Section - Phần tính năng nổi bật */}
      <Container>
        <h2 className="text-center mb-5 fw-bold text-primary">
          Tại Sao Chọn Chúng Tôi?
        </h2>

        <Row className="g-4 mb-5">
          {/* Card tính năng 1 - Mua pin */}
          <Col md={4}>
            <Card
              className="h-100 shadow-lg border-0 hover-card"
              style={{ transition: "transform 0.3s ease" }}
            >
              <Card.Body className="text-center p-4">
                <div className="mb-3" style={{ fontSize: "3rem" }}></div>
                <h5 className="card-title fw-bold text-success mb-3">
                  Mua Pin Chất Lượng
                </h5>
                <p className="card-text text-muted mb-4">
                  Khám phá hàng ngàn pin EV đã qua kiểm định chất lượng với giá
                  cả hợp lý
                </p>
                <Button
                  as={Link}
                  to="/buy"
                  variant="success"
                  className="px-4 fw-semibold"
                >
                  Xem Pin →
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Card tính năng 2 - Bán pin */}
          <Col md={4}>
            <Card
              className="h-100 shadow-lg border-0 hover-card"
              style={{ transition: "transform 0.3s ease" }}
            >
              <Card.Body className="text-center p-4">
                <div className="mb-3" style={{ fontSize: "3rem" }}></div>
                <h5 className="card-title fw-bold text-info mb-3">
                  Bán Pin Dễ Dàng
                </h5>
                <p className="card-text text-muted mb-4">
                  Đăng bán pin của bạn với quy trình đơn giản và nhận được giá
                  tốt nhất
                </p>
                <Button
                  as={Link}
                  to="/sell"
                  variant="info"
                  className="px-4 fw-semibold"
                >
                  Đăng Bán →
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Card tính năng 3 - Hỗ trợ */}
          <Col md={4}>
            <Card
              className="h-100 shadow-lg border-0 hover-card"
              style={{ transition: "transform 0.3s ease" }}
            >
              <Card.Body className="text-center p-4">
                <div className="mb-3" style={{ fontSize: "3rem" }}></div>
                <h5 className="card-title fw-bold text-warning mb-3">
                  Hỗ Trợ 24/7
                </h5>
                <p className="card-text text-muted mb-4">
                  Đội ngũ chuyên gia sẵn sàng hỗ trợ bạn mọi lúc với dịch vụ tận
                  tâm
                </p>
                <Button
                  as={Link}
                  to="/support"
                  variant="warning"
                  className="px-4 fw-semibold"
                >
                  Liên Hệ →
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Statistics Section - Phần thống kê */}
        <div className="bg-light p-5 rounded-3 text-center mb-5">
          <Row>
            <Col md={3}>
              <div className="mb-3">
                <h3 className="fw-bold text-primary">1,000+</h3>
                <p className="text-muted">Pin Đã Bán</p>
              </div>
            </Col>
            <Col md={3}>
              <div className="mb-3">
                <h3 className="fw-bold text-success">500+</h3>
                <p className="text-muted">Khách Hàng Hài Lòng</p>
              </div>
            </Col>
            <Col md={3}>
              <div className="mb-3">
                <h3 className="fw-bold text-info">99%</h3>
                <p className="text-muted">Tỷ Lệ Thành Công</p>
              </div>
            </Col>
            <Col md={3}>
              <div className="mb-3">
                <h3 className="fw-bold text-warning">24/7</h3>
                <p className="text-muted">Hỗ Trợ</p>
              </div>
            </Col>
          </Row>
        </div>
      </Container>

      {/* CSS cho hover effect */}
      <style jsx>{`
        .hover-card:hover {
          transform: translateY(-10px);
        }
      `}</style>
    </>
  );
}

export default Home;
