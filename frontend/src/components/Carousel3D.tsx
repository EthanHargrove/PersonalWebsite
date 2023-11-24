import Carousel from 'react-spring-3d-carousel';
import { useState, useEffect } from 'react';
import { config } from 'react-spring';

interface Carousel3DProps {
    cards: any;
    height: string;
    width: string;
    margin: string;
    offset: number;
    showArrows: boolean;
}

export default function Carousel3D(props: Carousel3DProps) {
    const table = props.cards.map((element:any, index: number) => {
        return { ...element, onClick: () => setGoToSlide(index) };
      });
    
      const [offsetRadius, setOffsetRadius] = useState(4);
      const [showArrows, setShowArrows] = useState(false);
      const [goToSlide, setGoToSlide] = useState<number|undefined>(undefined);
      const [cards] = useState(table);
    
      useEffect(() => {
        setOffsetRadius(props.offset);
        setShowArrows(props.showArrows);
      }, [props.offset, props.showArrows]);
    
      return (
        <div
          style={{ width: props.width, height: props.height, margin: props.margin }}
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