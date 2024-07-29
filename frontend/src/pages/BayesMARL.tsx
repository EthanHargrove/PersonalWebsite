import React, { useEffect, useState } from "react";
import ReactFullpage from "@fullpage/react-fullpage";

import Navbar from "../components/Navbar";
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
              <div className="section" style={{ background: "#ffffff" }}>
                <h1 className="heading">
                  Bayesian MARL:
                  <br /> Type-Based Reasoning
                </h1>
              </div>
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
