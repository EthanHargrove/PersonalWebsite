import React, { useState, useEffect } from "react";
import { Stage, Layer, Rect, Text, Arrow, Line, Image } from "react-konva";
import { Tooltip } from "@mui/material";
import useImage from "use-image";
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

  return (
    <div className="section" style={{ background: "#ffffff" }}>
      <div style={{ overflow: "hidden" }}>
        <h3 className="heading" style={{ textAlign: "center" }}>
          Bayes' Theorem
        </h3>
        <MathJaxContext>
          <ul>
            <li>
              Calculates the probability of a hypothesis being true based on
              prior knowledge and new evidence.
            </li>
          </ul>
          <MathJax inline dynamic={true}>
            {"\\[P(A \\mid B) = \\frac{P(B \\mid A) \\; P(A)}{P(B)} \\]"}
          </MathJax>
          <ul>
            <li>
              Prior{" "}
              <MathJax inline dynamic={true}>
                {"\\(P(A)\\)"}
              </MathJax>
              : Our initial belief about the probability of our hypothesis (
              <MathJax inline dynamic={true}>
                {"\\(A\\)"}
              </MathJax>
              )
            </li>
            <li>
              Likelihood{" "}
              <MathJax inline dynamic={true}>
                {"\\(P(B \\mid A)\\)"}
              </MathJax>
              : The probability of observing the data (
              <MathJax inline dynamic={true}>
                {"\\(B\\)"}
              </MathJax>
              ) given that our hypothesis (
              <MathJax inline dynamic={true}>
                {"\\(A\\)"}
              </MathJax>
              ) is true
            </li>
            <li>
              Posterior{" "}
              <MathJax inline dynamic={true}>
                {"\\(P(A \\mid B)\\)"}
              </MathJax>
              : Our updated belief about the probability of our hypothesis after
              accounting for the newly observed data
            </li>
            <li>
              Evidence{" "}
              <MathJax inline dynamic={true}>
                {"\\(P(B)\\)"}
              </MathJax>
              : The probability of observing the data
              <ul>
                <li>Often calculated using the law of total probability:</li>
              </ul>
              <MathJax inline dynamic={true}>
                {
                  "\\[P(B) = \\sum_n P(B \\cap A_n)= \\sum_{n} P(B \\mid A_n) P(A_n)\\]"
                }
              </MathJax>
            </li>
          </ul>
        </MathJaxContext>
      </div>
    </div>
  );
};

export default BayesTheorem;
