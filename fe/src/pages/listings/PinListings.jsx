import React from "react";
import { Container, Row, Col, Card, Badge, Form } from "react-bootstrap";

// Dữ liệu mẫu bài đăng đấu giá xe
const auctionCars = [
  {
    id: 1,
    image: "/images/car1.jpg",
    brand: "Peugeot 2008 GT Line 2022",
    location: "Hà Nội",
    km: "27,000 km",
    left: "1 ngày",
    price: "499 triệu",
    owner: "******7817",
    comments: 6,
    description: "tư vấn thêm mấy dòng 🙌",
  },
  {
    id: 2,
    image: "/images/car2.jpg",
    brand: "Mazda 2S 2014 Trắng",
    location: "Thanh Hóa",
    km: "130,000 km",
    left: "23:03:42",
    price: "Trả giá ngay",
    owner: "Sơn",
    comments: 1,
    description: "mình có chiếc mitsubishi mi...",
  },
  {
    id: 3,
    image: "/images/car3.jpg",
    brand: "Vinfast Lux a 2.0 Cao cấp...",
    location: "TP. Hồ Chí Minh",
    km: "14,700 km",
    left: "22:42:19",
    price: "Trả giá ngay",
    owner: "",
    comments: 0,
    description: "Chưa có bình luận",
    certified: true,
  },
];

function PinListings() {
  return (
    <Container fluid className="py-4" style={{ background: "#f5f8fa", minHeight: "100vh" }}>
      <Row>
        {/* Sidebar bộ lọc */}
        <Col md={3}>
          <Card>
            <Card.Body>
              <Card.Title>Bộ lọc</Card.Title>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Tìm kiếm</Form.Label>
                  <Form.Control type="text" placeholder="Tìm kiếm pin" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Hãng pin</Form.Label>
                  <Form.Control type="text" placeholder="Hãng pin" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Vị trí</Form.Label>
                  <Form.Control type="text" placeholder="Vị trí" />
                </Form.Group>
                {/* <Form.Group className="mb-3">
                  <Form.Label>Trạng thái xe</Form.Label>
                  <Form.Check type="checkbox" label="Đã kiểm định" />
                  <Form.Check type="checkbox" label="Chưa kiểm định" />
                </Form.Group> */}
                <input type="submit" />
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Danh sách đấu giá */}
        <Col md={9}>
          <h2 className="mb-4">Các bài đăng mới nhất</h2>
          <Row>
            {auctionCars.map((car) => (
              <Col key={car.id} md={4} className="mb-4">
                <Card style={{ borderRadius: "16px", overflow: "hidden" }}>
                  <div style={{ position: "relative" }}>
                    <Card.Img variant="top" src={car.image} style={{ height: "180px", objectFit: "cover" }} />
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0, left: 0, width: "100%",
                        background: "rgba(0,0,0,0.6)", color: "#fff",
                        padding: "10px", display: "flex", justifyContent: "space-between"
                      }}
                    >
                      <div>
                        <span role="img" aria-label="clock"></span> Phiên còn lại <b>{car.left}</b>
                      </div>
                      <div>
                        <span role="img" aria-label="money"></span> Cao nhất <b>{car.price}</b>
                      </div>
                    </div>
                    {/* {car.certified && (
                      <Badge bg="primary" style={{ position: "absolute", top: 10, right: 10, padding: "8px" }}>
                        VUCAR KIỂM ĐỊNH
                      </Badge>
                    )} */}
                  </div>
                  <Card.Body>
                    <Card.Title>{car.brand}</Card.Title>
                    <Card.Text>{car.location} &nbsp; {car.km}</Card.Text>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      {car.owner && <span>* {car.owner}</span>}
                      {car.comments > 0 && (
                        <Badge pill bg="danger">{car.comments}</Badge>
                      )}
                    </div>
                    <Card.Text className="mt-2">{car.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default PinListings;