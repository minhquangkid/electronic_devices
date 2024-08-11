import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { deleteSession } from "../Redux/Action/ActionSession";
import UserAPI from "../API/UserAPI";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import "../Share/Header/Header.css";

function LoginLink(props) {
  const dispatch = useDispatch();

  const onRedirect = () => {
    UserAPI.getLogout().then((data) => {
      localStorage.clear();
      document.cookie =
        "userLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      const action = deleteSession("");
      dispatch(action);
    });
  };

  return (
    <li className="nav-item" onClick={onRedirect}>
      <NavLink
        className="nav-link"
        exact
        to="/signin"
        activeClassName="selected"
      >
        ( Logout )
      </NavLink>
    </li>
  );
}

export default LoginLink;
