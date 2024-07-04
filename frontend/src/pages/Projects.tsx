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
          slide={1}
          colour="var(--neon-purple)"
          imagen="https://updates.theme-fusion.com/wp-content/uploads/2017/12/layer_slider_plugin_thumb.png"
          page="/tic-tac-toe"
          title="Explainable AI: Sudoku"
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
          colour="var(--neon-green)"
          imagen="./images/AoC-2023.png"
          page="/tic-tac-toe"
          title="Haskell: AoC 2023"
          description="Second card."
          button1Title="Coming Soon"
          button1Link=""
          button2Title="Coming Soon"
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
      <div className="cyberpunk-background" />
      <Navbar active="projects" />
      <div className="content" style={{ overflow: "hidden" }}>
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
