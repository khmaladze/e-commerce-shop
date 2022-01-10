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
