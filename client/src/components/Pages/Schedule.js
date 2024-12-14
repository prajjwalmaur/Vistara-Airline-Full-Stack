import React from 'react'
import {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import {toast} from 'react-toastify';
import Sidebar from './Sidebar';
import './styles/Tables.css'
const Schedule = () => {
  const [data,setData]=useState([]);
  
  const loadData =async()=>{
    const response= await Axios.get('http://localhost:5000/schedule/api/get');
    setData(response.data);
  }

  useEffect(()=>{
    loadData();
  },[]);


  const delSchedule=(id)=>{
    console.log(id)
    if(window.confirm('Do you really want to delete Schedule with Flight ID '+ id +'?'))
    {
      Axios.delete(`http://localhost:5000/schedule/api/remove/${id}`);
      toast.success('Flight deleted successfully!');
      setTimeout(()=> loadData(),500);
    }

  }
  
  return (
    <>
      <Sidebar/>
      <div>
        <Link to='/AddEditSchedule'>
          <button style={{width:"120px", marginLeft:"620px"}} className='btn btn-client'>Add Schedule</button>
        </Link>
        <table className='styled-table'>
          <thead>
            <tr>
              <th style={{textAlign:'center'}}>S. No</th>
              <th style={{textAlign:'center'}}>Flight ID</th>
              <th style={{textAlign:'center'}}>Departure Time</th>
              <th style={{textAlign:'center'}}>Arrival Time</th>
              <th style={{textAlign:'center'}}>Action</th>
            </tr>
            </thead>
            <tbody>
              {data.map((item,index)=>{
                return(
                  <tr key={index}>
                    <th scope='row'>{index+1}</th>
                    <td>{item.flight_id}</td>
                    <td>{item.departure_time}</td>
                    <td>{item.arrival_time}</td>
                    <td>
                      <Link to={`/UpdateSchedule/${item.flight_id}`}>
                        <button className='btn btn-edit'>Edit</button>
                      </Link>
                        <button className='btn btn-delete' onClick={()=> delSchedule(item.flight_id)}>Delete</button>
                      <Link to={`/ViewSchedule/${item.flight_id}`}>
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

export default Schedule