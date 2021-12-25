import React, { FC, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

export const RegisterPage: FC = () => {
  const history = useHistory();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [userAddress, setUserAddress] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [userCard, setUserCard] = useState<string>("");
  const [cardPassword, setCardPassword] = useState<string>("");
  const [budget, setBudget] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const PostData = () => {
    // convert Date to yyyy/mm/dd format
    let validDate = `${birthDate.slice(0, 4)}-${birthDate.slice(
      5,
      7
    )}-${birthDate.slice(8, 10)}`;
    console.log(
      firstName,
      lastName,
      validDate,
      country,
      userAddress,
      email,
      userPassword,
      userCard,
      cardPassword,
      budget,
      confirmPassword
    );
    fetch("http://localhost:5000/api/authRoute/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          history.push("/");
          window.scrollTo({ top: 0, behavior: "smooth" });
          toast.success("USER REGISTER SUCCESSFULLY");
        }
        if (data.message) {
          toast.warn(data.message);
        }
        if (data.error) {
          if (data.error.details[0].message) {
            toast.warn(data.error.details[0].message);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.message) {
          toast.warn(err.message);
        }
        if (err.error) {
          if (err.error.details[0].message) {
            toast.warn(err.error.details[0].message);
          }
        }
      });
  };

  const handleClick = (e: any) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="auth-card-center">
      <div className="auth-card">
        <h2>Register</h2>
        <input
          type="text"
          placeholder="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="date"
          min="1950-01-01"
          max="2010-12-31"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
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
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="card"
          value={userCard}
          onChange={(e) => setUserCard(e.target.value)}
        />
        <input
          type="text"
          placeholder="card password"
          value={cardPassword}
          onChange={(e) => setCardPassword(e.target.value)}
        />
        <input
          type="number"
          placeholder="budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />
        <input
          type="password"
          placeholder="confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button className="signinbutton" onClick={() => PostData()}>
          Register
        </button>
        <h5>
          <Link to="/login"> have an account ?</Link>
        </h5>
        <div>
          <h3 onClick={(e) => handleClick(e)} style={{ marginTop: "10px" }}>
            <Link to="/">Home Page</Link>
          </h3>
        </div>
      </div>
    </div>
  );
};
