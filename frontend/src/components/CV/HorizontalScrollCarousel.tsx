import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import { Stack } from "@mui/material";
import "../../styles/horizontal-scroll-carousel.css";

interface HorizontalScrollCarouselProps {
  title: string;
  items: any[];
}

const HorizontalScrollCarousel: React.FC<HorizontalScrollCarouselProps> = ({
  title,
  items,
}) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0px", "-4100px"]);

  return (
    <section ref={targetRef} className="scrollSection">
      <div className="scroller">
        <Stack>
          <h1>{title}</h1>
          <motion.div style={{ x }} className="scroller2">
            {items.map((item) => {
              return item;
            })}
          </motion.div>
        </Stack>
      </div>
    </section>
  );
};

export default HorizontalScrollCarousel;
