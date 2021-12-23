import React, { FC, useState, useContext } from "react";
import { UserContext } from "../App";
export const CreateShopPage: FC = () => {
  const { state, dispatch } = useContext(UserContext);
  const renderList = () => {
    if (state.user_id) {
    }
  };
  return <div>hello this is shop page</div>;
};
