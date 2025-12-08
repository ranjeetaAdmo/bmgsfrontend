import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

import Sidebar from './Sidebar';
import Header from './Headerbs';
import './styles/Dashboard.css';
import StatsCard from './StatsCard';

const Dashboard = () => {

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const auth = useContext(AuthContext);
  useEffect(() => {
    const checkScreenSize = () => {

      if (window.innerWidth <= 767) {
        setIsMobile(true);
        setIsCollapsed(true);
      } else {
        setIsMobile(false);
      }
    };
    checkScreenSize(); 
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  if (!auth) return <p>AuthContext not available</p>;

  const { user, loading } = auth;

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/" />;
  if (user.role !== "admin") return <Navigate to="/question" />;


  // ⭐ Toggle button only works on DESKTOP ⭐
  const toggleSidebar = () => {
    if (!isMobile) {
      setIsCollapsed(prev => !prev);
    }
  };


  return (
    <div className="dashboard-container">

      <Sidebar isCollapsed={isCollapsed} isMobile={isMobile} toggleSidebar={toggleSidebar} />

      <div className={`main-content ${isCollapsed ? 'collapsed' : ''}`}>
        <Header toggleSidebar={toggleSidebar} isMobile={isMobile} />

        <div className="cards-container">
          <StatsCard title="Total Users" value="1,245" icon="FaUsers" />
          <StatsCard title="Revenue" value="$8,430" icon="FaDollarSign" />
          <StatsCard title="Orders" value="74" icon="FaBox" />
          <StatsCard title="Feedbacks" value="23" icon="FaComments" />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
