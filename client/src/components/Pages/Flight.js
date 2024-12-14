import React from 'react'
import {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import {toast} from 'react-toastify';
import Sidebar from './Sidebar';
import './styles/Tables.css'
const Flight = () => {
  const [data,setData]=useState([]);
  
  const loadData =async()=>{
    const response= await Axios.get('http://localhost:5000/flight/api/get');
    setData(response.data);
  }

  useEffect(()=>{
    loadData();
  },[]);


  const delFlight=(id)=>{
    console.log(id)
    if(window.confirm('Do you really want to delete Flight with Flight No '+ id +'?'))
    {
      Axios.delete(`http://localhost:5000/flight/api/remove/${id}`);
      toast.success('Flight deleted successfully!');
      setTimeout(()=> loadData(),500);
    }

  }
  
  return (
    <>
      <Sidebar/>
      <div>
        <Link to='/AddFlight'>
          <button style={{marginLeft:"713px"}} className='btn btn-client'>Add Flight</button>
        </Link>
        <table className='styled-table'>
          <thead>
            <tr>
              <th style={{textAlign:'center'}}>S. No</th>
              <th style={{textAlign:'center'}}>Flight No</th>
              <th style={{textAlign:'center'}}>Departure time </th>
              <th style={{textAlign:'center'}}>Arrival time </th>
              <th style={{textAlign:'center'}}>Origin </th>
              <th style={{textAlign:'center'}}>Destination </th>
              <th style={{textAlign:'center'}}>Airplane ID</th>
              <th style={{textAlign:'center'}}>Stauts</th>
              <th style={{textAlign:'center'}}>Action</th>
            </tr>
            </thead>
            <tbody>
              {data.map((item,index)=>{
                return(
                  <tr key={index}>
                    <th scope='row'>{index+1}</th>
                    <td>{item.flight_number}</td>
                    <td>{item.departure_time}</td>
                    <td>{item.arrival_time}</td>
                    <td>{item.origin}</td>
                    <td>{item.destination}</td>
                    <td>{item.plane_id}</td>
                    <td>{item.status}</td>
                    <td>
                        <button className='btn btn-delete' onClick={()=> delFlight(item.flight_number)}>Delete</button>
                      <Link to={`/ViewFlight/${item.flight_number}`}>
                        <button className='btn btn-view'>View</button>
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
        </table>

      </div>
    </>
  )
}

export default Flight