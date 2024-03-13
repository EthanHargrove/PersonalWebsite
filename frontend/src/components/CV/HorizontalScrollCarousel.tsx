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

  const maxScroll = Math.round(
    6.60346 * window.innerHeight - 1.02381 * window.innerWidth + 151.383
  );

  const x = useTransform(scrollYProgress, [0, 1], ["0px", `-${maxScroll}px`]);

  return (
    <section ref={targetRef} className="scrollSection">
      <div className="scroller">
        <Stack>
          <h2>{title}</h2>
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
