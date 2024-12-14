import React from "react";
import { Nav, NavLink, NavMenu, NavBtn, NavBtnLink } from "./NavbarElements";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

const Navbar = () => {
  return (
    <Nav>
      <NavLink to="/">
        <img
          src={require("../../images/logo.png")}
          alt="logo"
          style={{ width: "100px", height: "80px" }}
        />
      </NavLink>
      <NavMenu>
        <NavLink to="/BookTicket">Book Flights</NavLink>
        <NavLink to="/CustomerSignin">Booking Details</NavLink>
        <NavLink to="/CustomerSignin">Previous Flights</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact-us">Contact</NavLink>
      </NavMenu>
      <NavBtn>
        <Dropdown>
          <Dropdown.Toggle
            id="dropdown-basic"
            style={{ fontSize: '16px', height: '40px' }}
          >
            Login
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>
              <Link to="/sign-up" style={{ textDecoration: 'none' }}>Sign Up</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to="/CustomerSignin" style={{ textDecoration: 'none' }}>Sign In</Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <NavBtnLink to="/signin">Admin</NavBtnLink>
      </NavBtn>
    </Nav>
  );
};

export default Navbar;
