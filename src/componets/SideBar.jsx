import React, { useState } from "react";
import {
  FaBars,
  FaDAndDBeyond,
  FaHome,
  FaJediOrder,
  FaMusic,
  FaSatelliteDish,
  FaStore,
  FaTimes,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/SideBar.css";

const SideBar = () => {
  const [icon, seticon] = useState(true);
  return (
    <section className="sideBar">
      <div className="flex justify-between mx-3 my-4">
        <p>Al Musawkaf</p>
        <span className="sideBar__icon" onClick={() => seticon(!icon)}>
          <FaBars />
        </span>
      </div>
      <div className={` ${icon ? "sideBar__menu" : "active"}`}>
        <Link to="/home" className="sideBar__items">
          <span>
            <FaHome />
          </span>
          Home
        </Link>
        <Link to="/" className="sideBar__items">
          <span>
            <FaStore />
          </span>
          online Store
        </Link>
        <Link to="/" className="sideBar__items">
          <span>
            <FaDAndDBeyond />
          </span>
          Stall Managment
        </Link>
        <Link to="/" className="sideBar__items">
          <span>
            <FaMusic />
          </span>
          Media
        </Link>
        <Link to="/" className="sideBar__items">
          <span>
            <FaJediOrder />
          </span>
          Order
        </Link>
        <Link to="/" className="sideBar__items">
          <span>
            <FaSatelliteDish />
          </span>
          Settings
        </Link>
      </div>
    </section>
  );
};

export default SideBar;
