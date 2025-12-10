import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaUsers,
  FaBars,
  FaQuestionCircle,
  FaListAlt
} from 'react-icons/fa';
import { MdTouchApp } from "react-icons/md";
import './styles/Dashboard.css';

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Active check: exact match OR sub-route match
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : 'expanded'}`}>
        {/* Logo & Hamburger*/}
      <div className="sidebar-header">
        {!isCollapsed && <h2 className="logo">BMGS</h2>}
        <FaBars className="toggle-btn" onClick={toggleSidebar} />
      </div>

      <ul className="menu-list">
        <li
          className={`menu-link${isActive('/dashboard') ? ' active' : ''}`}
          onClick={() => navigate('/dashboard')}
          style={{ cursor: 'pointer' }}
        >
          <FaTachometerAlt />
          {!isCollapsed && <span>Dashboard</span>}
        </li>

        <li
          className={`menu-link${isActive('/users') ? ' active' : ''}`}
          onClick={() => navigate('/users')}
          style={{ cursor: 'pointer' }}
        >
          <FaUsers />
          {!isCollapsed && <span>Users</span>}
        </li>

        <li
          className={`menu-link${isActive('/category') ? ' active' : ''}`}
          onClick={() => navigate('/category')}
          style={{ cursor: 'pointer' }}
        >
          <FaListAlt />
          {!isCollapsed && <span>Category</span>}
        </li>

        <li
          className={`menu-link${isActive('/questions') ? ' active' : ''}`}
          onClick={() => navigate('/questions')}
          style={{ cursor: 'pointer' }}
        >
          <FaQuestionCircle />
          {!isCollapsed && <span>Questions</span>}
        </li>

        <li
          className={`menu-link${isActive('/get-in-touch') ? ' active' : ''}`}
          onClick={() => navigate('/get-in-touch')}
          style={{ cursor: 'pointer' }}
        >
          <MdTouchApp />
          {!isCollapsed && <span>Get in Touch</span>}
        </li>

      </ul>
    </div>
  );
};

export default Sidebar;
