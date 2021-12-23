import React, { FC } from "react";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/category2.jpg";
import img3 from "../assets/category3.jpg";
export const LatestUploads: FC = () => {
  return (
    <div>
      <h1 className="container__shop__text">Latest Uploads</h1>
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
            backgroundImage: `url(${img2})`,
          }}
        >
          <h3>T-SHIRT</h3>
          <h4>$10</h4>
        </div>
        <div
          className="card__container"
          style={{
            backgroundImage: `url(${img3})`,
          }}
        >
          <h3>T-SHIRT</h3>
          <h4>$10</h4>
        </div>
      </div>
    </div>
  );
};
