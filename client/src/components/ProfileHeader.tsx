import React, { FC, useContext } from "react";
import { UserContext } from "../App";
import { RootStateOrAny, useSelector } from "react-redux";

export const ProfileHeader: FC = () => {
  const { state } = useContext(UserContext);
  const user = useSelector((state: RootStateOrAny) => state.user.value);
  console.log(user);
  return (
    <div>
      <div className="profile__header">
        <div
          className="profile__header__image"
          style={{
            backgroundImage: `url(${
              state?.user_image == null
                ? "https://res.cloudinary.com/dtlhyd02w/image/upload/v1638523630/frdmwjc5jtxv0eobisd0.png"
                : user.user_image
                ? user.user_image
                : state?.user_image
            })`,
          }}
        ></div>
        <div className="profile__header__info">
          <h3>user_id: {user?.user_id}</h3>
          <h3>first_name: {user?.first_name}</h3>
          <h3>last_name: {user?.last_name}</h3>
          <h3>country: {user?.country}</h3>
          <h3>address: {user?.user_address}</h3>
          <h3>user_card: {user?.user_card}</h3>
          <h3>budget: {user?.budget}$</h3>
        </div>
      </div>
    </div>
  );
};
