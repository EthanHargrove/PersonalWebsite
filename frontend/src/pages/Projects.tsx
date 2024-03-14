import React, { useState, useEffect } from "react";

import Card from "../components/projects/Card";
import Carousel3D from "../components/projects/Carousel3D";
import Navbar from "../components/Navbar";

function Projects() {
  useEffect(() => {
    document.title = "Ethan Hargrove - Projects";
  }, []);
  let cards = [
    {
      key: 0,
      content: (
        <Card
          slide={0}
          colour="var(--neon-blue)"
          imagen="./images/tic-tac-toe.png"
          page="/tic-tac-toe"
          title="Q-Learning: Xs and Os"
          description="First card."
          button1Title="Play Against AI"
          button1Link="/Xs-and-Os"
          button2Title="How it Works"
          button2Link=""
        />
      ),
    },
    {
      key: 1,
      content: (
        <Card
          slide={1}
          colour="var(--neon-purple)"
          imagen="https://updates.theme-fusion.com/wp-content/uploads/2017/12/layer_slider_plugin_thumb.png"
          page="/tic-tac-toe"
          title="Explainable AI: Sudoku Solver"
          description="Third card."
          button1Title="Try It Out"
          button1Link="/sudoku"
          button2Title="How It Works"
          button2Link=""
        />
      ),
    },
    {
      key: 2,
      content: (
        <Card
          slide={2}
          colour="var(--neon-orange)"
          imagen="https://updates.theme-fusion.com/wp-content/uploads/2016/08/slider_revolution-1.png"
          page="/tic-tac-toe"
          title="Card 4"
          description="Fourth card."
          button1Title=""
          button1Link=""
          button2Title=""
          button2Link=""
        />
      ),
    },
    {
      key: 3,
      content: (
        <Card
          slide={3}
          colour="var(--neon-pink)"
          imagen="https://updates.theme-fusion.com/wp-content/uploads/2019/01/pwa_880_660.jpg"
          page="/tic-tac-toe"
          title="Card 5"
          description="Fifth card."
          button1Title=""
          button1Link=""
          button2Title=""
          button2Link=""
        />
      ),
    },
    {
      key: 4,
      content: (
        <Card
          slide={4}
          colour="var(--neon-green)"
          imagen="./images/AoC-2023.png"
          page="/tic-tac-toe"
          title="Advent of Code 2023"
          description="Second card."
          button1Title=""
          button1Link=""
          button2Title=""
          button2Link=""
        />
      ),
    },
  ];

  return (
    <>
      <div className="cyberpunk-background"></div>
      <Navbar active="projects" />
      <div className="content">
        {/* <h1>Projects</h1> */}
        <Carousel3D
          cards={cards}
          height="100vh"
          width="90%"
          margin="0 auto"
          offset={200}
          showArrows={false}
        />
      </div>
    </>
  );
}

export default Projects;
