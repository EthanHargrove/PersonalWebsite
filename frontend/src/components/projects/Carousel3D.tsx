import Carousel from "react-spring-3d-carousel";
import { useState, useEffect } from "react";
import { config } from "react-spring";
import { useSwipeable } from "react-swipeable";

interface Carousel3DProps {
  cards: any;
  height: string;
  width: string;
  margin: string;
  offset: number;
  showArrows: boolean;
}

export default function Carousel3D(props: Carousel3DProps) {
  const table = props.cards.map((element: any, index: number) => {
    return { ...element, onClick: () => handleClick(index) };
  });

  const [offsetRadius, setOffsetRadius] = useState(4);
  const [showArrows, setShowArrows] = useState(false);
  const [goToSlide, setGoToSlide] = useState<number>(0);
  const [cards] = useState(table);

  useEffect(() => {
    setOffsetRadius(props.offset);
    setShowArrows(props.showArrows);
  }, [props.offset, props.showArrows]);

  const handleClick = (index: number) => {
    setGoToSlide(index);
  };

  const handlers = useSwipeable({
    onSwipedLeft: (eventData) => setGoToSlide(goToSlide + 1),
    onSwipedRight: (eventData) => setGoToSlide(goToSlide - 1),
    trackMouse: true,
    ...config,
  });

  return (
    <div
      className="no-highlight"
      style={{ width: props.width, height: props.height, margin: props.margin }}
      {...handlers}
    >
      <Carousel
        slides={cards}
        goToSlide={goToSlide}
        offsetRadius={offsetRadius}
        showNavigation={showArrows}
        animationConfig={config.gentle}
      />
    </div>
  );
}
