import React, { FC } from "react";
import { Link } from "react-router-dom";

export const ProfileContainer: FC = () => {
  const isShop = localStorage.getItem("shop" || "{}");
  const renderList = () => {
    if (isShop) {
      return [
        <div key={"1"} className="profile__container__component__card">
          <Link to={"/my/shop"}>My Shop</Link>
        </div>,
      ];
    } else {
      return [
        <div key={"1"} className="profile__container__component__card">
          <Link to={"/add/shop"}>Create Shop</Link>
        </div>,
      ];
    }
  };
  return (
    <div className="profile__container__component">
      {renderList()}
      <div className="profile__container__component__card">
        <Link to={"/settings"}>Settings</Link>
      </div>
      <div className="profile__container__component__card">
        <Link to={"/history"}>History</Link>
      </div>
      <div className="profile__container__component__card">
        <Link to={"/add/products"}>Add Products</Link>
      </div>
      <div className="profile__container__component__card">
        <Link to={"/cart"}>Cart</Link>
      </div>
    </div>
  );
};
