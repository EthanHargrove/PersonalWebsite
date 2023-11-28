import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import { useGlitch, GlitchHandle } from "react-powerglitch";
import '../styles/card.css';

interface CardProps {
  colour: string;
  imagen: string;
}

function Card(props: CardProps) {
  const [show, setShown] = useState(false);

  const style = useSpring({
    from: { 
      opacity: 0.5,
      transform: "scale(0.5)", 
      boxShadow: show
      ? `0 0 20px 10px ${props.colour}`
      : `0 0 10px 5px ${props.colour}`,
    },
    to: { 
      opacity: 1,
      transform: show ? "scale(1.05)" : "scale(1)",
      boxShadow: show
      ? `0 0 20px 10px ${props.colour}`
      : `0 0 10px 5px ${props.colour}`,
    },
  });

  const glitch: GlitchHandle = useGlitch({ playMode: 'hover', glitchTimeSpan: false });

  return (
    <animated.div
      className="card"
      ref={glitch.ref}
      style={style}
      onMouseEnter={() => setShown(true)}
      onMouseLeave={() => setShown(false)}
    >
      <img src={props.imagen} alt="" />
      <h2>Title</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
        nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
        volutpat.
      </p>
    </animated.div>
  );
}

export default Card;
