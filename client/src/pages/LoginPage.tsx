import React, { FC, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { serverUrl, UserContext } from "../App";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
toast.configure();

export const LoginPage: FC = () => {
  const { dispatch } = useContext(UserContext);
  const history = useHistory();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  interface UserLogin {
    email: string;
    userPassword: string;
  }

  const PostData = () => {
    if (email.length > 1 && password.length > 7) {
      const postUserLogin = async () => {
        try {
          const userLogin: UserLogin = {
            email,
            userPassword: password,
          };
          const res = await axios.post(
            `${serverUrl}/api/auth/login`,
            userLogin
          );
          if (res.status == 200) {
            history.push("/");
            window.scrollTo({ top: 0, behavior: "smooth" });
            toast.success("user log in successfully");
            if (res.data.token != undefined) {
              localStorage.setItem("jwt", res.data.token);
            }
            if (res.data.user != undefined) {
              localStorage.setItem("user", JSON.stringify(res.data.user));
            }

            if (res.data.shop) {
              localStorage.setItem("shop", JSON.stringify(res.data.shop));
            }
            dispatch({ type: "USER", payload: res.data.user });
          }
        } catch (error: any) {
          if (error.response.data) {
            toast.warn(error.response.data.detail[0].message);
          } else {
            toast.warn("Please Use Valid Credentials");
          }
        }
      };
      postUserLogin();
    } else {
      toast.warn("Please Add All the fields and use valid credentials");
    }
  };

  return (
    <div className="auth-card-center">
      <div className="auth-card">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="signinbutton" onClick={() => PostData()}>
          LOG IN
        </button>
        <h5>
          <Link to="/register">Dont have an account ?</Link>
        </h5>
        <div>
          <h3 style={{ marginTop: "10px" }}>
            <Link to="/">Home Page</Link>
          </h3>
        </div>
      </div>
    </div>
  );
};
