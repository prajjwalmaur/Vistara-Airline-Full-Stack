import React from 'react'
import {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import Sidebar from './Sidebar';
import './styles/Tables.css'
const Ticket = () => {
  const [data,setData]=useState([]);
  
  const loadData =async()=>{
    const response= await Axios.get('http://localhost:5000/ticket/api/get');
    console.log(response.data);
    setData(response.data);
  }

  useEffect(()=>{
    loadData();
  },[]);

  
  return (
    <>
      <Sidebar/>
      <div>
      <button style={{width:"120px", marginLeft:"810px",visibility:"hidden"}} className='btn btn-client'></button>
        <table className='styled-table'>
          <thead>
            <tr>
              <th style={{textAlign:'center'}}>S. No</th>
              <th style={{textAlign:'center'}}>Ticket ID</th>
              <th style={{textAlign:'center'}}>Passenger ID</th>
              <th style={{textAlign:'center'}}>Flight ID</th>
              <th style={{textAlign:'center'}}>Booking date </th>
              <th style={{textAlign:'center'}}>Payment ID</th>
              <th style={{textAlign:'center'}}>Seat No.</th>
              <th style={{textAlign:'center'}}>Status</th>
              {/* <th style={{textAlign:'center'}}>Action</th> */}
            </tr>
            </thead>
            <tbody>
              {data.map((item,index)=>{
                return(
                  <tr key={index}>
                    <th scope='row'>{index+1}</th>
                    <td>{item.booking_id}</td>
                    <td>{item.passenger_id}</td>
                    <td>{item.flight_id}</td>
                    <td>{item.booking_date}</td>
                    <td>{item.payment_id}</td>
                    <td>{item.seat_number}</td>
                    <td>{item.booking_status}</td>
                    {/* <td>
                      <Link to={`/UpdateTicket/${item.booking_id}`}>
                        <button className='btn btn-edit'>Edit</button>
                      </Link>
                    </td> */}
                  </tr>
                )
              })}
            </tbody>
        </table>

      </div>
    </>
  )
}

export default Ticket