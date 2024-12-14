import React from 'react';
import {Link} from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import './styles/Sidebar.css'
const Sidebar=() => {
  return (
    <Menu>
      <Link className="menu-item" to="/AdminPanel">
        Home
      </Link>
      <Link className="menu-item" to="/Client">
        Clients
      </Link>
      <Link className="menu-item" to="/Airplane">
        Airplane
      </Link>
      <Link className="menu-item" to="/FlightStatus">
        Flight Status
      </Link>
      <Link className="menu-item" to="/Airport">
        Airport
      </Link>
      <Link className="menu-item" to="/Reviews">
        Reviews
      </Link>
      <Link className="menu-item" to="/Schedule">
        Schedule
      </Link>
      <Link className="menu-item" to="/Flight">
        Flight
      </Link>
      <Link className="menu-item" to="/Ticket">
        Ticket
      </Link>
      <Link className="menu-item" to="/Booking">
        Booking
      </Link>
      <Link className="menu-item" to="/crew-assignments">
        Crew
      </Link>
      <Link className="menu-item" to="/about">
        About US
      </Link>
      <Link className="menu-item" to="/contact-us">
        Contact US
      </Link>
      <Link className="menu-item" to="/#">
        Complains
      </Link>
      <Link className="menu-item" to="/#">
        Stocks
      </Link>
      <Link className="menu-item" to="/#">
        Company
      </Link>
      <Link className="menu-item" to="/#">
        IT Support 📞📞📞
      </Link>
      <Link className="menu-item" to="/#">
        Mangement
      </Link>
      <Link className="menu-item" to="/#">
        Quries
      </Link>
      <Link className="menu-item" to="/#">
        FAQs 
      </Link>
    </Menu>
  );
};

export default Sidebar;