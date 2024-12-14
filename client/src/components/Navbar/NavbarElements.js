import { FaBars } from 'react-icons/fa';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.nav`
  background: #fff;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  width: 100%;
  z-index: 10;
  box-shadow: 0px 1px 10px #999;
`;

export const NavLink = styled(Link)`
  font-size: 18px;
  color: #000;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  cursor: pointer;
  transition: color 0.3s ease-in-out;

  &.active {
    color: #15cdfc;
  }

  &:hover {
    color: #256ce1;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavBtn = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #256ce1;
  padding: 8px 16px;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    background: #fff;
    color: #256ce1;
    border: 1px solid #256ce1;
  }
`;

export const DropdownContainer = styled.div`
  @media (max-width: 768px) {
    margin-right: 10px;
  }
`;
