import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Axios from 'axios';
import './styles/View.css';

const ViewFlight = () => {
  const [flight, setFlight] = useState({});
  const { id } = useParams();

  useEffect(() => {
    Axios.get(`http://localhost:5000/flight/api/get/${id}`)
      .then((resp) => setFlight(resp.data[0]))
      .catch((error) => console.error("Error fetching flight data:", error));
  }, [id]);

  return (
    <div style={{ marginTop: '150px' }}>
      <div className='card'>
        <div className='card-header'>
          <p>Flight Detail</p>
        </div>
        <div className='container'>
          <strong>Flight ID: </strong>
          <span>{flight.flight_id}</span>
          <br/>
          <br/>
          <strong>Flight Number: </strong>
          <span>{flight.flight_number}</span>
          <br/>
          <br/>
          <strong>Departure Time: </strong>
          <span>{new Date(flight.departure_time).toLocaleString()}</span>
          <br/>
          <br/>
          <strong>Arrival Time: </strong>
          <span>{new Date(flight.arrival_time).toLocaleString()}</span>
          <br/>
          <br/>
          <strong>Origin: </strong>
          <span>{flight.origin}</span>
          <br/>
          <br/>
          <strong>Destination: </strong>
          <span>{flight.destination}</span>
          <br/>
          <br/>
          <strong>Plane ID: </strong>
          <span>{flight.plane_id}</span>
          <br/>
          <br/>
          <strong>Status: </strong>
          <span>{flight.status}</span>
          <br/>
          <br/>
          
          <Link to='/Flight'>
            <div className='btn btn-edit'>Back</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ViewFlight;
