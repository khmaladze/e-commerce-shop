import React, { FC } from "react";
import img1 from "../assets/img1.jpg";

export const LowestPrice: FC = () => {
  return (
    <div>
      <h1 className="container__shop__text">Lowest Price</h1>
      <div className="container__shop">
        <div
          className="card__container"
          style={{
            backgroundImage: `url(${img1})`,
          }}
        >
          <h3>T-SHIRT</h3>
          <h4>$10</h4>
        </div>
        <div
          className="card__container"
          style={{
            backgroundImage: `url(${img1})`,
          }}
        >
          <h3>T-SHIRT</h3>
          <h4>$10</h4>
        </div>
        <div
          className="card__container"
          style={{
            backgroundImage: `url(${img1})`,
          }}
        >
          <h3>T-SHIRT</h3>
          <h4>$10</h4>
        </div>
      </div>
    </div>
  );
};
