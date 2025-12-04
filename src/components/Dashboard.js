import React, { useState ,useContext} from 'react';
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

import Sidebar from './Sidebar';
import Header from './Headerbs';
import './styles/Dashboard.css';
import StatsCard from './StatsCard';

const Dashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const auth = useContext(AuthContext);
  if (!auth) return <p>AuthContext not available</p>;
  const { user, loading } = auth;

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/" />;
  if (user.role !== "admin") return <Navigate to="/question" />;

  const toggleSidebar = () => {
    setIsCollapsed(prev => !prev);
  };

  return (
    <div className="dashboard-container">
      {/* Just added toggleSidebar prop */}
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      <div className={`main-content ${isCollapsed ? 'collapsed' : ''}`}>
        <Header toggleSidebar={toggleSidebar} />
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
