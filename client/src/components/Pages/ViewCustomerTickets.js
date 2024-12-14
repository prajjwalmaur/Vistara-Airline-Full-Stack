import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Axios from "axios";
import "./styles/Tables.css";

const ViewCustomerTickets = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();

  const loadData = async () => {
    const response = await Axios.get(`http://localhost:5000/api/getTickets/${id}`);
    setData(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div className="bg-tasweer">
        <Link to={`/CustomerPanel/${id}`}>
          <button className='btn btn-client' style={{backgroundColor:'blue',color:'white',width:'120px',marginLeft:'760px'}}>Back to Main</button>
        </Link>
        <table className='styled-table'>
          <thead>
            <tr>
              <th style={{textAlign:'center'}}>S. No</th>
              <th style={{textAlign:'center'}}>Payment ID</th>
              <th style={{textAlign:'center'}}>Ticket Number</th>
              <th style={{textAlign:'center'}}>Seat Class</th>
              <th style={{textAlign:'center'}}>Seat No</th>
              <th style={{textAlign:'center'}}>Flight No</th>
              <th style={{textAlign:'center'}}>Departure Time</th>
              <th style={{textAlign:'center'}}>Arrival Time</th>
              <th style={{textAlign:'center'}}>Origin Airport</th>
              <th style={{textAlign:'center'}}>Destination Airport</th>
              <th style={{textAlign:'center'}}>Plane Model</th>
              <th style={{textAlign:'center'}}>Capacity</th>
              <th style={{textAlign:'center'}}>Passenger Name</th>
              <th style={{textAlign:'center'}}>Email</th>
              <th style={{textAlign:'center'}}>Amount Paid</th>
              <th style={{textAlign:'center'}}>Payment Method</th>
              <th style={{textAlign:'center'}}>Booking Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} style={{ backgroundColor: 'white' }}>
                <td>{index + 1}</td>
                <td>{item.payment_id}</td>
                <td>{item.ticket_number}</td>
                <td>{item.seat_class}</td>
                <td>{item.seat_number}</td>
                <td>{item.flight_number}</td>
                <td>{new Date(item.departure_time).toLocaleString()}</td>
                <td>{new Date(item.arrival_time).toLocaleString()}</td>
                <td>{item.origin_airport} ({item.origin_city}, {item.origin_country})</td>
                <td>{item.destination_airport} ({item.destination_city}, {item.destination_country})</td>
                <td>{item.plane_model} by {item.plane_manufacturer}</td>
                <td>{item.plane_capacity}</td>
                <td>{item.passenger_first_name} {item.passenger_last_name}</td>
                <td>{item.passenger_email}</td>
                <td>{item.payment_amount}</td>
                <td>{item.payment_method}</td>
                <td>{item.booking_status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewCustomerTickets;
