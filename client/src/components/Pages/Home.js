import React from "react";
import "./styles/Home.css";
import Slider from "./Slider";
import Footer from "./Footer";
const Home = () => {
  return (
    <>
      <Slider />
      <br></br>
      <br></br>
      <div className="row">
        <div className="col-lg-6 align-items-center d-flex justify-content-center">
          <div
            className=" text-center"
            style={{ width: "35rem" }}
          >
            <h1>Exceptional experiences with Vistara Airways</h1>
            <h5>
              Explore India and beyond, earn rewards, and experience premium travel with
              Vistara Airways.{" "}
            </h5>
            <br></br>
          </div>
        </div>

        <div className="col-lg-6 align-items-center d-flex justify-content-center">
          <div className="row">
            <div className="col-lg-12 align-items-center d-flex justify-content-center">
              <div className="card border-0" style={{ width: "50rem" }}>
                <div className="row">
                  <div className="col-lg-6">
                    <img
                      src={require("../../images/Large-Sustainability.jpg")}
                      className="card-img-top"
                      alt="..."
                    />
                  </div>
                  <div className="col-lg-6">
                    <div className="card-body">
                      <h5 className="card-title">
                        <strong>Ensure a sustainable future</strong>
                      </h5>
                      <p className="card-text">
                        Join us in reducing our carbon footprint. Earn Green Miles for actions that contribute to sustainability.
                      </p>
                      <a href="#" className="btn btn-primary">
                        Learn more
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-12 align-items-center d-flex justify-content-center py-5">
              <div className="card border-0" style={{ width: "50rem" }}>
                <div className="row">
                  <div className="col-lg-6">
                    <img
                      src={require("../../images/Large-experiences.jpg")}
                      className="card-img-top"
                      alt="..."
                    />
                  </div>
                  <div className="col-lg-6">
                    <div className="card-body">
                      <h5 className="card-title">
                        <strong>Time flies on board Vistara Airways</strong>
                      </h5>
                      <p className="card-text">
                        Relax and enjoy our onboard services with exquisite dining and entertainment options.
                      </p>
                      <a href="#" className="btn btn-primary">
                        Learn more
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-12 align-items-center d-flex justify-content-center py-5">
              <div className="card border-0" style={{ width: "50rem" }}>
                <div className="row">
                  <div className="col-lg-6">
                    <img
                      src={require("../../images/Large-Upgrade.jpg")}
                      className="card-img-top"
                      alt="..."
                    />
                  </div>
                  <div className="col-lg-6">
                    <div className="card-body">
                      <h5 className="card-title">
                        <strong>Upgrade your journey</strong>
                      </h5>
                      <p className="card-text">
                        Upgrade to a higher class and enjoy premium comfort and services.
                      </p>
                      <a href="#" className="btn btn-primary">
                        Learn more
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br></br>
      <br></br>
      
      <div className="row" style={{ marginTop: "35px" }}>
        <div className="col-lg-4 align-items-center d-flex justify-content-center">
          <div className="white border-0" style={{ width: "40rem" }}>
            <div className="text-center">
              {" "}
              <img
                src={require("../../images/Destinations_Dekstop.png")}
                style={{ borderRadius: "20px" }}
                width="650"
                height="550"
              />
              <div className="card-body white border-0">
                <h5 className="card-title">
                  <strong style={{ fontSize: "25px" }}>
                    <br/>Discover the destinations you can
                    <br /> travel with Vistara Airways
                  </strong>
                </h5>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 align-items-center d-flex justify-content-center">
          <div className="white border-0" style={{ width: "60rem" }}>
            <div className="text-center">
              {" "}
              <img
                src={require("../../images/Fasttrack_Desktop.jpg")}
                style={{ borderRadius: "20px" }}
                width="650"
                height="550"
              />
              <div className="card-body white border-0">
                <h5 className="card-title">
                  <strong style={{ fontSize: "25px" }}>
                  <br/>Enjoy our Express Check-in service
                  </strong>
                </h5>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4 align-items-center d-flex justify-content-center">
          <div className=" white border-0" style={{ width: "60rem" }}>
            <div className="text-center">
              {" "}
              <img
                src={require("../../images/Alfursan_Destop.jpg")}
                style={{ borderRadius: "20px" }}
                width="650"
                height="550"
              />
              <div className="card-body white border-0">
                <h5 className="card-title">
                  <strong style={{ fontSize: "25px"}}>
                  <br/>Learn more about our loyalty <br />
                    program - Vistara Club
                  </strong>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      

      
      <header style={{ paddingLeft: 0,marginLeft:'25%',marginTop:'5%' }}>
        <div
          className="p-5 text-center bg-image"
          style={{
            backgroundImage:
              "url('https://mdbootstrap.com/img/new/slides/041.webp')",
            height: 600,
            width: 1300,
          }}
        >
          <div
            className="mask"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
          >
            <div className="d-flex justify-content-center align-items-center h-100">
              <div className="text-white">
                <h1 className="mb-3" style={{fontWeight:'800',marginTop:'20px'}}>Begin your journey with Vistara Airways</h1>
                <h4 className="mb-3" style={{fontSize:'20px'}}>Exclusive deals and rewards await our premium members</h4>
                <a
                  className="btn btn-outline-light btn-lg"
                  href="#!"
                  role="button" style={{backgroundColor:'grey', fontSize:'20px',marginBottom:'20px'}}
                >
                  Join Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Footer />
    </>
  );
};

export default Home;
