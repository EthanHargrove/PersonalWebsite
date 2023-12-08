import Card from "../components/Card";
import Carousel3D from "../components/Carousel3D";
import Navbar from "../components/Navbar";

function Projects() {
  let cards = [
    {
      key: 1,
      content: (
        <Card 
          colour="var(--neon-orange)"
          imagen="https://github.com/EthanHargrove/PersonalWebsite/blob/main/frontend/src/assets/tic-tac-toe.png" 
          title="Q-Learning: Tic-Tac-Toe"
          description="First card."
        />
      ),
    },
    {
      key: 2,
      content: (
        <Card 
          colour="var(--neon-purple)"
          imagen="https://updates.theme-fusion.com/wp-content/uploads/2017/12/acf_pro.png" 
          title="Card 2"
          description="Second card."
        />
      ),
    },
    {
      key: 3,
      content: (
        <Card 
          colour="var(--neon-green)"
          imagen="https://updates.theme-fusion.com/wp-content/uploads/2017/12/layer_slider_plugin_thumb.png" 
          title="Card 3"
          description="Third card."
        />
      ),
    },
    {
      key: 4,
      content: (
        <Card
          colour="var(--neon-pink)"
          imagen="https://updates.theme-fusion.com/wp-content/uploads/2016/08/slider_revolution-1.png" 
          title="Card 4"
          description="Fourth card."
        />
      ),
    },
    {
      key: 5,
      content: (
        <Card 
          colour="var(--neon-blue)"
          imagen="https://updates.theme-fusion.com/wp-content/uploads/2019/01/pwa_880_660.jpg" 
          title="Card 5"
          description="Fifth card."
        />
      ),
    }
  ];
  return (
    <>
      <div className="cyberpunk-background"></div>
      <Navbar active="projects"/>
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
