import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Sidebar from './Sidebar';
import { NavBtn, NavBtnLink } from "../Navbar/NavbarElements";
import MovingText from "react-moving-text";

const AdminPanel = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    Axios.get('http://localhost:5000/getstats')
      .then((resp) => setUser({ ...resp.data[0] }))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div style={styles.container}>
      <Sidebar />

      {/* Welcome Message */}
      <MovingText
        type="popIn"
        duration="1600ms"
        delay="0s"
        direction="normal"
        timing="ease-in"
        iteration="1"
        fillMode="none"
      >
        <h1 style={styles.welcomeText}>Welcome, ADMIN</h1>
      </MovingText>

      {/* Admin Stats Section */}
      <div style={styles.statsContainer}>
        <h2 style={styles.statsText}>📊 Bookings Count: <span>{user.countt}</span></h2>
        <h2 style={styles.statsText}>💰 Revenue Generated: <span>${user.summ}</span></h2>
      </div>

      {/* Admin Instructions Section */}
      <div style={styles.instructions}>
        <h3 style={styles.instructionsHeader}>📌 Instructions for Admin</h3>
        <ul style={styles.instructionsList}>
          <li>Use the sidebar to navigate between different management options.</li>
          <li>Review bookings and revenue reports regularly to ensure data accuracy.</li>
          <li>Use the "Logout" button to securely exit the admin panel.</li>
          <li>For technical support, contact the IT department.</li>
        </ul>
      </div>

      {/* Logout Button */}
      <NavBtn>
        <NavBtnLink to="/">Logout</NavBtnLink>
      </NavBtn>
    </div>
  );
};

// CSS styles in JavaScript Object format
const styles = {
  container: {
    backgroundImage: 'url("/images/admin-bg.jpg")',
    backgroundSize: 'cover',
    minHeight: '100vh',
    padding: '20px',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  welcomeText: {
    textAlign: 'center',
    fontSize: '70px',
    fontWeight: '800',
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '20px',
    width: '80vw',
  },
  statsContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    marginBottom: '30px',
    width: '60vw',
  },
  statsText: {
    fontSize: '1.5em',
    margin: '10px 0',
  },
  instructions: {
    backgroundColor: '#333',
    padding: '20px',
    borderRadius: '10px',
    width: '60vw',
    marginBottom: '40px',
  },
  instructionsHeader: {
    fontSize: '1.8em',
    marginBottom: '15px',
    borderBottom: '2px solid #fff',
    paddingBottom: '10px',
  },
  instructionsList: {
    listStyleType: 'disc',
    paddingLeft: '20px',
    lineHeight: '1.8',
  },
  button: {
    padding: '12px 20px',
    fontSize: '1em',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default AdminPanel;
