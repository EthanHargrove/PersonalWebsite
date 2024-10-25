import React, { useEffect } from "react";

import Card from "../components/projects/Card";
import Carousel3D from "../components/projects/Carousel3D";
import Navbar from "../components/Navbar";

function Projects() {
  useEffect(() => {
    // Change document title
    document.title = "Ethan Hargrove - Projects";

    document.documentElement.classList.add("no-scroll");
    return () => {
      document.documentElement.classList.remove("no-scroll");
    };
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
          longTitle={false}
          description="First card."
          button1Title="Play Against AI"
          button1Link="/Xs-and-Os"
          button2Title="How it Works"
          button2Link="/Q-Learning"
        />
      ),
    },
    {
      key: 1,
      content: (
        <Card
          slide={2}
          colour="var(--neon-orange)"
          imagen="./images/BayesPrisoner.png"
          page="/tic-tac-toe"
          title="Bayesian MARL: The Prisoner's Dilemma"
          longTitle={true}
          description="Second card."
          button1Title="Play Against AI"
          button1Link="/prisoners-dilemma"
          button2Title="How it Works"
          button2Link="/bayesian-multi-agent-reinforcement-learning"
        />
      ),
    },
    {
      key: 2,
      content: (
        <Card
          slide={1}
          colour="var(--neon-purple)"
          imagen="./images/SudokuBeta.png"
          page="/tic-tac-toe"
          title="XAI: Sudoku Solver"
          longTitle={false}
          description="Third card."
          button1Title="Try It Out"
          button1Link="/sudoku"
          button2Title="In Beta"
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
          imagen="./images/trappist1.png"
          page="/"
          title="TTV Modelling"
          longTitle={false}
          description="Fifth card."
          button1Title="Coming Soon"
          button1Link=""
          button2Title="Coming Soon"
          button2Link=""
        />
      ),
    },
    {
      key: 4,
      content: (
        <Card
          slide={4}
          colour="var(--neon-orange)"
          imagen="./images/PersonalWebsite.png"
          page="/"
          title="Personal Website"
          longTitle={false}
          description=""
          button1Title="View the Code"
          button1Link="https://github.com/EthanHargrove/PersonalWebsite"
          button2Title="Legacy Site"
          button2Link="https://github.com/EthanHargrove/ethanhargrove.com"
        />
      ),
    },
  ];

  return (
    <>
      <div
        className="blur-background"
        style={{
          position: "fixed",
          backgroundImage: "url(./images/CyberpunkBackground.png)",
        }}
      />
      <Navbar active="projects" />
      <div
        className="content"
        style={{ overflow: "hidden", paddingTop: "25px" }}
      >
        <div>
          <Carousel3D
            cards={cards}
            height="100vh"
            width="90%"
            margin="0 auto"
            offset={200}
            showArrows={false}
          />
        </div>
      </div>
    </>
  );
}

export default Projects;
