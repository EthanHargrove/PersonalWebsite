// External imports
import React, { useEffect, useState } from "react";

// Internal imports
import PrisonersDilemmaGame from "../components/BayesMARL/PrisonersDilemmaGame";
import Navbar from "../components/Navbar";

function PrisonersDilemmaPage() {
  useEffect(() => {
    // Change document title
    document.title = "Ethan Hargrove - Prisoners Dilemma";
  }, []);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <div
        className="background"
        style={{
          backgroundImage:
            dimensions.width < 444
              ? "url(./images/PrisonCellPortrait.png)"
              : "url(./images/PrisonCellLandscape.png)",
        }}
      />
      <Navbar active="" />
      <PrisonersDilemmaGame />
    </>
  );
}

export default PrisonersDilemmaPage;
