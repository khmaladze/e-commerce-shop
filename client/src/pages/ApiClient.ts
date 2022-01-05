import axios from "axios";
import { serverUrl } from "../App";
interface UserLogin {
  email: string;
  userPassword: string;
}

export const postUserLogin = async (email: string, password: string) => {
  const userLogin: UserLogin = {
    email,
    userPassword: password,
  };
  return await axios.post(`${serverUrl}/api/auth/login`, userLogin);
};
