import React, { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import { Link } from "react-router-dom";
import { Stack } from "@mui/material";

import "../../styles/card.css";

interface CardProps {
  slide: number;
  colour: string;
  imagen: string;
  page: string;
  title: string;
  longTitle: boolean;
  description: string;
  button1Title: string;
  button1Link: string;
  button2Title: string;
  button2Link: string;
}

function Card(props: CardProps) {
  const [show, setShown] = useState(false);

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

  const cardStyle = useSpring({
    from: {
      maxHeight: "50vh",
      opacity: 0.5,
      transform: "scale(0.5)",
      boxShadow: show
        ? `0 0 20px 10px ${props.colour}`
        : `0 0 10px 5px ${props.colour}`,
    },
    to: {
      maxHeight: "50vh",
      opacity: 1,
      // height: "363px",
      transform: show ? "scale(1.05)" : "scale(1)",
      boxShadow: show
        ? `0 0 20px 10px ${props.colour}`
        : `0 0 10px 5px ${props.colour}`,
    },
    delay: 50,
  });

  const imgStyle = {
    maxHeight: "40vh",
    maxWidth: "40vh",
    boxShadow: show
      ? `0 0 8px 4px ${props.colour}`
      : `0 0 4px 2px ${props.colour}`,
  };

  const shortTitleStyle = {
    margin: 0,
    marginTop: "1rem",
    marginBottom: "0px",
    fontSize:
      dimensions.width < 444
        ? ""
        : `clamp(10px, 1.875rem, ${dimensions.height * 0.06}px)`,
  };

  const longTitleStyle = {
    margin: 0,
    marginTop: "1rem",
    marginBottom: "0px",
    fontSize:
      dimensions.width < 444
        ? ""
        : `clamp(8px, 1.45rem, ${dimensions.height * 0.0525}px)`,
  };

  const buttonStyle = {
    fontSize:
      dimensions.width < 444
        ? ""
        : `clamp(2px, 0.66rem, ${dimensions.height * 0.03}px)`,
  };

  return (
    <animated.div
      className="card"
      style={cardStyle}
      onMouseEnter={() => setShown(true)}
      onMouseLeave={() => setShown(false)}
    >
      <div style={{ textAlign: "center" }}>
        <img
          src={props.imagen}
          style={imgStyle}
          draggable={false}
          alt="Project"
        />
      </div>
      {!props.longTitle && (
        <h2 className="text-center" style={shortTitleStyle}>
          {props.title}
        </h2>
      )}
      {props.longTitle && (
        <h4 className="text-center" style={longTitleStyle}>
          {props.title}
        </h4>
      )}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-evenly"
        padding={0}
        margin={0}
      >
        <Link to={props.button1Link} className="link">
          <button
            className={`btn-glitch ${
              props.button2Title === "Coming Soon" ? "disabled" : ""
            }`}
            disabled={props.button1Title === "Coming Soon"}
            style={buttonStyle}
          >
            {props.button1Title}
          </button>
        </Link>
        <Link to={props.button2Link} className="link">
          <button
            className={`btn-glitch ${
              props.button2Title === "Coming Soon" ? "disabled" : ""
            }`}
            disabled={props.button2Title === "Coming Soon"}
            style={buttonStyle}
          >
            {props.button2Title}
          </button>
        </Link>
      </Stack>
    </animated.div>
  );
}

export default Card;
