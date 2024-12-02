import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DepartmentPage.css"; // Include CSS for styling

const DepartmentPage = () => {
  const [aggregatedData, setAggregatedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const departmentsResponse = await axios.get(
          "http://localhost:5000/api/department"
        );
        const fieldsResponse = await axios.get(
          "http://localhost:5000/api/field?all=true"
        );

        // Grouping departments by name and aggregating subNames
        const groupDepartments = (departments) => {
          const grouped = departments.reduce((acc, curr) => {
            if (!acc[curr.name]) {
              acc[curr.name] = { ...curr, subNames: [curr.subNames] };
            } else {
              acc[curr.name].subNames.push(curr.subNames);
            }
            return acc;
          }, {});

          return Object.values(grouped);
        };

        const departmentsData = groupDepartments(departmentsResponse.data);
        const fieldsData = fieldsResponse.data.fields || { names: [], vacancies: [] };

        console.log("Departments Data:", departmentsData);
        console.log("Fields Data:", fieldsData);

        // Aggregating data to calculate total vacancies
        const aggregated = departmentsData.map((dept) => {
          const combinedData = fieldsData.reduce((acc, field) => {
            field.names.forEach((name, index) => {
              acc.push({ name, vacancy: field.vacancies[index] || 0 });
            });
            return acc;
          }, []);

          const totalVacancies = combinedData.reduce((total, item) => {
            if (item.name === dept.name) {
              return total + item.vacancy;
            }
            return total;
          }, 0);

          return { ...dept, totalVacancies };
        });
        setAggregatedData(aggregated);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="department-container">
      <h1>Departments and Total Vacancies</h1>
      {aggregatedData.length > 0 ? (
        aggregatedData.map((dept) => (
          <div className="department-card" key={dept.name}>
            <h2>{dept.name}</h2>
            <p>
              Total Vacancies:{" "}
              <span className="vacancy-count">{dept.totalVacancies}</span>
            </p>
            <ul>
              {Array.isArray(dept.subNames) &&
                dept.subNames.map((sub, index) => (
                  <li key={index}>{sub}</li>
                ))}
            </ul>
          </div>
        ))
      ) : (
        <div>
          <p>No Data Found</p>
        </div>
      )}
    </div>
  );
};

export default DepartmentPage;
