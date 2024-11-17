import React, { useEffect, useState } from "react";
import { FaUsers, FaGraduationCap, FaPlane, FaTrophy } from "react-icons/fa";
import { GiAchievement } from "react-icons/gi";
import success1 from '../../../Asset/success1.jpg';
import success2 from '../../../Asset/success2.jpg';
import './WeProcess.css';  // Import the CSS file

const statsData = [
  {
    label: "Years of Experience",
    value: 13,
    icon: <GiAchievement size={50} color="#4caf50" />,
  },
  {
    label: "Counselled Students",
    value: 100,
    icon: <FaUsers size={50} color="#2196f3" />,
  },
  {
    label: "Admissions Secured",
    value: 100,
    icon: <FaGraduationCap size={50} color="#ff9800" />,
  },
  {
    label: "Visas Processed",
    value: 100,
    icon: <FaPlane size={50} color="#673ab7" />,
  },
  {
    label: "Success Rate",
    value: 90,
    suffix: "%",
    icon: <FaTrophy size={50} color="#f44336" />,
  },
];

const Counter = ({ value, suffix }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const increment = value / 100; // Animation duration: ~2 seconds
    let current = 0;

    const interval = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(interval);
      } else {
        setCount(Math.ceil(current));
      }
    }, 20);

    return () => clearInterval(interval);
  }, [value]);

  return (
    <span className="stat-counter">
      {count}
      {suffix}
    </span>
  );
};

const WeProcess = () => {
  return (
    <div className="we-process-container">
      {/* Header Section */}
      <div className="header-section">
        <h1>Why Choose Us?</h1>
        <p>Trusted by thousands to guide their international education journey.</p>
      </div>

      {/* Stats Section */}
      <div className="container d-flex flex-wrap justify-content-around align-items-center">
        {statsData.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <Counter value={stat.value}  suffix={stat.suffix || "+"} />
            <p>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Graphics Section */}
      <div className="graphics-section">
        <h2>Empowering Success, One Step at a Time</h2>
        <p>
          From personalized counselling to successful visa processing, we are here to guide you.
        </p>
        <div className="image-container">
          <img src={success1} alt="Counselling" />
          <img src={success2} alt="Admissions" />
        </div>
      </div>
    </div>
  );
};

export default WeProcess;
