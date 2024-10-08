import { useState, useEffect } from "react";

import {
  SCREEN_SM,
  SCREEN_MD,
  SCREEN_LG,
  SCREEN_XL,
  SCREEN_XXL,
} from "../const";

const useResize = () => {
  const [width, setWidth] = useState(0);

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    handleWindowResize();

    const handleResize = (e: UIEvent) => {
      const size = e.target as Window;

      setWidth(size.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return {
    width,
    isScreenSm: width <= SCREEN_SM,
    isScreenMd: width <= SCREEN_MD,
    isScreenLg: width <= SCREEN_LG,
    isScreenXl: width <= SCREEN_XL,
    isScreenXxl: width <= SCREEN_XXL,
  };
};

export default useResize;
