import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuth } from "../auth";

import DropdownCity from "./DropDownCity";
//Styled Components
// import { Menu } from "./styles/menuStyles";

const isActive = (history, path) =>
  history.location.pathname === path
    ? { color: "rgba(247, 127, 0, 0.8)" }
    : { color: "#EDEDED" };

const Menu = ({ history, toggleMenu, setToggleMenu }) => {
  return (
    <ul>
      <li>
        <DropdownCity />
      </li>
      {!isAuth() && (
        <>
          <li>
            <Link style={isActive(history, "/signin")} to="/signin">
              Signin
            </Link>
          </li>
          <li>
            <Link style={isActive(history, "/signup")} to="/signup">
              Signup
            </Link>
          </li>
        </>
      )}
      {isAuth() && (
        <>
          {isAuth() && isAuth().user.role === 0 && (
            <li>
              <Link
                style={isActive(history, "/user/dashboard")}
                to="/user/dashboard"
              >
                Dashboard
              </Link>
            </li>
          )}
          {isAuth() && isAuth().user.role === 1 && (
            <li>
              <Link
                style={isActive(history, "/admin/dashboard")}
                to="/admin/dashboard"
              >
                Admin Dashboard
              </Link>
            </li>
          )}
          <li>
            <span
              style={{ cursor: "pointer", color: "##EDEDED" }}
              onClick={() => {
                signout(() => {
                  history.push("/");
                });
              }}
            >
              Signout
            </span>
          </li>
        </>
      )}
    </ul>
  );
};

export default withRouter(Menu);
