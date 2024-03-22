import React, { ReactNode } from "react";
import Slider from "react-slick";
import { styled } from "@mui/system";

import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";

interface BannerProps {
  items: any[];
  title: string;
  settings: { [key: symbol]: any };
}

function Banner(props: BannerProps) {
  return (
    <div className="slider-container">
      <h2
        className="heading cv-heading"
        style={{ marginTop: "44px", marginBottom: "15px" }}
      >
        {props.title}
      </h2>
      <Slider {...props.settings}>
        {props.items.map((item) => {
          return item;
        })}
      </Slider>
    </div>
  );
}
export default Banner;
