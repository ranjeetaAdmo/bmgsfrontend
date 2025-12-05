import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import './styles/Dashboard.css'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Header = ({ toggleSidebar }) => {

  const [showUserPopup, setShowUserPopup] = useState(false);

  const toggleUserPopup = () => {
    setShowUserPopup(prev => !prev);
  };
 
 const navigate = useNavigate();
 const handleLogout = async () => {
  try {
    await axios.post(`${process.env.REACT_APP_API_URL}/logout`, {}, { withCredentials: true });

      localStorage.removeItem("user");

      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Logout failed. Try again.");
    }
  };

  return (
    <div className="headers">
      <div className="left-section">
        {/* Removed BGMS + hamburger (structure same) */}
      </div>

      <div className="right-section">
        <div className="user-icon-wrapper">
          <FaUserCircle className="icon user-icon" onClick={toggleUserPopup} />

          {showUserPopup && (
            <div className="user-popup professional">
              <div className="user-info">
                <div className="avatar-circle">
                  <FaUserCircle className="popup-user-avatar" />
                </div>
                <div className="user-details">
                  <span className="user-name">Admin</span>
                </div>
              </div>
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
