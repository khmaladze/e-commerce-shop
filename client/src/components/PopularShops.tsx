import React, { FC, useState, useEffect } from "react";
import img1 from "../assets/img1.jpg";

export const PopularShops: FC = () => {
  const [shop, setShop] = useState<any>([]);
  useEffect(() => {
    fetch("/api/shop")
      .then((res) => res.json())
      .then((data) => {
        setShop(data.shop);
      });
  }, []);
  return (
    <div>
      <h1 className="container__shop__text">Popular Shops</h1>
      <div className="container__shop">
        {shop.slice(0, 5).map((item: any) => {
          return (
            <div
              key={item.shop_id}
              className="shop__container"
              style={{
                backgroundImage: `url(${item.shop_image})`,
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};
