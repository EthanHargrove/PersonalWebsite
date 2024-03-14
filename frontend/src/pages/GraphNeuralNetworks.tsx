import React, { useEffect } from "react";
import ReactFullpage from "@fullpage/react-fullpage";

import Navbar from "../components/Navbar";
import "../styles/gnn.css";

const GraphNeuralNetworks = () => {
  useEffect(() => {
    document.title = "Ethan Hargrove - Graph Neural Networks";
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

export default GraphNeuralNetworks;
