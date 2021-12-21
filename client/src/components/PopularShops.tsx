import React, { FC } from "react";
import img1 from "../assets/img1.jpg";

export const PopularShops: FC = () => {
  return (
    <div>
      <h1 className="container__shop__text">Popular Shops</h1>
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
            backgroundImage: `url(${img1})`,
          }}
        ></div>
        <div
          className="shop__container"
          style={{
            backgroundImage: `url(${img1})`,
          }}
        ></div>
        <div
          className="shop__container"
          style={{
            backgroundImage: `url(${img1})`,
          }}
        ></div>
        <div
          className="shop__container"
          style={{
            backgroundImage: `url(${img1})`,
          }}
        ></div>
      </div>
    </div>
  );
};
