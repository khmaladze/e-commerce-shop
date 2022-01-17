import axios from "axios";
import { serverUrl } from "../App";

interface UserLogin {
  email: string;
  userPassword: string;
}

interface UserRegister {
  firstName: string;
  lastName: string;
  birthDate: string;
  country: string;
  userAddress: string;
  email: string;
  userPassword: string;
  userCard: string;
  cardPassword: string;
  budget: string;
  confirmPassword: string;
}

interface UserUpdate {
  country: string;
  userAddress: string;
  userImage: string;
  userPassword: string;
  confirmPassword: string;
}

export const postUserLogin = async (email: string, password: string) => {
  const userLogin: UserLogin = {
    email,
    userPassword: password,
  };
  return await axios.post(`${serverUrl}/api/auth/login`, userLogin);
};

export const postUserRegisterFunction = async (
  firstName: string,
  lastName: string,
  validDate: string,
  country: string,
  userAddress: string,
  email: string,
  userPassword: string,
  userCard: string,
  cardPassword: string,
  budget: string,
  confirmPassword: string
) => {
  const userRegister: UserRegister = {
    firstName,
    lastName,
    birthDate: validDate,
    country,
    userAddress,
    email,
    userPassword,
    userCard,
    cardPassword,
    budget,
    confirmPassword,
  };
  return await axios.post(`${serverUrl}/api/auth/register`, userRegister);
};

export const postSettingUpdate = async (
  userId: string | number,
  country: string,
  userAddress: string,
  userPassword: string,
  confirmPassword: string
) => {
  const userUpdate: UserUpdate = {
    country,
    userAddress,
    userImage: "same",
    userPassword,
    confirmPassword,
  };
  return await axios.put(`/api/user/profile/update/${userId}`, userUpdate, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  });
};
