import React, { useState } from "react";
// import { useSpring, animated } from "react-spring";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Stack } from "@mui/material";

import "../styles/card.css";
import EncryptButton from "./EncryptButton";

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

function Card2(props: CardProps) {
  const [show, setShown] = useState(true);

  //   const cardStyle = useSpring({
  //     from: {
  //       opacity: 0.5,
  //       transform: "scale(0.5)",
  //       boxShadow: show
  //         ? `0 0 20px 10px ${props.colour}`
  //         : `0 0 10px 5px ${props.colour}`,
  //     },
  //     to: {
  //       opacity: 1,
  //       transform: show ? "scale(1.05)" : "scale(1)",
  //       boxShadow: show
  //         ? `0 0 20px 10px ${props.colour}`
  //         : `0 0 10px 5px ${props.colour}`,
  //     },
  //   });

  const initialStyle = {
    opacity: 0.5,
    transform: "scale(0)",
    boxShadow: show
      ? `0 0 20px 10px ${props.colour}`
      : `0 0 10px 5px ${props.colour}`,
  };

  const animateStyle = {
    opacity: 1,
    transform: show ? "scale(1.05)" : "scale(1)",
    boxShadow: show
      ? `0 0 20px 10px ${props.colour}`
      : `0 0 10px 5px ${props.colour}`,
    transition: { type: "spring", mass: 1, damping: 14, stiffness: 100 },
  };

  const exitStyle = {
    opacity: 0,
    transform: "scale(0.1)",
    boxShadow: show
      ? `0 0 20px 10px ${props.colour}`
      : `0 0 10px 5px ${props.colour}`,
    transition: { type: "spring", mass: 1, damping: 14, stiffness: 100 },
  };

  const imgStyle = {
    boxShadow: show
      ? `0 0 8px 4px ${props.colour}`
      : `0 0 4px 2px ${props.colour}`,
  };

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          key={props.slide}
          className="card"
          initial={initialStyle}
          animate={animateStyle}
          exit={exitStyle}
          onMouseEnter={() => setShown(true)}
          onMouseLeave={() => setShown(false)}
        >
          <img src={props.imagen} style={imgStyle} alt="Project" />
          <h2 className="text-center">{props.title}</h2>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-evenly"
          >
            <Link to={props.button1Link} className="link">
              <EncryptButton text={props.button1Title} />
              {/* <button className="btn-glitch">{props.button1Title}</button> */}
            </Link>
            <Link to={props.button2Link} className="link">
              <EncryptButton text={props.button2Title} />
              {/* <button className="btn-glitch">{props.button2Title}</button> */}
            </Link>
          </Stack>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Card2;
