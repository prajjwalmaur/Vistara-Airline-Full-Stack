import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import "./styles/AddEdit.css";
import Axios from "axios";
import { toast } from "react-toastify";
const initialState = {
  flight_id: "",
  flight_number: "",
  departure_time: "",
  arrival_time: "",
  origin: "",
  destination: "",
  plane_id: "",
  status: "",
};
const AddFlight = () => {
  const [state, setState] = useState(initialState);
  const {
    flight_id,
    flight_number,
    departure_time,
    arrival_time,
    origin,
    destination,
    plane_id,
    status,
  } = state;

  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !flight_id ||
      !flight_number ||
      !departure_time ||
      !arrival_time ||
      !origin ||
      !destination ||
      !plane_id ||
      !status
    )
      toast.error("Required Fields are empty");
    else {
      Axios.post("http://localhost:5000/flight/api/post", {
        flight_id,
        flight_number,
        departure_time,
        arrival_time,
        origin,
        destination,
        plane_id,
        status,
      })
        .then((response) => {
          setState({
            flight_id: "",
            flight_number: "",
            departure_time: "",
            arrival_time: "",
            origin: "",
            destination: "",
            plane_id: "",
            status: "",
          });
          if (response.data.err) console.log(response.data.err);
        })
        .catch((err) => toast.error(err.response.data));
      toast.success("Flight Added Successfully");

      setTimeout(() => history.push("/Flight"), 500);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };
  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "600px",
          alignContent: "center",
          backgroundColor: "grey",
          borderRadius: "10px",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="flight-no">Flight ID</label>
        <input
          type="text"
          name="flight_id"
          value={flight_id}
          placeholder="Flight ID"
          required
          onChange={handleInputChange}
        />

        <label htmlFor="flight-no">Flight No</label>
        <input
          type="text"
          name="flight_number"
          value={flight_number}
          placeholder="Flight No"
          required
          onChange={handleInputChange}
        />

        <label htmlFor="schedule-id">Departure Date and Time </label>
        <input
          type="text"
          name="departure_time"
          value={departure_time}
          placeholder="Departure Date and Time"
          onChange={handleInputChange}
        />
        <label htmlFor="schedule-id">Arrival Date and Time</label>
        <input
          type="text"
          name="arrival_time"
          value={arrival_time}
          placeholder="Arrival Date and Time"
          onChange={handleInputChange}
        />
        <label htmlFor="schedule-id">Origin</label>
        <input
          type="text"
          name="origin"
          value={origin}
          placeholder="Origin"
          onChange={handleInputChange}
        />
        <label htmlFor="schedule-id">Destination</label>
        <input
          type="text"
          name="destination"
          value={destination}
          placeholder="Destination"
          onChange={handleInputChange}
        />
        <label htmlFor="schedule-id">Plan ID</label>
        <input
          type="text"
          name="plane_id"
          value={plane_id}
          placeholder="Plane ID"
          onChange={handleInputChange}
        />
        <label htmlFor="schedule-id">Status</label>
        <input
          type="text"
          name="status"
          value={status}
          placeholder="Status"
          onChange={handleInputChange}
        />
        <input type="submit" value="Add" />
        <Link to="/Flight">
          <input type="button" value="Back"></input>
        </Link>
      </form>
    </div>
  );
};

export default AddFlight;
