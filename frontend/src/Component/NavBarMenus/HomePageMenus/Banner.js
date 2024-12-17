import React, { useState, useEffect, useRef } from "react";
import { Box, Container, Grid, Typography, IconButton } from "@mui/material";
import { styled, keyframes } from "@mui/system";
import { FaCircleDot } from "react-icons/fa6";

// Keyframes for fade-in animation
const fadeIn = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

// Styled video container
const VideoSlide = styled("div")(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: "auto",
  overflow: "hidden",
  "& video": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
}));

const VideoContent = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: "20%",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 2,
  color: "white",
  textAlign: "center", // Center align text
  animation: `${fadeIn} 1.5s ease-out`,
  maxWidth: "90%",
  padding: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    bottom: "25%",
  },
}));

const DotContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: "5%", // Spaced perfectly at the bottom
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  gap: "10px",
  zIndex: 3,
  [theme.breakpoints.down("sm")]: {
    bottom: "3%",
  },
}));

const StyledDot = styled(IconButton)(({ active }) => ({
  color: active ? "#1976d2" : "rgba(255, 255, 255, 0.6)",
  fontSize: active ? "1.4rem" : "1rem",
  transition: "all 0.3s ease-in-out",
}));

// Videos Data
const videos = [
  {
    src: "/videos/Language_Learning_1.mp4",
    title: "Language Coaching",
    description:
      "Achieve fluency with our language training programs. Tailored courses to prepare you for global communication.",
  },
  {
    src: "/videos/Study_Abroad_1.mp4",
    title: "Study Abroad",
    description:
      "Assistance with securing student visas. Explore educational opportunities across the globe.",
  },
  {
    src: "/videos/Work_Abroad_1.mp4",
    title: "Travel and Work Abroad",
    description:
      "Do what you like at where you want. Discover the best travel options for your international journey.",
  },
  {
    src: "/videos/Domestic_Recruitment_1.mp4",
    title: "Domestic Placements",
    description:
      "Guidance to grow your career inside India. Find the best opportunities that match your skillset.",
  },
];

const Banner = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRef = useRef(null);

  // Automatically progress videos
  useEffect(() => {
    const currentVideo = videoRef.current;

    const handleVideoEnd = () => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % videos.length);
    };

    if (currentVideo) {
      currentVideo.addEventListener("ended", handleVideoEnd);
      currentVideo.play();
    }

    return () => {
      if (currentVideo) {
        currentVideo.removeEventListener("ended", handleVideoEnd);
      }
    };
  }, [activeIndex]);

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <Container maxWidth="xl" className="mt-4 mb-4" disableGutters>
      <Grid container>
        <Grid item xs={12} position="relative">
          {videos.map((video, index) => (
            <VideoSlide
              key={index}
              sx={{ display: activeIndex === index ? "block" : "none" }}
            >
              <video
                ref={activeIndex === index ? videoRef : null}
                src={video.src}
                autoPlay
                muted
                loop={false}
              />
              <VideoContent>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: "bold",
                    fontSize: { xs: "1.8rem", sm: "2.2rem", md: "3rem" },
                  }}
                >
                  {video.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    mt: 1,
                    fontSize: { xs: "0.9rem", sm: "1rem", md: "1.2rem" },
                  }}
                >
                  {video.description}
                </Typography>
              </VideoContent>
            </VideoSlide>
          ))}

          {/* Dot Indicators */}
          <DotContainer>
            {videos.map((_, dotIndex) => (
              <StyledDot
                key={dotIndex}
                onClick={() => handleDotClick(dotIndex)}
                active={activeIndex === dotIndex}
              >
                <FaCircleDot />
              </StyledDot>
            ))}
          </DotContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Banner;
