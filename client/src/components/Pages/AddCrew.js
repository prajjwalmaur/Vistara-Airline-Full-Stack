import React, { useState } from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

const AddCrew = () => {
  const [crewId, setCrewId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');
  const history = useHistory();

  const handleAddCrew = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:5000/crew/api/add', {
      crew_id: crewId,
      first_name: firstName,
      last_name: lastName,
      role: role,
    })
      .then(() => {
        alert('Crew member added successfully');
        history.push('/crew-assignments');
      })
      .catch((error) => console.error("Error adding crew:", error));
  };

  return (
    <div className="container" style={{ marginTop: '50px' }}>
      <h2>Add New Crew Member</h2>
      <form onSubmit={handleAddCrew}>
        <div>
          <label>Crew ID:</label>
          <input
            type="text"
            value={crewId}
            onChange={(e) => setCrewId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Role:</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-save">Add Crew</button>
      </form>
    </div>
  );
};

export default AddCrew;
