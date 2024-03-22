// External imports
import React, { useEffect } from "react";
// Internal imports
import Navbar from "../components/Navbar";
import "../styles/main.css";
import SkillsCard from "../components/CV/SkillsCard";
import Banner from "../components/CV/Banner";
import Education from "../components/CV/Education";
import WorkExperience from "../components/CV/WorkExperience";
import { styled } from "@mui/system";

function CV() {
  useEffect(() => {
    // Change document title
    document.title = "Ethan Hargrove - CV";

    // Change favicon
    // const favicon = document.querySelector('link[rel="icon"]');
    // if (favicon) {
    //   favicon.href = "/path/to/new/icon.png"; // Change path to your new favicon
    // }
  }, []);

  const CertImage = styled("img")(({ theme }) => ({
    height: "50vh",
    objectFit: "contain",

    "&:hover": {
      transform: "scale(1.1)",
    },

    [theme.breakpoints.down("sm")]: {
      height: "33vh",
      objectFit: "contain",
    },
  }));

  const certs = [
    <CertImage src={"./images/CourseraAppliedML.png"} alt="Certificate" />,
    <CertImage src={"./images/CourseraTF2-1.png"} alt="Certificate" />,
    <CertImage src={"./images/CourseraTF2-2.png"} alt="Certificate" />,
    <CertImage src={"./images/CourseraBootstrap.png"} alt="Certificate" />,
    <CertImage src={"./images/CourseraIOT.png"} alt="Certificate" />,
    <CertImage src={"./images/CourseraArduino.png"} alt="Certificate" />,
    <CertImage
      src={"./images/CourseraChineseCharacters1.png"}
      alt="Certificate"
    />,
    <CertImage src={"./images/BathChineseCharacters.png"} alt="Certificate" />,
  ];

  const skillsCards = [
    <SkillsCard
      imagen="./images/Python.png"
      title="Python"
      background="linear-gradient(-45deg, #4584B6 0 56.5%, #FFDE57 59.5% 100%)"
      textColour="#FFDE57"
    />,
    <SkillsCard
      imagen="./images/Tensorflow.png"
      title="TensorFlow"
      background="var(--neon-orange)"
      imgBackground="#d3d3d3"
      textColour="#ffffff"
    />,
    <SkillsCard
      imagen="./images/Flask.png"
      title="Flask"
      background="#FFFFFF"
      textColour="#000000"
    />,
    <SkillsCard
      imagen="./images/Typescript.png"
      title="TypeScript"
      background="#ffffff"
      textColour="#3178c6"
    />,
    <SkillsCard
      imagen="./images/React.png"
      title="React"
      background="var(--dark-grey)"
      textColour="#61dbfb"
    />,
    <SkillsCard
      imagen="./images/CSS.jpeg"
      title="CSS"
      background="#FFFFFF"
      textColour="#264de4"
    />,
    <SkillsCard
      imagen="./images/Haskell.png"
      title="Haskell"
      background="#d3d3d3"
      textColour="#5e5086"
    />,
  ];

  const skillsSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 1000,
    easing: "linear",
    pauseOnHover: true,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 710,
        settings: {
          slidesToShow: 1.75,
          autoplay: false,
        },
      },
    ],
  };

  const certSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    speed: 6000,
    autoplaySpeed: 6000,
    easing: "linear",
    pauseOnHover: true,
    swipeToSlide: true,
    rtl: true,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 710,
        settings: {
          slidesToShow: 1,
          autoplay: false,
        },
      },
    ],
  };

  return (
    <>
      <div
        className="cyberpunk-background"
        style={{ position: "fixed", marginTop: "-60px" }}
      />
      <Navbar active="CV" />
      <WorkExperience />
      <Education />
      <Banner items={skillsCards} settings={skillsSettings} title="Skills" />
      <Banner items={certs} settings={certSettings} title="Certificates" />
    </>
  );
}

export default CV;
