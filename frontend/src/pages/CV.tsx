// External imports
import React from "react";
// Internal imports
import Navbar from "../components/Navbar";
import HorizontalScrollCarousel from "../components/HorizontalScrollCarousel";
import "../styles/main.css";

function CV() {
  const certs = [
    <h1>"../assets/pdf/AppliedML.pdf"</h1>,
    <h1>"../assets/pdf/CourseraTF2-1.pdf"</h1>,
    <h1>"../assets/pdf/CourseraTF2-2.pdf"</h1>,
    <h1>"../assets/pdf/CourseraBootstrap.pdf"</h1>,
    <h1>"../assets/pdf/CourseraIOT.pdf"</h1>,
    <h1>"../assets/pdf/CourseraArduino.pdf"</h1>,
    <h1>"../assets/pdf/CourseraChineseCharacters1.pdf"</h1>,
    <h1>"../assets/pdf/BathChineseCharacters.pdf"</h1>,
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
