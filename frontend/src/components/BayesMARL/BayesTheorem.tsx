import React, { useState, useEffect } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";

interface BayesTheoremProps {
  // Define the props for the component here
}

const BayesTheorem: React.FC<BayesTheoremProps> = () => {
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

  const fontStyle = {
    fontSize: Math.min(dimensions.width * 0.0325, dimensions.height * 0.0275),
    paddingBottom: "10px",
  };

  const mathFontSize =
    Math.min(dimensions.width, dimensions.height) < 444
      ? "\\normalsize"
      : "\\Large";

  return (
    <div className="section" style={{ background: "#ffffff", zIndex: -12 }}>
      <div
        className="background"
        style={{
          backgroundImage:
            dimensions.width < 444
              ? "url(./images/BayesPortrait.png)"
              : "url(./images/BayesLandscape.png)",
        }}
      />
      <div
        style={{
          overflow: "hidden",
          paddingLeft: "5px",
          paddingRight: "20px",
          paddingTop: "4px",
          paddingBottom: "-10px",
          marginTop: "20px",
          marginBottom: "0px",
          background: "rgba(0,0,0,0.85)",
          color: "#ffffff",
        }}
      >
        <h3
          className="heading"
          style={{
            textAlign: "center",
            fontSize: Math.min(
              dimensions.width * 0.055,
              dimensions.height * 0.05
            ),
            margin: "10px",
          }}
        >
          Bayes' Theorem
        </h3>
        <MathJaxContext>
          <ul
            style={{
              paddingTop: 0,
              marginTop: 0,
              paddingBottom: 0,
              marginBottom: 0,
            }}
          >
            <li style={fontStyle}>
              Calculates the probability of a hypothesis being true based on
              prior knowledge and new evidence.
            </li>
          </ul>
          <MathJax inline dynamic={true} style={fontStyle}>
            {`\\[${mathFontSize} P(A \\mid B) = \\frac{P(B \\mid A) \\; P(A)}{P(B)} \\]`}
          </MathJax>
          <ul
            style={{
              paddingTop: 0,
              marginTop: 0,
              paddingBottom: 0,
              marginBottom: 0,
            }}
          >
            <li style={fontStyle}>
              <strong>Prior</strong>{" "}
              <MathJax inline dynamic={true}>
                {`\\(${mathFontSize} P(A)\\)`}
              </MathJax>
              : Our initial belief about the probability of our hypothesis (
              <MathJax inline dynamic={true}>
                {"\\(A\\)"}
              </MathJax>
              )
            </li>
            <li style={fontStyle}>
              <strong>Likelihood</strong>{" "}
              <MathJax inline dynamic={true}>
                {`\\(${mathFontSize} P(B \\mid A)\\)`}
              </MathJax>
              : The probability of observing the data (
              <MathJax inline dynamic={true}>
                {`\\(${mathFontSize} B\\)`}
              </MathJax>
              ) given that our hypothesis (
              <MathJax inline dynamic={true}>
                {`\\(${mathFontSize} A\\)`}
              </MathJax>
              ) is true
            </li>
            <li style={fontStyle}>
              <strong>Posterior</strong>{" "}
              <MathJax inline dynamic={true}>
                {`\\(${mathFontSize} P(A \\mid B)\\)`}
              </MathJax>
              : Our updated belief about the probability of our hypothesis after
              accounting for the newly observed data
            </li>
            <li style={{ ...fontStyle, paddingBottom: "0px" }}>
              <strong>Evidence</strong>{" "}
              <MathJax inline dynamic={true}>
                {`\\(${mathFontSize} P(B)\\)`}
              </MathJax>
              : The probability of observing the data
              <ul>
                <li style={fontStyle}>
                  Often calculated using the law of total probability:
                </li>
              </ul>
              <MathJax
                inline
                dynamic={true}
                style={{ ...fontStyle, paddingBottom: 0, marginBottom: 0 }}
              >
                {`\\[${mathFontSize} P(B) = \\sum_n P(B \\cap A_n)= \\sum_{n} P(B \\mid A_n) P(A_n)\\]`}
              </MathJax>
            </li>
          </ul>
        </MathJaxContext>
      </div>
    </div>
  );
};

export default BayesTheorem;
