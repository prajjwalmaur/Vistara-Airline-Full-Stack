import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Axios from "axios";

const BoardingPass = () => {
  const { id } = useParams();

  // Extract passenger_id and flight_id from URL
  const passenger_id = id.split('-')[0];
  const flight_id = id.split('-')[1];

  const [data, setData] = useState({});

  useEffect(() => {
    Axios.get(`http://localhost:5000/showPass`, {
      params: { passenger_id, flight_id },
    })
      .then((resp) => setData(resp.data))
      .catch((error) => console.error("Error fetching boarding pass:", error));
  }, [passenger_id, flight_id]);

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <ul style={styles.dashedLineLeft}>
          {Array.from({ length: 15 }).map((_, index) => (
            <li key={index} style={styles.dash}></li>
          ))}
        </ul>

        <ul style={styles.dashedLineRight}>
          {Array.from({ length: 15 }).map((_, index) => (
            <li key={index} style={styles.dash}></li>
          ))}
        </ul>

        <div style={styles.ticket}>
          <span style={styles.airline}>FAST Airways</span>
          <span style={{ ...styles.airline, ...styles.airlineSlip }}>FAST Airways</span>
          <span style={styles.boarding}>Boarding Pass</span>

          <div style={styles.content}>
            <span style={styles.city}>{data.origin_airport}</span>
            <span style={styles.city}>{data.destination_airport}</span>

            <div style={styles.subContent}>
              <div style={styles.infoBox}>
                <span style={styles.label}>PASSENGER NAME</span>
                <span>{data.passenger_first_name} {data.passenger_last_name}</span>
              </div>
              <div style={styles.infoBox}>
                <span style={styles.label}>FLIGHT N&deg;</span>
                <span>{data.flight_number}</span>
              </div>
              <div style={styles.infoBox}>
                <span style={styles.label}>SEAT</span>
                <span>{data.seat_number}</span>
              </div>
              <div style={styles.infoBox}>
                <span style={styles.label}>BOARDING TIME</span>
                <span>{new Date(data.departure_time).toLocaleTimeString()}</span>
              </div>
              <div style={styles.infoBox}>
                <span style={styles.label}>ARRIVAL TIME</span>
                <span>{new Date(data.arrival_time).toLocaleTimeString()}</span>
              </div>
              <div style={styles.infoBox}>
                <span style={styles.label}>TICKET NUMBER</span>
                <span>{data.ticket_number}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Link to={`/CustomerPanel/${id}`}>
          <button style={styles.button}>Back to Main</button>
        </Link>
      </div>
    </div>
  );
};

// CSS styles in JavaScript Object format
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f4f8',
    padding: '20px',
  },
  box: {
    position: 'relative',
    backgroundColor: '#fff',
    borderRadius: '15px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    width: '90%',
    maxWidth: '600px',
    padding: '20px',
    overflow: 'hidden',
  },
  dashedLineLeft: {
    position: 'absolute',
    left: '0',
    top: '10px',
    bottom: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '0 5px',
    listStyle: 'none',
  },
  dashedLineRight: {
    position: 'absolute',
    right: '0',
    top: '10px',
    bottom: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '0 5px',
    listStyle: 'none',
  },
  dash: {
    width: '2px',
    height: '10px',
    backgroundColor: '#bbb',
    marginBottom: '5px',
  },
  ticket: {
    textAlign: 'center',
    padding: '20px',
  },
  airline: {
    display: 'block',
    fontSize: '1.5em',
    fontWeight: 'bold',
    color: '#0056b3',
  },
  airlineSlip: {
    fontSize: '1.2em',
    color: '#007bff',
    marginTop: '5px',
  },
  boarding: {
    marginTop: '10px',
    fontSize: '1.3em',
    color: '#444',
  },
  content: {
    marginTop: '20px',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '15px',
    textAlign: 'left',
  },
  city: {
    fontSize: '2em',
    fontWeight: 'bold',
    color: '#333',
  },
  subContent: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px',
    marginTop: '20px',
  },
  infoBox: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '10px',
    backgroundColor: '#f9f9f9',
  },
  label: {
    fontSize: '0.9em',
    color: '#888',
    marginBottom: '5px',
  },
  button: {
    marginTop: '40px',
    padding: '10px 20px',
    fontSize: '1em',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default BoardingPass;
