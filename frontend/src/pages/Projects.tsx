import Card from "../components/Card";
import Carousel3D from "../components/Carousel3D";

function Projects() {
  let cards = [
    {
      key: 1,
      content: (
        <Card 
          colour="var(--neon-orange)"
          imagen="https://updates.theme-fusion.com/wp-content/uploads/2017/12/convertplus_thumbnail.jpg" 
        />
      ),
    },
    {
      key: 2,
      content: (
        <Card 
          colour="var(--neon-purple)"
          imagen="https://updates.theme-fusion.com/wp-content/uploads/2017/12/acf_pro.png" 
        />
      ),
    },
    {
      key: 3,
      content: (
        <Card 
          colour="var(--neon-green)"
          imagen="https://updates.theme-fusion.com/wp-content/uploads/2017/12/layer_slider_plugin_thumb.png" 
        />
      ),
    },
    {
      key: 4,
      content: (
        <Card
          colour="var(--neon-pink)"
          imagen="https://updates.theme-fusion.com/wp-content/uploads/2016/08/slider_revolution-1.png" 
        />
      ),
    },
    {
      key: 5,
      content: (
        <Card 
          colour="var(--neon-blue)"
          imagen="https://updates.theme-fusion.com/wp-content/uploads/2019/01/pwa_880_660.jpg" 
        />
      ),
    }
  ];
  return (
    <div className="">
      <Carousel3D
        cards={cards}
        height="100vh"
        width="100%"
        margin="0 auto"
        offset={200}
        showArrows={false}
      />
    </div>
  );
}

export default Projects;
