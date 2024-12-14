import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Axios from "axios";
import "./styles/Tables.css";
import Cookies from "js-cookie";
const initialState={
  fb_id:"",
  departure:"",
  arrival:"",
  departureDate:"",
  returnDate:"",
  class:"",
  price:"",
}

const getBookingData = () => {
  const cookies = document.cookie
    .split("; ")
    .find((row) => row.startsWith("flightBooking="));
  
  if (cookies) {
    const data = cookies.split("=")[1];
    return JSON.parse(decodeURIComponent(data)); // Parse JSON string back to object
  }
  return null;
};

const AvailableFlights = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {

    const booking = getBookingData();
  console.log(booking);

    initialState.departure=booking.departure;
    initialState.arrival=booking.arrival;
    initialState.departureDate=booking.departureDate;
    initialState.returnDate=booking.returnDate;
    initialState.class=booking.class;
    initialState.price=booking.price;

    


    console.log('return: ' + initialState.returnDate)


    

    const Returnresponse=await Axios.post("http://localhost:5000/AvailableFlights",{
      departureDate:initialState.departureDate,
      departure:initialState.departure,
      arrival:initialState.arrival,
      returnDate:initialState.returnDate,
      fares:initialState.price,
    });
    console.log(Returnresponse.data)
    setData(Returnresponse.data)
    
  };



  useEffect(() => {
    loadData();
  }, []);
  const { id } = useParams();


  const voidFunc=()=>{

  }
  return (
    <div className="bg-pic">
      <button
        style={{ width: "120px", marginLeft: "810px", visibility: "hidden" }}
        className="btn btn-client"
      ></button>
      <table className="styled-table">
        <thead>
          <tr >
            <th style={{ textAlign: "center" }}>Flight ID</th>
            <th style={{ textAlign: "center" }}>Flight Number</th>
            <th style={{ textAlign: "center" }}>Departure Time</th>
            <th style={{ textAlign: "center" }}>Arrival Time</th>
            <th style={{ textAlign: "center" }}>FROM</th>
            <th style={{ textAlign: "center" }}>Destination</th>
            <th style={{ textAlign: "center" }}>Flight Status</th>
            <th style={{ textAlign: "center" }}>Origin Airport</th>
            <th style={{ textAlign: "center" }}>Destination Aairport</th>
            <th style={{ textAlign: "center" }}>Origin_city</th>
            <th style={{ textAlign: "center" }}>MODEL</th>
            <th style={{ textAlign: "center" }}>MAX Seat</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr style={{backgroundColor:'white'}} key={index}>
                <td>{item.flight_id}</td>
                <td>{item.flight_number}</td>
                <td>{item.departure_time}</td>
                <td>{item.arrival_time}</td>
                <td>{item.destination}</td>
                <td>$ {item.status}</td>
                <td>$ {item.origin_airport_name}</td>
                <td>$ {item.destination_airport_name}</td>
                <td>$ {item.origin_city}</td>
                <td>$ {item.plane_model}</td>
                <td>$ {item.plane_capacity}</td>
                <td>$ {item.plane_manufacturer}</td>
                <td>
                  <Link to={id>0 ? `/Invoice/${item.flight_id+"-"+id}` :  '/CustomerSignin'}>
                    <button className={id>0 ? "btn btn-book" : "btn btn-login"}  style={{fontSize:'18px'}}>
                      {id>0 ? "Book" : "Login"}
                    </button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AvailableFlights;
