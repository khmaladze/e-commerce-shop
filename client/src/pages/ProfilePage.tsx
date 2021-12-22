import React, { FC } from "react";
import { ProfileContainer } from "../components/ProfileContainer";
import { ProfileHeader } from "../components/ProfileHeader";

export const ProfilePage: FC = () => {
  return (
    <div>
      <ProfileHeader />
      <ProfileContainer />
    </div>
  );
};
