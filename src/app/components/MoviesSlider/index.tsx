import { FC, ReactNode } from "react";
import { Swiper } from "swiper/react";
import { Box } from "@mantine/core";

import "swiper/css";

import styles from "./styles.module.scss";

interface MoviesSliderProps {
  children: ReactNode;
}

const MoviesSlider: FC<MoviesSliderProps> = ({ children }) => (
  <Swiper
    freeMode={true}
    grabCursor={true}
    spaceBetween={15}
    breakpoints={{
      1336: {
        slidesPerView: 7.5,
      },
      1024: {
        slidesPerView: 5.5,
      },
      768: {
        slidesPerView: 4.5,
      },
      420: {
        slidesPerView: 3.5,
      },
    }}
  >
    {children}
  </Swiper>
);

export default MoviesSlider;
