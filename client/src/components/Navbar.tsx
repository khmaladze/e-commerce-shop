import React, { FC, useState, useContext } from "react";
import logo from "../assets/logo1.png";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import { toast } from "react-toastify";

export const Navbar: FC = () => {
  const { state, dispatch } = useContext<any>(UserContext);
  const history = useHistory();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const renderList = () => {
    if (state?.user_id) {
      return [
        <div key="1">
          <div>
            <header>
              <nav>
                <div className="navbar">
                  <div className="navbar__content__left">
                    <div className="navbar__logo">
                      <Link to={"/"}>
                        {" "}
                        <img src={logo} alt="logo for this website" />
                      </Link>
                    </div>
                    <ul>
                      <li>
                        <Link to={"/products"}>Products</Link>
                      </li>
                      <li>
                        <Link to={"/shop"}>Shop</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="navbar__content__right">
                    <ul>
                      <li>
                        <Link to={"/post/products"}>add products</Link>
                      </li>
                      <li>
                        <Link to={"/profile"}>Profile</Link>
                      </li>
                      <li
                        onClick={() => {
                          localStorage.clear();
                          dispatch({ type: "CLEAR" });
                          history.push("/");
                          toast.success("LOG OUT SUCCESS");
                        }}
                      >
                        Sign Out
                      </li>
                    </ul>
                    {isOpen ? (
                      <HiOutlineMenuAlt4 onClick={(e) => closeNav(e)} />
                    ) : (
                      <HiOutlineMenuAlt4 onClick={(e) => handleClick(e)} />
                    )}
                  </div>
                </div>
              </nav>
            </header>
            <div className="responsive__navbar">
              <ul className="responsive__navbar__content">
                <li
                  className="responsive__navbar__content"
                  onClick={(e) => closeNav(e)}
                >
                  {" "}
                  <Link to={"/products"}>Products</Link>
                </li>
                <li
                  onClick={(e) => closeNav(e)}
                  className="responsive__navbar__content"
                >
                  <Link to={"/shop"}>Shop</Link>
                </li>
                <li
                  onClick={(e) => closeNav(e)}
                  className="responsive__navbar__content"
                >
                  <Link to={"/post/products"}>add products</Link>
                </li>
                <li
                  onClick={(e) => closeNav(e)}
                  className="responsive__navbar__content"
                >
                  <Link to={"/profile"}>Profile</Link>
                </li>
                <li
                  className="responsive__navbar__content"
                  onClick={(e) => {
                    localStorage.clear();
                    dispatch({ type: "CLEAR" });
                    history.push("/");
                    closeNav(e);
                    toast.success("LOG OUT SUCCESS");
                  }}
                >
                  Sign Out
                </li>
              </ul>
            </div>
          </div>
        </div>,
      ];
    } else {
      return [
        <div key="1">
          <div>
            <header>
              <nav>
                <div className="navbar">
                  <div className="navbar__content__left">
                    <div className="navbar__logo">
                      <Link to={"/"}>
                        {" "}
                        <img src={logo} alt="logo for this website" />
                      </Link>
                    </div>
                    <ul>
                      <li>
                        <Link to={"/products"}>Products</Link>
                      </li>
                      <li>
                        <Link to={"/shop"}>Shop</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="navbar__content__right">
                    <ul>
                      <li>
                        <Link to={"/login"}>Login</Link>
                      </li>
                      <li>
                        <Link to={"/register"}>Register</Link>
                      </li>
                    </ul>
                    {isOpen ? (
                      <HiOutlineMenuAlt4 onClick={(e) => closeNav(e)} />
                    ) : (
                      <HiOutlineMenuAlt4 onClick={(e) => handleClick(e)} />
                    )}
                  </div>
                </div>
              </nav>
            </header>
            <div className="responsive__navbar">
              <ul className="responsive__navbar__content">
                <li className="responsive__navbar__content">
                  {" "}
                  <Link onClick={(e) => closeNav(e)} to={"/products"}>
                    Products
                  </Link>
                </li>
                <li
                  onClick={(e) => closeNav(e)}
                  className="responsive__navbar__content"
                >
                  <Link to={"/shop"}>Shop</Link>
                </li>
                <li
                  onClick={(e) => closeNav(e)}
                  className="responsive__navbar__content"
                >
                  <Link to={"/login"}>Login</Link>
                </li>
                <li
                  onClick={(e) => closeNav(e)}
                  className="responsive__navbar__content"
                >
                  <Link to={"/register"}>Register</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>,
      ];
    }
  };
  const handleClick = (e: any) => {
    e.preventDefault();
    setIsOpen(true);
    document.querySelector<HTMLElement | any>("html").style.overflow = "hidden";
    let responsiveNavbar: HTMLElement = document.querySelector<
      HTMLElement | any
    >("div.responsive__navbar");
    responsiveNavbar.style.display = "flex";
    responsiveNavbar.style.height = "calc(100vh - 80px)";
    responsiveNavbar.style.opacity = "1";
    let responsiveNavbarContentUl = document.querySelector<HTMLElement | any>(
      "ul.responsive__navbar__content"
    );
    responsiveNavbarContentUl.style.opacity = "1";
    responsiveNavbarContentUl.style.display = "block";
    let responsiveNavbarContentLi = document.querySelectorAll<
      HTMLElement | any
    >("li.responsive__navbar__content");
    for (let i = 0; i < responsiveNavbarContentLi.length; i++) {
      responsiveNavbarContentLi[i].style.opacity = "1";
      responsiveNavbarContentLi[i].style.display = "block";
    }
  };

  const closeNav = (e: any) => {
    e.preventDefault();
    setIsOpen(false);
    document.querySelector<HTMLElement | any>("html").style.overflow =
      "visible";
    let responsiveNavbar: HTMLElement = document.querySelector<
      HTMLElement | any
    >("div.responsive__navbar");
    responsiveNavbar.style.display = "none";
    responsiveNavbar.style.height = "0";
    responsiveNavbar.style.opacity = "0";
    let responsiveNavbarContentUl = document.querySelector<HTMLElement | any>(
      "ul.responsive__navbar__content"
    );

    responsiveNavbarContentUl.style.opacity = "0";
    responsiveNavbarContentUl.style.display = "none";

    let responsiveNavbarContentLi = document.querySelectorAll<
      HTMLElement | any
    >("li.responsive__navbar__content");
    for (let i = 0; i < responsiveNavbarContentLi.length; i++) {
      responsiveNavbarContentLi[i].style.opacity = "0";
      responsiveNavbarContentLi[i].style.display = "none";
    }
  };
  return <div>{renderList()}</div>;
};
