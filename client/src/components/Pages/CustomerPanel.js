import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import CustomerNavbar from "../CustomerNavbar";
import MovingText from "react-moving-text";
import './styles/CustomerPanel.css';

const CustomerPanel = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    Axios
      .get(`http://localhost:5000/CustomerPanel/${id}`)
      .then((resp) => setUser({ ...resp.data[0] }));
  }, [id]);

  return (
    <div className='bg-pic'>
      {/* Navbar */}
      <CustomerNavbar />

      {/* Welcome Message with Animation */}
      <MovingText
        type="popIn"
        duration="1600ms"
        delay="0s"
        direction="normal"
        timing="ease-in"
        iteration="5"
        fillMode="none"
      >
        <h1 style={{ textAlign: "center", fontSize: "80px", marginTop: "10%", fontWeight: '800', color: 'white' }}>
          Welcome, {user.first_name}!
        </h1>
      </MovingText>

      {/* Additional Content for Greeting and Praise */}
      <div style={{ textAlign: "center", color: "white", marginTop: "3%" }}>
        <h2 style={{ fontWeight: '700', fontSize: '36px' }}>We are delighted to have you onboard Vistara Airways!</h2>
        <p style={{ fontSize: '20px', maxWidth: '800px', margin: '0 auto' }}>
          At Vistara Airways, we pride ourselves on delivering an unparalleled flying experience. Our commitment to your comfort, safety, and satisfaction ensures that your journey with us is as smooth and enjoyable as possible.
        </p>

        {/* Key Features of the Airline */}
        <div style={{ marginTop: '40px', fontSize: '18px' , backgroundColor : 'black', padding:'20px'}}>
          <h3 style={{ fontWeight: '700' }}>Why Choose Vistara Airways?</h3>
          <ul style={{ listStyleType: 'none', padding: '0', marginTop: '20px' }}>
            <li>✈️ <strong>World-Class Comfort:</strong> Spacious seating, luxurious amenities, and top-tier service.</li>
            <li>🍽️ <strong>Gourmet Dining:</strong> Enjoy a variety of exquisite meals crafted by top chefs, with vegetarian and regional options.</li>
            <li>🎬 <strong>In-flight Entertainment:</strong> Stay entertained with our extensive selection of movies, music, and games.</li>
            <li>💺 <strong>Seamless Upgrades:</strong> Upgrade to premium classes for extra comfort and exclusive perks.</li>
            <li>🌍 <strong>Eco-Friendly Commitment:</strong> Join us in reducing our carbon footprint through sustainable practices.</li>
          </ul>
        </div>

        {/* Call to Action Button */}
        <a 
          href="/about" 
          className="btn btn-primary" 
          style={{ marginTop: '30px', fontSize: '20px', padding: '10px 20px' }}
        >
          Discover More
        </a>
      </div>
    </div>
  );
};

export default CustomerPanel;
