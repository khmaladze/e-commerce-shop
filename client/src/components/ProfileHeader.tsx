import React, { FC, useContext } from "react";
import { UserContext } from "../App";

export const ProfileHeader: FC = () => {
  const { state } = useContext(UserContext);
  return (
    <div>
      <div className="profile__header">
        <div
          className="profile__header__image"
          style={{ backgroundImage: `url(${state?.user_image})` }}
        ></div>
        <div className="profile__header__info">
          <h3>user_id: {state?.user_id}</h3>
          <h3>first_name: {state?.first_name}</h3>
          <h3>last_name: {state?.last_name}</h3>
          <h3>country: {state?.country}</h3>
          <h3>address: {state?.user_address}</h3>
          <h3>user_card: {state?.user_card}</h3>
          <h3>budget: {state?.budget}$</h3>
        </div>
      </div>
    </div>
  );
};
