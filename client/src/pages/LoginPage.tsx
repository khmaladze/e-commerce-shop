import React, { FC, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

export const LoginPage: FC = () => {
  const { dispatch } = useContext(UserContext);
  const history = useHistory();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const PostData = () => {
    fetch("/api/auth/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        userPassword: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.warn(data.error);
        } else if (data.message) {
          toast.warn(data.message);
        } else {
          console.log(data);
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.userData));
          if (data.shopList[0]) {
            localStorage.setItem("shop", JSON.stringify(data.shopList[0]));
          }
          dispatch({ type: "USER", payload: data.userData });
          toast.success("LOG IN SUCCESS");
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
