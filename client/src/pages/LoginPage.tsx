import React, { FC, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import { toast } from "react-toastify";
import { postUserLogin } from "./ApiClient";
toast.configure();

export const LoginPage: FC = () => {
  const { dispatch } = useContext(UserContext);
  const history = useHistory();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const PostData = async () => {
    if (email.length > 1 && password.length > 7) {
      try {
        const res = await postUserLogin(email, password);
        console.log('postUserLogin res.status ', res.status)
        history.push("/");
        window.scrollTo({ top: 0, behavior: "smooth" });
        toast.success("user log in successfully");
        if (res.data.token) {
          localStorage.setItem("jwt", res.data.token);
        }
        if (res.data.user) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
        }

        if (res.data.shop) {
          localStorage.setItem("shop", JSON.stringify(res.data.shop));
        }
        dispatch({ type: "USER", payload: res.data.user });
      } catch (error: any) {
        if (error.response.data) {
          for (let errDetail of error.response.data.detail) {
            toast.warn(errDetail.message);
          }
        } else {
          toast.warn("Please Use Valid Credentials");
        }
      }
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
