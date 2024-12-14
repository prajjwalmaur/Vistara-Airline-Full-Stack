import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Axios from "axios";
import Swall from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const initialState = {
  flight_id: "",
  passenger_id: "",
  price: "",
};

const Invoice = () => {
  const Swal = withReactContent(Swall);
  const { id } = useParams();
  const [data, setData] = useState({});
  const [user, setUser] = useState({});
  const history = useHistory();

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

  const loadData = async () => {
    const booking = getBookingData();
    setUser(booking);
    initialState.departure = booking?.departure || "";
  };

  useEffect(() => {
    initialState.flight_id = id.split("-")[0];
    initialState.passenger_id = id.split("-")[1];
    Axios.get(`http://localhost:5000/invoice/${initialState.passenger_id}`).then((resp) =>
      setData({ ...resp.data[0] })
    );
    loadData();
  }, [id]);

  const foo = async () => {
    await Axios.post("http://localhost:5000/invoiceconfirm", {
      flight_id: initialState.flight_id,
      departure: user.departure,
      passenger_id: initialState.passenger_id,
      price: user.price,
      class: user.class,
    });

    Swal.fire("Ticket Booked Successfully!", "", "success");
    setTimeout(() => history.push(`/BoardingPass/${id.split("-")[1] + "-" + initialState.flight_id}`), 500);
  };

  // Inline CSS for styling
  const styles = {
    bgImage: {
      backgroundImage: "url('https://source.unsplash.com/1600x900/?travel')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
    },
    card: {
      width: "600px",
      border: "none",
      borderRadius: "15px",
      overflow: "hidden",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
      background: "white",
    },
    header: {
      display: "flex",
      padding: "20px",
      alignItems: "center",
      borderBottom: "1px solid #ddd",
    },
    logo: {
      width: "50px",
      height: "50px",
    },
    name: {
      fontSize: "20px",
      fontWeight: "bold",
      marginLeft: "20px",
    },
    details: {
      padding: "20px",
    },
    totalAmount: {
      display: "flex",
      alignItems: "center",
      marginBottom: "20px",
    },
    amount: {
      fontSize: "24px",
      fontWeight: "bold",
      marginLeft: "20px",
    },
    button: {
      backgroundColor: "#007bff",
      color: "white",
      padding: "10px 20px",
      fontSize: "18px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      width: "100%",
    },
  };

  return (
    <div style={styles.bgImage}>
      <div style={styles.card}>
        <div style={styles.header}>
          <img
            src="https://img.icons8.com/color/48/000000/airplane-take-off.png"
            alt="Airline Logo"
            style={styles.logo}
          />
          <span style={styles.name}>
            {data.first_name} {data.last_name}
          </span>
        </div>
        <div style={styles.details}>
          <div style={styles.totalAmount}>
            <input type="radio" checked readOnly />
            <span style={styles.amount}>Total Amount: ${user.price}</span>
          </div>
          <div>
            <button onClick={foo} style={styles.button}>
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
