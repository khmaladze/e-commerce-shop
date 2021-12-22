import React, { FC } from "react";
import { Link } from "react-router-dom";

export const ProfileContainer: FC = () => {
  return (
    <div className="profile__container__component">
      <div className="profile__container__component__card">
        <Link to={"/shop"}>Create Shop</Link>
      </div>
      <div className="profile__container__component__card">
        <Link to={"/shop"}>My Shop</Link>
      </div>
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
