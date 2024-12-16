import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Paper, List, ListItem } from "@mui/material";

const DepartmentPage = () => {
  const [aggregatedData, setAggregatedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const departmentsResponse = await axios.get(
          "http://localhost:5500/api/department"
        );
        const fieldsResponse = await axios.get(
          "http://localhost:5500/api/field?all=true"
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

  // Inline Styles for Responsive Design
  const styles = {
    container: {
      padding: "20px",
      backgroundColor: "#f4f4f4",
      minHeight: "100vh",
      fontFamily: "'Roboto', sans-serif",
    },
    header: {
      fontSize: "2rem",
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: "20px",
      color: "#333",
    },
    card: {
      backgroundColor: "#fff",
      padding: "15px",
      margin: "10px auto",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.3s ease-in-out",
      width: "90%",
      maxWidth: "600px",
    },
    cardHover: {
      transform: "scale(1.02)",
    },
    title: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "#007bff",
    },
    vacancyCount: {
      fontSize: "1.2rem",
      fontWeight: "bold",
      color: "#e53935",
    },
    list: {
      marginTop: "10px",
      padding: "0",
    },
    listItem: {
      fontSize: "1rem",
      color: "#555",
    },
    noData: {
      textAlign: "center",
      fontSize: "1.2rem",
      color: "#888",
      marginTop: "30px",
    },
  };

  return (
    <Box sx={styles.container}>
      <Typography sx={styles.header}>Departments and Total Vacancies</Typography>

      {aggregatedData.length > 0 ? (
        aggregatedData.map((dept) => (
          <Paper
            key={dept.name}
            elevation={3}
            sx={{
              ...styles.card,
              "&:hover": styles.cardHover,
            }}
          >
            <Typography sx={styles.title}>{dept.name}</Typography>
            <Typography>
              Total Vacancies:{" "}
              <span style={styles.vacancyCount}>{dept.totalVacancies}</span>
            </Typography>

            <List sx={styles.list}>
              {Array.isArray(dept.subNames) &&
                dept.subNames.map((sub, index) => (
                  <ListItem key={index} sx={styles.listItem}>
                    {sub}
                  </ListItem>
                ))}
            </List>
          </Paper>
        ))
      ) : (
        <Typography sx={styles.noData}>No Data Found</Typography>
      )}
    </Box>
  );
};

export default DepartmentPage;
