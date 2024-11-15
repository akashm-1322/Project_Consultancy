import React, { useEffect, useState } from "react";
import { FaUsers, FaGraduationCap, FaPlane, FaTrophy } from "react-icons/fa";
import { GiAchievement } from "react-icons/gi";

const statsData = [
  {
    label: "Years of Experience",
    value: 3,
    icon: <GiAchievement size={50} color="#4caf50" />,
  },
  {
    label: "Counselled Students",
    value: 1000,
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
    <span style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#2c3e50" }}>
      {count}
      {suffix}
    </span>
  );
};

const WeProcess = () => {
  return (
    <div style={{ background: "#f9f9f9", minHeight: "100vh", padding: "50px 20px" }}>
      {/* Header Section */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "40px",
          color: "#333",
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            color: "#4caf50",
          }}
        >
          Why Choose Us?
        </h1>
        <p style={{ fontSize: "1.2rem", marginTop: "10px", color: "#555" }}>
          Trusted by thousands to guide their international education journey.
        </p>
      </div>

      {/* Stats Section */}
      <div className="container d-flex flex-wrap justify-content-around align-items-center">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="stat-card shadow"
            style={{
              background: "white",
              borderRadius: "15px",
              padding: "20px",
              textAlign: "center",
              margin: "20px",
              width: "250px",
              transition: "transform 0.3s, box-shadow 0.3s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-10px)";
              e.currentTarget.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 5px 10px rgba(0, 0, 0, 0.1)";
            }}
          >
            <div style={{ marginBottom: "20px" }}>{stat.icon}</div>
            <Counter value={stat.value} suffix={stat.suffix || ""} />
            <p style={{ fontSize: "1.2rem", marginTop: "10px", color: "#555" }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Graphics Section */}
      <div
        style={{
          marginTop: "50px",
          textAlign: "center",
          padding: "30px",
          background: "linear-gradient(135deg, #e0f7fa, #ffffff)",
          borderRadius: "20px",
        }}
      >
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#3f51b5",
            marginBottom: "20px",
          }}
        >
          Empowering Success, One Step at a Time
        </h2>
        <p style={{ fontSize: "1.2rem", color: "#666" }}>
          From personalized counselling to successful visa processing, we are
          here to guide you.
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <img
            src="https://via.placeholder.com/300"
            alt="Counselling"
            style={{
              borderRadius: "15px",
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
            }}
          />
          <img
            src="https://via.placeholder.com/300"
            alt="Admissions"
            style={{
              borderRadius: "15px",
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default WeProcess;
