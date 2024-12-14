import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import Axios from "axios";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardTitle,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
} from "mdb-react-ui-kit";
import './styles/CustomerPanel.css';

const ViewProfile = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  
  useEffect(() => {
    Axios.get(`http://localhost:5000/api/get/${id}`).then((resp) =>
      setData({ ...resp.data[0] })
    );
  }, [id]);

  return (
    <div
      className="vh-100 d-flex align-items-center justify-content-center"
      style={{
      
      }}
    >
      <MDBContainer>
        <MDBRow className="justify-content-center">
          <MDBCol md="10" lg="8" xl="7">
            <MDBCard
              style={{
                borderRadius: "15px",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(10px)",
              }}
            >
              <MDBCardBody className="p-5">
                <div className="d-flex align-items-center">
                  {/* Updated Profile Image */}
                  <div className="flex-shrink-0">
                    <MDBCardImage
                      style={{
                        width: "200px",
                        height: "200px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                      src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d"
                      alt="Profile"
                      fluid
                    />
                  </div>
                  <div className="flex-grow-1 ms-4" style={{
                    margin : '40px'
                  }}>
                    {/* Greeting and User Information */}
                    <div>
                      <MDBCardTitle className="mb-3">
                        <h1 style={{ fontWeight: "700", color: "#007bff" }}>Hello, {data.first_name}!</h1>
                      </MDBCardTitle>
                      <MDBCardText style={{ fontSize: "18px" }}>
                        We’re thrilled to have you as a valued member of Vistara Airways. Your journey with us is all about comfort, luxury, and unforgettable experiences!
                      </MDBCardText>
                    </div>
                    
                    {/* Profile Details */}
                    <div style={{ marginTop: "20px" }}>
                      <MDBCardTitle><strong>First Name:</strong> {data.first_name}</MDBCardTitle>
                      <MDBCardTitle><strong>Last Name:</strong> {data.last_name}</MDBCardTitle>
                      <MDBCardTitle><strong>Phone:</strong> {data.phone_number}</MDBCardTitle>
                      <MDBCardTitle><strong>Email:</strong> {data.email}</MDBCardTitle>
                      <MDBCardTitle><strong>Passport No:</strong> {data.passport_no}</MDBCardTitle>
                    </div>

                    {/* Back Button */}
                    <div className="d-flex pt-4">
                      <Link to={`/CustomerPanel/${id}`}>
                        <button
                          className="btn"
                          style={{
                            fontSize: "18px",
                            backgroundColor: "#007bff",
                            color: "white",
                            padding: "10px 20px",
                            borderRadius: "10px",
                          }}
                        >
                          Back to Main
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default ViewProfile;
