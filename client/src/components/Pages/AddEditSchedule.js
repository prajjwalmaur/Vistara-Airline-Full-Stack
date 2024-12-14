import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import "./styles/AddEdit.css";
import Axios from "axios";
import { toast } from "react-toastify";
const initialState = {
  flight_id: "",
  departure_time: "",
  arrival_time: "",
};
const AddEditSchedule = () => {
  const [state, setState] = useState(initialState);
  const { flight_id, departure_time, arrival_time } = state;

  const history = useHistory();

  const { id } = useParams();

  useEffect(() => {
    Axios.get(`http://localhost:5000/schedule/api/get/${id}`).then((resp) =>
      setState({ ...resp.data[0] })
    );
    
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!flight_id || !departure_time || !arrival_time)
      toast.error("Required Fields are empty");
    else {
      if (!id) {
        Axios.post("http://localhost:5000/api/post", {
          flight_id,
          departure_time,
          arrival_time,
        })
          .then((response) => {
            setState({
                flight_id: "",
                departure_time: "",
                arrival_time: "",
            });
            if (response.data.err) console.log(response.data.err);
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Schedule Added Successfully");
      } else {
        Axios.put(`http://localhost:5000/schedule/api/update/${id}`, {
            flight_id,
            departure_time,
            arrival_time,
        })
          .then((response) => {
            setState({
                flight_id: "",
                departure_time: "",
                arrival_time: "",
            });
            if (response.data.err) console.log(response.data.err);
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Schedule Updated Successfully");
      }
      setTimeout(() => history.push("/Schedule"), 500);
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
        <label htmlFor="schedule-id">Flight ID</label>
        <input
          type="text"
          name="flight_id"
          value={flight_id || ""}
          placeholder="ID"
          required
          onChange={handleInputChange}
        />

        <label htmlFor="departure-time">Departure Time</label>
        <input
          type="text"
          name="departure_time"
          value={departure_time || ""}
          placeholder="Departure Time"
          onChange={handleInputChange}
        />

        <label htmlFor="arrival-time">Arrival Time</label>
        <input
          type="text"
          name="arrival_time"
          value={arrival_time || ""}
          placeholder="Arrival Time"
          onChange={handleInputChange}
        />

        <input type="submit" value={id ? "Update" : "Add"} />
        <Link to="/Schedule">
          <input type="button" value="Back"></input>
        </Link>
      </form>
    </div>
  );
};

export default AddEditSchedule;
