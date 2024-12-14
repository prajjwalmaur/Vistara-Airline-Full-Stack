import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import "./styles/AddEdit.css";
import Axios from "axios";
import { toast } from "react-toastify";
const initialState = {
  passenger_id: "",
  first_name: "",
  last_name: "",
  phone_number: "",
  email: "",
  passport_no: "",
  dateofbirth : ""
};
const AddEditClient = () => {
  const [state, setState] = useState(initialState);
  const { passenger_id, first_name, last_name, phone_number, email, passport_no, dateofbirth } = state;

  const history = useHistory();

  const { id } = useParams();

  useEffect(() => {
    Axios
      .get(`http://localhost:5000/api/get/${id}`)
      .then((resp) => setState({ ...resp.data[0] }));
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !passenger_id ||
      !first_name ||
      !last_name ||
      !phone_number ||
      !email ||
      !passport_no ||
      !dateofbirth
    )
      toast.error("Required Fields are empty");
    else {
      if(!id)
      {

        Axios
          .post("http://localhost:5000/api/post", {
            passenger_id,
            first_name,
            last_name,
            email,
            phone_number,
            passport_no,
            dateofbirth,
          })
          .then((response) => {
            setState({
              passenger_id: "",
              first_name: "",
              last_name: "",
              email: "",
              phone_number: "",
              passport_no: "",
              dateofbirth :"",
            });
            if(response.data.err)
            console.log(response.data.err)
          })
          .catch((err) => toast.error(err.response.data));
          toast.success('Client Added Successfully');
      }
      else{
        Axios
          .put(`http://localhost:5000/api/update/${id}`, {
            passenger_id,
            first_name,
            last_name,
            email,
            phone_number,
            passport_no,
            dateofbirth,
          })
          .then((response) => {
            setState({
              passenger_id: "",
              first_name: "",
              last_name: "",
              email: "",
              phone_number: "",
              passport_no: "",
              dateofbirth:"",
            });
            if(response.data.err)
            console.log(response.data.err)
          })
          .catch((err) => toast.error(err.response.data));
          toast.success('Client Updated Successfully');
      }
      setTimeout(() => history.push("/Client"), 500);
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
        <label htmlFor="client-id">Client ID</label>
        <input
          type="text" name="passenger_id" value={passenger_id || ""}
          placeholder="ID"
          required
          onChange={handleInputChange}
        />

        <label htmlFor="first_name">First Name</label>
        <input
          type="text" name="first_name" value={first_name || ""}
          placeholder="First Name"
          onChange={handleInputChange}
        />

        <label htmlFor="last_name">Last Name</label>
        <input
          type="text" name="last_name" value={last_name || ""}
          placeholder="Last Name"
          onChange={handleInputChange}
        />

        <label htmlFor="phone_number">phone_number</label>
        <input
          type="number" name="phone_number" value={phone_number || ""}
          placeholder="phone_number"
          onChange={handleInputChange}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email" name="email" value={email || ""}
          placeholder="Email"
          onChange={handleInputChange}
        />

        <label htmlFor="passport_no">passport_no</label>
        <input
          type="text" name="passport_no" value={passport_no || ""}
          placeholder="passport_no"
          onChange={handleInputChange}
        />
        <label htmlFor="passport_no">Date of Birth</label>
        <input
          type="date" name="dateofbirth" value={dateofbirth || ""}
          placeholder="dd/mm/yyyy"
          onChange={handleInputChange}
        />
        <input type="submit" value={id ? "Update" : "Add"} />
        <Link to="/Client">
          <input type="button" value="Back"></input>
        </Link>
      </form>
    </div>
  );
};

export default AddEditClient;
