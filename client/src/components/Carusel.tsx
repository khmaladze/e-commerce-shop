import React, { FC, useState } from "react";
import { SliderData } from "./SliderData";
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";

export const Carusel: FC = () => {
  const [current, setCurrent] = useState<number>(0);
  const imageLength = SliderData.length;

  const nextSlide = () => {
    setCurrent(current === imageLength - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? imageLength - 1 : current - 1);
  };

  return (
    <section className="slider">
      {SliderData.map((slide, index) => {
        return (
          <div
            className={index === current ? "slide active" : "slide"}
            key={index}
          >
            <RiArrowLeftSLine
              className="slider-left-arrow"
              onClick={prevSlide}
            />
            {index === current && (
              <img src={slide.image} alt="justImage" key={index} />
            )}
            <RiArrowRightSLine
              className="slider-right-arrow"
              onClick={nextSlide}
            />
          </div>
        );
      })}
    </section>
  );
};
