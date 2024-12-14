import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Axios from 'axios';

const CrewAssignmentsList = () => {
  const [assignments, setAssignments] = useState([]);
  const [crewList, setCrewList] = useState([]);
  const history = useHistory();

  // Fetch Crew Assignments
  useEffect(() => {
    Axios.get('http://localhost:5000/crew_assignments/api/get')
      .then((resp) => setAssignments(resp.data))
      .catch((error) => console.error("Error fetching assignments:", error));
  }, []);

  // Fetch Crew Members
  useEffect(() => {
    Axios.get('http://localhost:5000/crew/api/get')
      .then((resp) => setCrewList(resp.data))
      .catch((error) => console.error("Error fetching crew:", error));
  }, []);

  const handleEditCrew = (id) => {
    history.push(`/edit-crew/${id}`);
  };

  return (
    <div className="container" style={{ marginTop: '50px' }}>
      <h2>Crew Assignments</h2>
      {assignments.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Assignment ID</th>
              <th>Flight Number</th>
              <th>Crew Name</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment) => (
              <tr key={assignment.assignment_id}>
                <td>{assignment.assignment_id}</td>
                <td>{assignment.flight_number}</td>
                <td>{`${assignment.first_name} ${assignment.last_name}`}</td>
                <td>{assignment.role}</td>
                <td>
                  <button className="btn btn-edit" onClick={() => handleEditCrew(assignment.assignment_id)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No assignments found</p>
      )}
      <Link to="/edit-crew">
        <button className="btn btn-add">Add New Assignment</button>
      </Link>
      <h2>Crew Members</h2>
      {crewList.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Crew ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {crewList.map((crew) => (
              <tr key={crew.crew_id}>
                <td>{crew.crew_id}</td>
                <td>{crew.first_name}</td>
                <td>{crew.last_name}</td>
                <td>{crew.role}</td>
                <td>
                  <button className="btn btn-edit" onClick={() => handleEditCrew(crew.crew_id)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No crew members found</p>
      )}

      <button className="btn btn-add" onClick={() => history.push('/add-crew')}>Add New Crew Member</button>
    </div>
  );
};

export default CrewAssignmentsList;
