import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  FaBars,
  FaTachometerAlt,
  FaUsers,
  FaQuestionCircle,
  FaListAlt
} from 'react-icons/fa';
import './styles/Dashboard.css';

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : 'expanded'}`}>

      {/* Logo & Hamburger*/}
      <div className="sidebar-header">
        {!isCollapsed && <h2 className="logo">BGMS</h2>}
        <FaBars className="toggle-btn" onClick={toggleSidebar} />
      </div>

      <ul className="menu-list">
        <li className={`menu-link${isActive('/dashboard') ? ' active' : ''}`} onClick={() => navigate('/dashboard')}>
          <FaTachometerAlt />
          {!isCollapsed && <span>Dashboard</span>}
        </li>

        <li className={`menu-link${isActive('/users') ? ' active' : ''}`} onClick={() => navigate('/users')}>
          <FaUsers />
          {!isCollapsed && <span>Users</span>}
        </li>

        <li className={`menu-link${isActive('/category') ? ' active' : ''}`} onClick={() => navigate('/category')}>
          <FaListAlt />
          {!isCollapsed && <span>Category</span>}
        </li>

        <li className={`menu-link${isActive('/questions') ? ' active' : ''}`} onClick={() => navigate('/questions')}>
          <FaQuestionCircle />
          {!isCollapsed && <span>Questions</span>}
        </li>

        <li className={`menu-link${isActive('/get-in-touch') ? ' active' : ''}`} onClick={() => navigate('/get-in-touch')}>
          <FaQuestionCircle />
          {!isCollapsed && <span>Get in Touch</span>}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
