import React, { useState, useEffect } from "react";
import { Box, Paper, Typography, Grid, Stack } from "@mui/material";

interface PlaceholderProps {
  // Define the props for the component here
}

const AxelrodTakeaway: React.FC<PlaceholderProps> = () => {
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
    fontFamily: "SpaceGrotesk",
    color: "#000000",
    textShadow:
      "1px 1px 0 #FFFFFF, -1px -1px 0 #FFFFFF, 1px -1px 0 #FFFFFF, -1px 1px 0 #FFFFFF",
  };

  return (
    <div className="section" style={{ background: "#ffffff", zIndex: -12 }}>
      <div
        className="background"
        style={{
          backgroundImage:
            dimensions.width < 444
              ? "url(./images/PrisonCellPortrait.png)"
              : "url(./images/PrisonCellLandscape.png)",
        }}
      />
      <div
        style={{
          overflow: "hidden",
          background: "rgba(0, 0, 0, 0.66)",
          paddingLeft: dimensions.width < 444 ? "1px" : "30px",
          paddingRight: dimensions.width < 444 ? "10px" : "35px",
          paddingBottom: "10px",
          marginTop: dimensions.height < dimensions.width ? "15px" : "0px",
        }}
      >
        <h3
          className="heading"
          style={{
            color: "var(--neon-orange)",
            textAlign: "center",
            marginBottom: dimensions.width < 444 ? 0 : -10,
            paddingBottom: dimensions.width < 444 ? 0 : -10,
            // fontSize: titleFontSize,
          }}
        >
          Axelrod's Results
        </h3>
        <ul
          style={{
            marginBottom:
              dimensions.width < 444 ? dimensions.height * 0.005 : 0,
            paddingBottom:
              dimensions.width < 444 ? dimensions.height * 0.005 : 0,
          }}
        >
          <li
            style={{
              color: "var(--neon-orange)",
              //   fontSize: rewardTextFontSize,
            }}
          >
            A few categories of strategies emerged from Axelrod's tournament:
            <ul>
              <li>
                <strong>Nice/Nasty</strong>: does the strategy defect
                unprovoked?
              </li>
              <li>
                <strong>Retalitory</strong>: does the strategy respond in kind?
              </li>
              <li>
                <strong>Forgiving</strong>: does the strategy cooperate after a
                defection?
              </li>
              <li>
                <strong>Clear</strong>: does the strategy have a clear pattern?
              </li>
            </ul>
          </li>
          <li
            style={{
              color: "var(--neon-orange)",
              //   fontSize: rewardTextFontSize,
            }}
          >
            The winner of Axelrod's tournament was{" "}
            <strong>
              <em>Tit For Tat</em>
            </strong>
            , a strategy that cooperates the first round, then mirrors the
            opponent's previous action
          </li>
          <li
            style={{
              color: "var(--neon-orange)",
              //   fontSize: rewardTextFontSize,
            }}
          >
            Tit For Tat and the other most successful strategies were
            <strong>
              <em> nice, retalitory, forgiving, and clear</em>
            </strong>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AxelrodTakeaway;
