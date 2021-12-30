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
    if (email.length > 1 && password.length > 7) {
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
          console.log(data);
          if (data.detail) {
            if (data.detail[0].message) {
              toast.warn(data.detail[0].message);
            }
          }
          if (data.success) {
            console.log(data.success);
            if (data.token != undefined) {
              localStorage.setItem("jwt", data.token);
            }
            if (data.user != undefined) {
              localStorage.setItem("user", JSON.stringify(data.user));
            }

            if (data.shop) {
              localStorage.setItem("shop", JSON.stringify(data.shop));
            }
            dispatch({ type: "USER", payload: data.user });
            toast.success("LOG IN SUCCESS");
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
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
