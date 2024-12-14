import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Axios from 'axios';

const EditCrewAssignment = () => {
  const [flightId, setFlightId] = useState('');
  const [crewId, setCrewId] = useState('');
  const { id } = useParams();
  const history = useHistory();

  // Fetch existing assignment data if ID is provided
  useEffect(() => {
    if (id) {
      Axios.get(`http://localhost:5000/crew_assignments/api/get/${id}`)
        .then((resp) => {
          const assignment = resp.data[0];
          setFlightId(assignment.flight_id);
          setCrewId(assignment.crew_id);
        })
        .catch((error) => console.error("Error fetching assignment:", error));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:5000/crew_assignments/api/save', {
      assignment_id: id,
      flight_id: flightId,
      crew_id: crewId,
    })
      .then(() => {
        alert('Assignment saved successfully');
        history.push('/crew-assignments'); // Use history.push to navigate
      })
      .catch((error) => console.error("Error saving assignment:", error));
  };

  return (
    <div className="container" style={{ marginTop: '50px' }}>
      <h2>{id ? 'Edit' : 'Add'} Crew Assignment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Flight ID:</label>
          <input
            type="text"
            value={flightId}
            onChange={(e) => setFlightId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Crew ID:</label>
          <input
            type="text"
            value={crewId}
            onChange={(e) => setCrewId(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-save">
          {id ? 'Update' : 'Add'}
        </button>
      </form>
    </div>
  );
};

export default EditCrewAssignment;
