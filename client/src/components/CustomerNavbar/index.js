import React,{useState,useEffect} from 'react'
import {useParams,Link} from 'react-router-dom';
import Axios from 'axios';
import {
    Nav,
    NavLink,
    NavMenu,
    NavBtn,
    NavBtnLink
  } from '../Navbar/NavbarElements';
const CustomerNavbar = () => {
    const {id}=useParams();
  return (
    <div>
        <Nav>
            <NavMenu>
            <NavLink to={`/ViewProfile/${id}`} >
                View Profile
            </NavLink>
            <NavLink to={`/BookTicket/${id}`} >
                Book Flight
            </NavLink>
            <NavLink to={`/ViewCustomerTickets/${id}`} >
                View Tickets
            </NavLink>
            <NavLink to={`/AddReviews/${id}`} >
            Suggestion
            </NavLink>
            <NavLink to={`/contact-us`} >
            Contact us
            </NavLink>
            <NavLink to={`/about`} >
            About US
            </NavLink>
            <NavLink to={`/AddReviews/${id}`} >
            Ask Question
            </NavLink>
            </NavMenu> 
            <NavBtn>
                <NavBtnLink to='/' style={{marginLeft:'550px'}}>Logout</NavBtnLink>
            </NavBtn>
        </Nav>
    </div>
  )
}

export default CustomerNavbar