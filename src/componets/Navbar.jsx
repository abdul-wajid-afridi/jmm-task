import React, { useState } from "react";
import {
  FaArrowDown,
  FaArrowUp,
  FaHome,
  FaSearch,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import "../styles/Navbar.css";

const Navbar = () => {
  const [search, setSearch] = useState(true);
  const [dropDown, setDropDwon] = useState(false);
  return (
    <div className="navbar">
      <div
        onClick={(e) => setSearch(!search)}
        className={search ? "search__input" : "actives"}
      >
        <input className={search ? "searchInput" : "actives"} type="text" />
        <span className={search ? "search__span" : "actives"}>
          <FaSearch />
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div>
          <p>{"اربے"}</p>
        </div>
        <div className="dropdown__main">
          <span onClick={() => setDropDwon(!dropDown)}>
            {!dropDown ? <FaArrowDown /> : <FaArrowUp />}
          </span>
          <div className={dropDown ? "dropdown__items" : "hideDropDwon"}>
            <p>
              <span>{<FaHome />}</span> khan
            </p>
            <p>
              <span>{<FaUser />}</span>profile
            </p>
            <p>
              <span>{<FaSignOutAlt />}</span>log-out
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
