import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import "./styles/AddEdit.css";
import Axios from "axios";
import { toast } from "react-toastify";
const initialState = {
  plane_id: "",
  model: "",
  capacity: "",
  manufacturer: "",
};
const AddEditAirplane = () => {
  const [state, setState] = useState(initialState);
  const { plane_id, model, capacity, manufacturer } = state;

  const history = useHistory();

  const { id } = useParams();

  useEffect(() => {
    Axios.get(`http://localhost:5000/airplane/api/get/${id}`).then((resp) =>
      setState({ ...resp.data[0] })
    );
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!plane_id || !capacity || !model || !manufacturer)
      toast.error("Required Fields are empty");
    else {
      if (!id) {
        Axios.post("http://localhost:5000/airplane/api/post", {
          plane_id,
          model,
          capacity,
          manufacturer,
        })
          .then((response) => {
            setState({
              plane_id: "",
              model: "",
              capacity: "",
              manufacturer: "",
            });
            if (response.data.err) console.log(response.data.err);
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Airplane Added Successfully");
      } else {
        Axios.put(`http://localhost:5000/airplane/api/update/${id}`, {
          plane_id,
          model,
          capacity,
          manufacturer,
        })
          .then((response) => {
            setState({
              plane_id: "",
              model: "",
              capacity: "",
              manufacturer: "",
            });
            if (response.data.err) console.log(response.data.err);
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Airplane Updated Successfully");
      }
      setTimeout(() => history.push("/Airplane"), 500);
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
        <label htmlFor="airplane-id">Airplane ID</label>
        <input
          type="text"
          name="plane_id"
          value={plane_id || ""}
          placeholder="ID"
          required
          onChange={handleInputChange}
        />

        <input
          type="text"
          name="model"
          value={model || ""}
          placeholder="MODEL"
          required
          onChange={handleInputChange}
        />

        <label htmlFor="max-seats">Max Seats</label>
        <input
          type="number"
          name="capacity"
          value={capacity || ""}
          placeholder="Max Seats"
          onChange={handleInputChange}
        />
        
        <label htmlFor="manufacturer">Max Seats</label>
        <input
          type="text"
          name="manufacturer"
          value={manufacturer || ""}
          placeholder="Manufacturer "
          onChange={handleInputChange}
        />

        <input type="submit" value={id ? "Update" : "Add"} />
        <Link to="/Airplane">
          <input type="button" value="Back"></input>
        </Link>
      </form>
    </div>
  );
};

export default AddEditAirplane;
