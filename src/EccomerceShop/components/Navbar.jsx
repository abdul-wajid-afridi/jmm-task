import React, { useContext } from "react";
import {
  FaCartArrowDown,
  FaFacebook,
  FaHamburger,
  FaInstagram,
  FaTimes,
  FaWhatsapp,
} from "react-icons/fa";

import "../styles/Navbar.css";

import { Link } from "react-router-dom";
import { useState } from "react";
import { CartStore } from "../context/CartStore";
import { AppStore } from "../context/AppStore";
import { useEffect } from "react";
const Navbar = () => {
  const [icon, setIcon] = useState(false);
  const { state } = useContext(CartStore);
  const { AppState, AppDispatch } = useContext(AppStore);
  const {
    cart: { cartItems },
  } = state;

  // console.log(AppState?.userInfo?.token);
  // console.log(localStorage.getItem("userInfo"));
  const handleLogout = () => {
    AppDispatch({ type: "USER_LOGOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingInfo");
    localStorage.removeItem("cartItems");
    window.location.href = "/login";
  };

  return (
    <section className="navbar__main">
      {/* logo */}
      <div className="navbar__logo">
        <p>
          <Link to={"/"}>All-Hadi</Link>
        </p>
        <span onClick={() => setIcon(!icon)} className="navbar__icon">
          <FaHamburger />
        </span>
      </div>
      {/* navbar for toggle  */}
      <nav
        onClick={() => setIcon(!icon)}
        className={icon ? "navbar__menu navbar__active" : "navbar__menu"}
      >
        <div className="navbar__items__container">
          <Link className="navbar__item" to="/">
            Home
          </Link>

          {AppState?.userInfo?.token ? (
            <>
              <Link className="navbar__item" to="/login" onClick={handleLogout}>
                Log out
              </Link>
              {AppState?.userInfo?.token && (
                <div>
                  <Link to={"/add-product"}>Add Product</Link>
                  <Link to={"/login"}>User</Link>
                  <Link to={"/products"}>Products</Link>
                  {/* <select name="" id="">
                <option value="">
                  <Link to={"/add-product"}>Add Product</Link>
                </option>
                <option value="">
                  <Link to={"/login"}>User</Link>
                </option>
                <option value="">
                  <Link to={"/products"}>Products</Link>
                </option>
              </select> */}
                </div>
              )}
            </>
          ) : (
            <Link className="navbar__item" to="/login">
              Login
            </Link>
          )}
          <Link className="navbar__item" to="/signup">
            Sign up
          </Link>
        </div>
        <div className="flex gap-5 sm:gap-10">
          {/* social Icons  */}
          <div className="navbar__social__icons">
            <span>
              <FaFacebook />
            </span>
            <span>
              <FaWhatsapp />
            </span>
            <span>
              <FaInstagram />
            </span>
          </div>
          <Link className="navbar__cart" to="/cart">
            <FaCartArrowDown />
            <span>{cartItems.length}</span>
          </Link>
        </div>
      </nav>
    </section>
  );
};

export default Navbar;
