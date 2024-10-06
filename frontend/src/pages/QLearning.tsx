import React, { useCallback, useEffect, useState } from "react";
import ReactFullpage from "@fullpage/react-fullpage";

import Navbar from "../components/Navbar";
import IntroToML from "../components/Q-Learning/IntroToML";
import MDPs from "../components/Q-Learning/MDPs";
import QLearningSlide from "../components/Q-Learning/QLearningSlide";
import XsAndOsEnv from "../components/Q-Learning/XsAndOsEnv";
import TipsAndTricks from "../components/Q-Learning/TipsAndTricks";
import XsAndOsGame from "../components/XsAndOs/XsAndOsGame";
import "../styles/gnn.css";
import "../styles/overrides.css";

const QLearning = () => {
  useEffect(() => {
    document.title = "Ethan Hargrove - Q-Learning";
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

  const shadowWidth = dimensions.width < 444 ? 1 : 2;
  const shadowColor =
    dimensions.width < 444 ? "var(--dark-grey)" : "var(--dark-grey)";

  return (
    <>
      <Navbar active="" />
      <ReactFullpage
        credits={{ enabled: false, label: "" }}
        navigation={Math.min(dimensions.width, dimensions.height) > 444}
        navigationTooltips={[
          "Title",
          "Intro to ML",
          "MDPs",
          "Q-Learning",
          "Exploration",
          "Xs and Os",
          "Play Against AI",
        ]}
        keyboardScrolling={true}
        scrollingSpeed={1000}
        render={({ state, fullpageApi }) => {
          return (
            <ReactFullpage.Wrapper>
              <div
                className="section"
                style={{ background: "#000000", zIndex: -3 }}
              >
                <div
                  className="background"
                  style={{
                    backgroundImage:
                      dimensions.width < 444
                        ? "url(./images/ChessBotMobile.png)"
                        : "url(./images/ChessBot.png)",
                  }}
                />
                <h3
                  className="heading"
                  style={{
                    margin: 0,
                    textAlign: "center",
                    color: "#ffffff",
                    // WebkitTextStroke: `${shadowWidth}px ${shadowColor}`,
                    textShadow: `
                      -${shadowWidth}px -${shadowWidth}px 0 ${shadowColor}, /* Top-left */
                      ${shadowWidth}px -${shadowWidth}px 0 ${shadowColor},  /* Top-right */
                      -${shadowWidth}px ${shadowWidth}px 0 ${shadowColor},  /* Bottom-left */
                      ${shadowWidth}px ${shadowWidth}px 0 ${shadowColor}   /* Bottom-right */
                    `,
                    backgroundColor: "rgba(0, 0, 0, 0.75)",
                  }}
                >
                  An Introduction to Reinforcement Learning: Q-Learning for Xs
                  and Os
                </h3>
              </div>
              <IntroToML
                defaultParadigm={"Reinforcement\nLearning"}
                fullpageApi={fullpageApi}
              />
              <MDPs />
              <QLearningSlide />
              <TipsAndTricks />
              <XsAndOsEnv />
              <div className="section" style={{ margin: 0, padding: 0 }}>
                <div
                  className="blur-background"
                  style={{
                    backgroundImage:
                      dimensions.width < 444
                        ? "url(./images/CyberpunkBackground.png)"
                        : "url(./images/CyberpunkBackground.png)",
                  }}
                />
                <XsAndOsGame />
              </div>
            </ReactFullpage.Wrapper>
          );
        }}
      />
    </>
  );
};

export default QLearning;
