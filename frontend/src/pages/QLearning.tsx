import React, { useEffect } from "react";
import ReactFullpage from "@fullpage/react-fullpage";

import Navbar from "../components/Navbar";
import IntroToRL from "../components/Q-Learning/IntroToRL";
import "../styles/gnn.css";

const QLearning = () => {
  useEffect(() => {
    document.title = "Ethan Hargrove - Q-Learning";
  }, []);
  return (
    <>
      <Navbar active="" />
      <ReactFullpage
        credits={{ enabled: false, label: "" }}
        navigation
        render={({ state, fullpageApi }) => {
          return (
            <ReactFullpage.Wrapper>
              {/* Your full-page sections go here */}
              <div className="section" style={{ background: "#ffffff" }}>
                <h1 className="heading">
                  Reinforcement Learning:
                  <br /> Q-Learning
                </h1>
              </div>
              <IntroToRL />
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

export default QLearning;
