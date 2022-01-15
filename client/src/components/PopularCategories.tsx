import React, { FC } from "react";
import img1 from "../assets/category1.jpg";
import img2 from "../assets/category2.jpg";
import img3 from "../assets/category3.jpg";
import img4 from "../assets/category4.jpg";
import img5 from "../assets/category5.jpg";
import { Fade } from "react-awesome-reveal";

export const PopularCategories: FC = () => {
  return (
    <div>
      <h1 className="container__shop__text">Popular Categories</h1>
      <Fade cascade>
        <div className="container__shop">
          <div
            className="shop__container"
            style={{
              backgroundImage: `url(${img1})`,
            }}
          ></div>
          <div
            className="shop__container"
            style={{
              backgroundImage: `url(${img2})`,
            }}
          ></div>
          <div
            className="shop__container"
            style={{
              backgroundImage: `url(${img3})`,
            }}
          ></div>
          <div
            className="shop__container"
            style={{
              backgroundImage: `url(${img4})`,
            }}
          ></div>
          <div
            className="shop__container"
            style={{
              backgroundImage: `url(${img5})`,
            }}
          ></div>
        </div>
      </Fade>
    </div>
  );
};
