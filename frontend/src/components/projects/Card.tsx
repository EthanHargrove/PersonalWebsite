import React, { useState } from "react";
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
  description: string;
  button1Title: string;
  button1Link: string;
  button2Title: string;
  button2Link: string;
}

function Card(props: CardProps) {
  const [show, setShown] = useState(false);

  const cardStyle = useSpring({
    from: {
      opacity: 0.5,
      transform: "scale(0.5)",
      boxShadow: show
        ? `0 0 20px 10px ${props.colour}`
        : `0 0 10px 5px ${props.colour}`,
    },
    to: {
      opacity: 1,
      height: "363px",
      transform: show ? "scale(1.05)" : "scale(1)",
      boxShadow: show
        ? `0 0 20px 10px ${props.colour}`
        : `0 0 10px 5px ${props.colour}`,
    },
  });

  const imgStyle = {
    boxShadow: show
      ? `0 0 8px 4px ${props.colour}`
      : `0 0 4px 2px ${props.colour}`,
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
      <h2 className="text-center">{props.title}</h2>
      <Stack direction="row" alignItems="center" justifyContent="space-evenly">
        <Link to={props.button1Link} className="link">
          <button className="btn-glitch">{props.button1Title}</button>
        </Link>
        <Link to={props.button2Link} className="link">
          <button className="btn-glitch">{props.button2Title}</button>
        </Link>
      </Stack>
    </animated.div>
  );
}

export default Card;
