import React from "react";
import { Link } from "react-router-dom";

const PlayAgainstAI: React.FC = () => {
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
        <button className="btn-glitch">Play Against AI</button>
      </Link>
    </div>
  );
};

export default PlayAgainstAI;
