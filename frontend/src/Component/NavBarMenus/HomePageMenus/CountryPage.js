import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Collapse,
  Container,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

// Styled Components
const CountryStrip = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "16px",
  margin: "16px 0",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
  backgroundColor: "#ffffff",
  width: "100%",
  flexWrap: "wrap",
  transition: "box-shadow 0.3s ease",
  "&:hover": {
    boxShadow: "0 6px 15px rgba(0,0,0,0.25)",
  },
}));

const CountryImage = styled("img")({
  width: "80px",
  height: "80px",
  borderRadius: "8px",
  objectFit: "cover",
});

const ContentBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  gap: "8px",
  padding: "0 16px",
  minWidth: "200px",
});

const StyledButton = styled(Button)({
  backgroundColor: "#007bff",
  color: "#fff",
  textTransform: "none",
  padding: "8px 12px",
  borderRadius: "6px",
  "&:hover": {
    backgroundColor: "#0056b3",
    transform: "scale(1.05)",
    transition: "transform 0.2s ease",
  },
});

const CardsContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px",
  marginTop: "12px",
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
  },
}));

const CardStyled = styled(Card)({
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  borderRadius: "12px",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 15px rgba(0, 0, 0, 0.3)",
  },
});

const AnimatedNumber = styled("span")(({ theme }) => ({
  fontWeight: "bold",
  color: "#007bff",
}));

const CountryPage = () => {
  const [countries, setCountries] = useState([]);
  const [fields, setFields] = useState([]);
  const [expandedCountry, setExpandedCountry] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const countriesResponse = await axios.get(
          "http://localhost:5500/api/countries?all=true"
        );
        const fieldsResponse = await axios.get(
          "http://localhost:5500/api/field?all=true"
        );

        setCountries(countriesResponse.data.countries || []);
        setFields(fieldsResponse.data.fields || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const calculateTotalVacancies = useCallback(
    (country) => {
      const matchingFields = fields.filter(
        (field) =>
          field.countryData === country.name && field.fieldData === country.type
      );
      return matchingFields.reduce(
        (sum, field) => sum + field.vacancies.reduce((a, b) => a + b, 0),
        0
      );
    },
    [fields]
  );

  const toggleCountryCards = (countryId) => {
    setExpandedCountry((prev) => (prev === countryId ? null : countryId));
  };

  const renderMatchingCards = (country) => {
    const matchingFields = fields.filter(
      (field) =>
        field.countryData === country.name && field.fieldData === country.type
    );

    if (matchingFields.length === 0) {
      return (
        <Typography variant="body2" color="textSecondary">
          No matching fields for this country.
        </Typography>
      );
    }

    return (
      <CardsContainer>
        {matchingFields.map((field) => (
          <CardStyled key={field._id}>
            <CardMedia
              component="img"
              height="160"
              image={`http://localhost:5500${field.imageUrl}`}
              alt={field.fieldData}
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {field.fieldData}
              </Typography>
              <Box component="table" width="100%" fontSize="0.9rem">
                <thead>
                  <tr>
                    <th style={{ textAlign: "left" }}>Names</th>
                    <th style={{ textAlign: "left" }}>Vacancies</th>
                  </tr>
                </thead>
                <tbody>
                  {field.names.map((name, index) => (
                    <tr key={index}>
                      <td>{name}</td>
                      <td>{field.vacancies[index]}</td>
                    </tr>
                  ))}
                </tbody>
              </Box>
            </CardContent>
          </CardStyled>
        ))}
      </CardsContainer>
    );
  };

  const renderCountryStrips = () => {
    const types = [
      "Study Abroad",
      "Work Abroad",
      "Language Coaching",
      "Domestic Placements",
      "Travel Abroad",
    ];

    return types.map((type) => (
      <Box key={type} mb={4}>
        <Typography variant="h4" mb={2} color="primary" fontWeight="600">
          {type}
        </Typography>
        {countries
          .filter((country) => country.type === type)
          .map((country) => {
            const totalVacancies = calculateTotalVacancies(country);

            return (
              <Box key={country._id}>
                <CountryStrip>
                  <CountryImage
                    src={`http://localhost:5500${country.shapeImage}`}
                    alt={country.name}
                  />
                  <ContentBox>
                    <Typography variant="h5">{country.name}</Typography>
                    <Typography variant="body1">
                      Total Vacancies:{" "}
                      <AnimatedNumber>{totalVacancies}</AnimatedNumber>
                    </Typography>
                  </ContentBox>
                  <StyledButton
                    startIcon={
                      expandedCountry === country._id ? (
                        <ExpandLessIcon />
                      ) : (
                        <ExpandMoreIcon />
                      )
                    }
                    onClick={() => toggleCountryCards(country._id)}
                  >
                    {expandedCountry === country._id
                      ? "Hide Details"
                      : "Show Details"}
                  </StyledButton>
                </CountryStrip>
                <Collapse in={expandedCountry === country._id} timeout="auto">
                  {renderMatchingCards(country)}
                </Collapse>
              </Box>
            );
          })}
      </Box>
    ));
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" align="center" mb={4} fontWeight="700">
        Country Fields
      </Typography>
      {renderCountryStrips()}
    </Container>
  );
};

export default CountryPage;
