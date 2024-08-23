import React from "react";
import { Link } from "react-router-dom";

interface PlayAgainstAIProps {
  dark: boolean;
}

const PlayAgainstAI: React.FC<PlayAgainstAIProps> = ({ dark }) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 5,
        left: 5,
      }}
    >
      <Link
        to="/Xs-and-Os"
        style={{
          display: "flex",
          justifyContent: "center",
          textDecoration: "none",
        }}
      >
        <button className={dark ? "btn-glitch-dark" : "btn-glitch"}>
          Play Against AI
        </button>
      </Link>
    </div>
  );
};

export default PlayAgainstAI;
