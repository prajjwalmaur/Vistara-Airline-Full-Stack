import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const BookTicket = () => {
  const history = useHistory();
  const { id } = useParams();

  // State for form inputs
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [flightClass, setFlightClass] = useState("Economy");
  const [price, setPrice] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch airport data
  const loadData = async () => {
    try {
      const response = await Axios.get("http://localhost:5000/airport/api/get");
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error loading airport data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Handlers for each input
  const handleDepartureChange = (e) => setDeparture(e.target.value);
  const handleArrivalChange = (e) => setArrival(e.target.value);
  const handleDepartureDateChange = (e) => setDepartureDate(e.target.value);
  const handleReturnDateChange = (e) => setReturnDate(e.target.value);
  const handleClassChange = (e) => setFlightClass(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);

  // Submit handler
  const onSubmit = async (e) => {
    e.preventDefault();

    const jsonData = {
      departure,
      arrival,
      departureDate,
      returnDate,
      class: flightClass,
      price,
    };

    console.log(jsonData);
    

    // try {

      document.cookie = `flightBooking=${encodeURIComponent(
        JSON.stringify(jsonData)
      )}; path=/; max-age=${7 * 24 * 60 * 60}`;
      history.push(`/AvailableFlights/${id}`);

      // const response = await Axios.post("http://localhost:5000/BookTicket", jsonData);
      // if (!response.data.err) {
      //   // Save to cookie
        

      //   // Redirect to next page
        
      // } else {
      //   console.error("Backend error:", response.data.err);
      // }
    // } catch (error) {
    //   console.error("Error submitting form:", error);
    // }
  };

  // Styling
  const containerStyle = {
    backgroundImage: "url('https://source.unsplash.com/1920x1080/?air-travel')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    padding: "20px",
  };

  const overlayStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: "15px",
    padding: "40px",
    width: "90%",
    maxWidth: "600px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  };

  const inputGroupStyle = { marginBottom: "20px", textAlign: "left" };
  const labelStyle = { fontSize: "16px", fontWeight: "bold", marginBottom: "5px", display: "block" };
  const inputStyle = { width: "100%", padding: "10px", fontSize: "16px", borderRadius: "5px" };
  const selectStyle = { ...inputStyle, backgroundColor: "#fff" };
  const buttonStyle = { backgroundColor: "#28a745", color: "white", padding: "15px", fontSize: "18px", borderRadius: "5px", width: "100%", cursor: "pointer" };

  return (
    <div style={containerStyle}>
      <div style={overlayStyle}>
        <h1>Plan Your Dream Trip</h1>
        <p>Book flights at unbeatable prices. Discover new destinations with comfort and ease.</p>
        {!loading && (
          <form onSubmit={onSubmit}>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Flying From</label>
              <select value={departure} onChange={handleDepartureChange} style={selectStyle}>
                <option value="" disabled>
                  -- Select Airport --
                </option>
                {data.map((item) => (
                  <option key={item.airport_id} value={item.airport_name}>
                    {item.airport_name}
                  </option>
                ))}
              </select>
            </div>

            <div style={inputGroupStyle}>
              <label style={labelStyle}>Flying To</label>
              <select value={arrival} onChange={handleArrivalChange} style={selectStyle}>
                <option value="" disabled>
                  -- Select Airport --
                </option>
                {data.map((item) => (
                  <option key={item.airport_id} value={item.airport_name}>
                    {item.airport_name}
                  </option>
                ))}
              </select>
            </div>

            <div style={inputGroupStyle}>
              <label style={labelStyle}>Departure Date</label>
              <input type="date" value={departureDate} onChange={handleDepartureDateChange} style={inputStyle} />
            </div>

            <div style={inputGroupStyle}>
              <label style={labelStyle}>Return Date</label>
              <input type="date" value={returnDate} onChange={handleReturnDateChange} style={inputStyle} />
            </div>

            <div style={inputGroupStyle}>
              <label style={labelStyle}>Class</label>
              <select value={flightClass} onChange={handleClassChange} style={selectStyle}>
                <option value="Economy">Economy</option>
                <option value="Business">Business</option>
                <option value="First Class">First Class</option>
              </select>
            </div>

            <div style={inputGroupStyle}>
              <label style={labelStyle}>Price</label>
              <select value={price} onChange={handlePriceChange} style={selectStyle}>
                <option  value="1000">1000</option>
                <option value ="2000">2000</option>
                <option value ="3000">3000</option>
                <option value ="4000">4000</option>
              </select>
            </div>

            <button type="submit" style={buttonStyle}>
              Find Flights
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookTicket;
