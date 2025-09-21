function Home() {
  return (
    <div className="text-center">
      <h1 className="mb-4">Chào mừng đến với EV Market 🚙⚡</h1>
      <p>Trang web mua bán xe điện uy tín.</p>
      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Mua xe</h5>
              <p className="card-text">Khám phá các mẫu xe điện mới nhất.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Bán xe</h5>
              <p className="card-text">Đăng bán xe của bạn nhanh chóng.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Hỗ trợ</h5>
              <p className="card-text">Liên hệ với chúng tôi để được hỗ trợ.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
