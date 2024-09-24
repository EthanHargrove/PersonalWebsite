import React, { useCallback, useEffect, useState } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { Tabs, Tab } from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

const XsAndOsEnv: React.FC = () => {
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

  const [tab, setTab] = React.useState(0);
  const [dialect, setDialect] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const tabStyles = {
    backgroundColor: "#f0f0f0",
    color: "#000000",
    fontWeight: "bold",
  };

  const handleDialectChange = (dialectValue: number) => {
    console.log(dialectValue);
    setDialect(dialectValue);
  };

  const gameName = ["Xs and Os", "Noughts and Crosses", "Tic-Tac-Toe"];
  return (
    <div className="section" style={{ background: "#ffffff" }}>
      {/* <div style={{ position: "absolute", top: 50, left: 5 }}>
        <ButtonGroup orientation="vertical">
          <Button
            key={0}
            onClick={() => handleDialectChange(0)}
          >{`🇨🇦/🇮🇪`}</Button>
          <Button key={1} onClick={() => handleDialectChange(1)}>{`🇬🇧`}</Button>
          <Button key={2} onClick={() => handleDialectChange(2)}>{`🇺🇸`}</Button>
        </ButtonGroup>
      </div> */}
      <h3>{gameName[dialect]} Environment</h3>
      <Tabs
        value={tab}
        onChange={handleTabChange}
        TabIndicatorProps={{ style: { backgroundColor: "#000000" } }}
      >
        <Tab label={"Tab 1"} value={0} style={tabStyles} />
        <Tab label={"Tab 2"} value={1} style={tabStyles} />
      </Tabs>
      <h3>{tab}</h3>
    </div>
  );
};

export default XsAndOsEnv;
