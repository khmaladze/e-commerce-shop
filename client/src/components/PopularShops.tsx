import axios from "axios";
import React, { FC, useState, useEffect } from "react";

export const PopularShops: FC = () => {
  const [shop, setShop] = useState<any>([]);
  useEffect(() => {
    const getShops = async () => {
      try {
        const res = await axios.get(`/api/shop`);
      } catch (error) {
        console.log(error);
      }
    };
    getShops();
  }, []);
  return (
    <div>
      <h1 className="container__shop__text">Popular Shops</h1>
      <div className="container__shop">
        {shop.length == 5 ? (
          shop.slice(0, 5).map((item: any) => {
            return (
              <div
                key={item.shop_id}
                className="shop__container"
                style={{
                  backgroundImage: `url(${item.shop_image})`,
                }}
              ></div>
            );
          })
        ) : (
          <div className="container__shop">
            <div
              className="shop__container"
              style={{
                backgroundImage:
                  "url(https://res.cloudinary.com/dtlhyd02w/image/upload/v1638523630/frdmwjc5jtxv0eobisd0.png)",
              }}
            ></div>
            <div
              className="shop__container"
              style={{
                backgroundImage:
                  "url(https://res.cloudinary.com/dtlhyd02w/image/upload/v1638523630/frdmwjc5jtxv0eobisd0.png)",
              }}
            ></div>
            <div
              className="shop__container"
              style={{
                backgroundImage:
                  "url(https://res.cloudinary.com/dtlhyd02w/image/upload/v1638523630/frdmwjc5jtxv0eobisd0.png)",
              }}
            ></div>
            <div
              className="shop__container"
              style={{
                backgroundImage:
                  "url(https://res.cloudinary.com/dtlhyd02w/image/upload/v1638523630/frdmwjc5jtxv0eobisd0.png)",
              }}
            ></div>
            <div
              className="shop__container"
              style={{
                backgroundImage:
                  "url(https://res.cloudinary.com/dtlhyd02w/image/upload/v1638523630/frdmwjc5jtxv0eobisd0.png)",
              }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};
