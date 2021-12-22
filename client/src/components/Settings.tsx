import React, { FC, useState, useContext } from "react";
import { UserContext } from "../App";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

export const Settings: FC = () => {
  const history = useHistory();

  const { state, dispatch } = useContext(UserContext);
  const [country, setCountry] = useState<string>(state?.country);
  const [userAddress, setUserAddress] = useState<string>(state?.user_address);
  const [userPassword, setUserPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const userId = state.user_id;
  const PostData = () => {
    // fetch(`http://localhost:5000/api/userRoute/user?Id=${userId}`, {
    fetch(`http://localhost:5000/api/userRoute/user/:${userId}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        country,
        userAddress,
        userPassword,
        confirmPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.warn(data.error);
        } else if (data.message) {
          toast.warn(data.message);
        } else {
          dispatch({
            type: "UPDATE",
            payload: {
              country: data.data.country,
              user_address: data.data.user_address,
              user_password: data.data.user_password,
            },
          });
          localStorage.setItem("user", JSON.stringify(data.data));
          toast.success("SETTINGS UPDATED SUCCESSFULLY");
          history.push("/profile");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="settings__page">
      <div className="auth-card">
        <h3>Update User Data</h3>
        <input
          type="text"
          placeholder="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <input
          type="text"
          placeholder="address"
          value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
        />
        <input
          type="password"
          placeholder="confirm password or enter new password"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button className="signinbutton" onClick={() => PostData()}>
          Update
        </button>
      </div>
    </div>
  );
};
