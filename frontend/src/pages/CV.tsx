// External imports
import React from "react";
// Internal imports
import Navbar from "../components/Navbar";
import HorizontalScrollCarousel from "../components/CV/HorizontalScrollCarousel";
import "../styles/main.css";
import SkillsCard from "../components/CV/SkillsCard";
import Banner from "../components/CV/Banner";

function CV() {
  const certStyle = {
    height: "67vh",
  };

  const certs = [
    <img
      src={"./images/CourseraAppliedML.png"}
      alt="Certificate"
      style={certStyle}
    />,
    <img
      src={"./images/CourseraTF2-1.png"}
      alt="Certificate"
      style={certStyle}
    />,
    <img
      src={"./images/CourseraTF2-2.png"}
      alt="Certificate"
      style={certStyle}
    />,
    <img
      src={"./images/CourseraBootstrap.png"}
      alt="Certificate"
      style={certStyle}
    />,
    <img
      src={"./images/CourseraIOT.png"}
      alt="Certificate"
      style={certStyle}
    />,
    <img
      src={"./images/CourseraArduino.png"}
      alt="Certificate"
      style={certStyle}
    />,
    <img
      src={"./images/CourseraChineseCharacters1.png"}
      alt="Certificate"
      style={certStyle}
    />,
    <img
      src={"./images/BathChineseCharacters.png"}
      alt="Certificate"
      style={certStyle}
    />,
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

  return (
    <>
      <div
        className="cyberpunk-background"
        style={{ position: "fixed", marginTop: "-30px" }}
      />
      <Navbar active="CV" />
      <h1>CV</h1>
      {/* <HorizontalScrollCarousel title="Work Experience" items={certs} />
      <HorizontalScrollCarousel title="Education" items={certs} /> */}
      <Banner items={skillsCards} title="Skills" />
      <HorizontalScrollCarousel title="Certificates" items={certs} />
    </>
  );
}

export default CV;
