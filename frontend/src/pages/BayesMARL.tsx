import React, { useEffect, useState } from "react";
import ReactFullpage from "@fullpage/react-fullpage";

import Navbar from "../components/Navbar";
import IntroToPrisonersDilemma from "../components/BayesMARL/IntroToPrisonersDilemma";
import Axelrod from "../components/BayesMARL/Axelrod";
import AxelrodTakeaway from "../components/BayesMARL/AxelrodTakeaway";
import ValueOfInformation from "../components/BayesMARL/ValueOfInformation";
import BayesTheorem from "../components/BayesMARL/BayesTheorem";
import BeliefOverPolicies from "../components/BayesMARL/BeliefOverPolicies";
import HBAIntro from "../components/BayesMARL/HBAIntro";
import HBA from "../components/BayesMARL/HBA";
import ActionProbabilities from "../components/BayesMARL/ActionProbabilities";
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
        navigation={Math.min(dimensions.width, dimensions.height) > 444}
        navigationTooltips={[
          "Title",
          "Prisoner's Dilemma",
          "Axelrod's Tournament",
          "Axelrod's Results",
          "HBA Intro",
          "Value of Information",
          "HBA Implementation",
          "Bayes' Theorem",
          "Belief Over Policies",
          "Action Probabilities",
        ]}
        scrollingSpeed={1000}
        keyboardScrolling={true}
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
                    fontSize:
                      Math.min(dimensions.width, dimensions.height) < 444
                        ? "2rem"
                        : "3rem",
                  }}
                >
                  Bayesian MARL:
                  <br /> Type-Based Reasoning
                  <br /> For the Prisoner's Dilemma
                </h1>
              </div>
              <IntroToPrisonersDilemma fullpageApi={fullpageApi} />
              <Axelrod />
              <AxelrodTakeaway />
              <HBAIntro />
              <ValueOfInformation />
              <HBA />
              <BayesTheorem />
              <BeliefOverPolicies />
              <ActionProbabilities />
            </ReactFullpage.Wrapper>
          );
        }}
      />
    </>
  );
};

export default BayesMARL;
