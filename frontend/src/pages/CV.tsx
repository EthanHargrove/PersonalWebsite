// External imports
import React from "react";
// Internal imports
import Navbar from "../components/Navbar";
import HorizontalScrollCarousel from "../components/HorizontalScrollCarousel";
import "../styles/main.css";

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
  return (
    <>
      {/* <div className="cyberpunk-background"></div> */}
      <Navbar active="CV" />
      <h1>Hello there</h1>
      <HorizontalScrollCarousel title="Work Experience" items={certs} />
      <HorizontalScrollCarousel title="Education" items={certs} />
      <HorizontalScrollCarousel title="Certificates" items={certs} />
      <HorizontalScrollCarousel title="Skills" items={certs} />
    </>
  );
}

export default CV;
