import React, { useEffect, useState } from "react";
import ReactFullpage from "@fullpage/react-fullpage";

import Navbar from "../components/Navbar";
import IntroToPrisonersDilemma from "../components/BayesMARL/IntroToPrisonersDilemma";
import BayesTheoremLore from "../components/BayesMARL/BayesTheoremLore";
import BayesTheorem from "../components/BayesMARL/BayesTheorem";
import BeliefOverPolicies from "../components/BayesMARL/BeliefOverPolicies";
import "../styles/gnn.css";

const BayesMARL = () => {
  useEffect(() => {
    document.title = "Ethan Hargrove - Bayesian MARL";
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
      <Navbar active="" />
      <ReactFullpage
        credits={{ enabled: false, label: "" }}
        navigation={dimensions.width > 444}
        scrollingSpeed={1000}
        render={({ state, fullpageApi }) => {
          return (
            <ReactFullpage.Wrapper>
              <div
                className="section"
                style={{ background: "#ffffff", zIndex: -12 }}
              >
                <div
                  className="background"
                  style={{
                    backgroundImage:
                      dimensions.width < 444
                        ? "url(./images/BayesPrisonerPortrait.png)"
                        : "url(./images/BayesPrisonerLandscape.png)",
                  }}
                />
                <h1
                  className="heading"
                  style={{
                    color: "#ffffff",
                    textShadow: "2px 2px 4px #000000",
                    fontSize: dimensions.width < 444 ? "1rem" : "3rem",
                  }}
                >
                  Bayesian MARL:
                  <br /> Type-Based Reasoning
                  <br /> For the Prisoner's Dilemma
                </h1>
              </div>
              <IntroToPrisonersDilemma />
              <BayesTheorem />
              <BeliefOverPolicies />
              <BayesTheoremLore />

              <div className="section" style={{ background: "#ab4f6e" }}>
                Section 3
              </div>
              <div className="section" style={{ background: "#ffffff" }}>
                Section 1
              </div>
              <div className="section" style={{ background: "#000000" }}>
                Section 2
              </div>
              <div className="section" style={{ background: "#ab4f6e" }}>
                Section 3
              </div>
              <div className="section" style={{ background: "#ffffff" }}>
                Section 1
              </div>
              <div className="section" style={{ background: "#000000" }}>
                Section 2
              </div>
              <div className="section" style={{ background: "#ab4f6e" }}>
                Section 3
              </div>
              <div className="section" style={{ background: "#ffffff" }}>
                Section 1
              </div>
              <div className="section" style={{ background: "#000000" }}>
                Section 2
              </div>
              <div className="section" style={{ background: "#ab4f6e" }}>
                Section 3
              </div>
              <div className="section" style={{ background: "#ffffff" }}>
                Section 1
              </div>
              <div className="section" style={{ background: "#000000" }}>
                Section 2
              </div>
              <div className="section" style={{ background: "#ab4f6e" }}>
                Section 3
              </div>
              <div className="section" style={{ background: "#ffffff" }}>
                Section 1
              </div>
              <div className="section" style={{ background: "#000000" }}>
                Section 2
              </div>
              <div className="section" style={{ background: "#ab4f6e" }}>
                Section 3
              </div>
            </ReactFullpage.Wrapper>
          );
        }}
      />
    </>
  );
};

export default BayesMARL;
