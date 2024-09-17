import React, { useCallback, useEffect, useState } from "react";
import Slider from "react-slick";
import { useSpring, animated } from "react-spring";

import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";

interface BannerProps {
  items: any[];
  title: string;
  settings: { [key: symbol]: any };
}

function Banner(props: BannerProps) {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const debounce = (func: any, wait: any) => {
    let timeout: any;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const handleResize = useCallback(
    debounce(() => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, 1000),
    []
  );

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  const titleStyle = useSpring({
    from: {
      opacity: 0,
      transform: "scale(0.5)",
    },
    to: {
      opacity: 1,
      transform: "scale(1)",
    },
    delay: dimensions.width < dimensions.height ? 1000 : 0,
  });

  const contentStyle = useSpring({
    from: {
      opacity: 0,
      transform: "scale(0.5)",
    },
    to: {
      opacity: 1,
      transform: "scale(1)",
    },
    delay: dimensions.width < dimensions.height ? 1150 : 800,
  });

  return (
    <div className="slider-container">
      <animated.div style={titleStyle}>
        <h2
          className="heading cv-heading"
          style={{ marginTop: "44px", marginBottom: "15px" }}
        >
          {props.title}
        </h2>
      </animated.div>
      <animated.div style={contentStyle}>
        <Slider {...props.settings}>
          {props.items.map((item) => {
            return item;
          })}
        </Slider>
      </animated.div>
    </div>
  );
}
export default Banner;
