import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

function Navbar({showNavBottom}) {
  const [showDropDownNav, setShowDropDownNav] = useState(false);
  const { auth } = useAuth();

  function handleMenuIconClick() {
    setShowDropDownNav((prev) => !prev);
  }

  return (
    <>
      <div className="nav">
        <Link className="link" to="/">
          <h1 onClick={() => setShowDropDownNav(false)}>
            Code<span>Splash</span>
          </h1>
        </Link>
        <ul className={!showDropDownNav ? "menu" : "menu active"}>
          <Link className="link" to="/courses">
            <li onClick={handleMenuIconClick}>Courses</li>
          </Link>
          <Link className="link" to="/playlist">
            <li onClick={handleMenuIconClick}>My Playlist</li>
          </Link>
          <Link style={{display:auth?"":"none"}} className="link" to="/logout">
            <li onClick={handleMenuIconClick}>Log Out</li>
          </Link>
          <Link className="link" to="/login">
            {!auth && <li>Login</li>}
          </Link>
          <Link className="link" to="/join">
            {!auth && <button>Join Now</button>}
          </Link>
        </ul>
        <div className="menu-icon" onClick={handleMenuIconClick}>
          {!showDropDownNav ? <FaBars /> : <FaTimes />}
        </div>
      </div>
      <div style={{display:showNavBottom?"":"none"}} className="bottom--bar"></div>
    </>
  );
}

export default Navbar;
