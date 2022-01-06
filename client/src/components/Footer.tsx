import React, { FC } from "react";
import logo from "../assets/logo1.png";

export const Footer: FC = () => {
  return (
    <div style={{ marginTop: "100px" }}>
      <footer>
        <div className="footer">
          <div className="footer__content__left">
            <div className="footer__logo">
              <img src={logo} alt="logo for this website" />
            </div>
          </div>
          <div className="footer__content__right">
            <ul>
              <li>Login</li>
              <li>Register</li>
              <li>Privacy</li>
              <li>Terms and Agreements</li>
              <li>test@test.test</li>
              <li>+123 456 789 012</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};
