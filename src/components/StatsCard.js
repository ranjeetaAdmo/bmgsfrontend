import React from 'react';
import * as FaIcons from 'react-icons/fa';
import './styles/Dashboard.css';

const StatsCard = ({ title, value, icon }) => {
  const IconComponent = FaIcons[icon];

  return (
    <div className="cards">
      <div className="icon-box">
        {IconComponent && <IconComponent className="card-icon" />}
      </div>
      <div>
        <h4>{title}</h4>
        <p>{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;
