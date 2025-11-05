function Footer() {
    return (
    <>
         <div className="container my-5 mx-auto p-3">
      <footer className="text-center text-lg-start" style={{ backgroundColor: "#f8f9fa" }}>
        <div className="container d-flex justify-content-center py-5">
          <button type="button" className="btn secondary btn-floating mx-2" style={{ backgroundColor: "#cfe2ff" }}>
            <i className="fab fa-facebook-f"></i>
          </button>
          <button type="button" className="btn secondary btn-floating mx-2" style={{ backgroundColor: "#cfe2ff" }}>
            <i className="fab fa-youtube"></i>
          </button>
          <button type="button" className="btn secondary btn-floating mx-2" style={{ backgroundColor: "#cfe2ff" }}>
            <i className="fab fa-instagram"></i>
          </button>
          <button type="button" className="btn secondary btn-floating mx-2" style={{ backgroundColor: "#cfe2ff" }}>
            <i className="fab fa-twitter"></i>
          </button>
        </div>

        <div className="text-center text-white p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
          © 2020 Copyright:
          <a className="text-white" href="#"> iBitPOS.com </a>
        </div>
      </footer>
    </div>
    
    </>
    
    )
}
export default Footer