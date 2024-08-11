import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import "../Share/Header/Header.css";

function LogoutLink(props) {
  return (
    <li className="nav-item">
      <NavLink
        className="nav-link"
        exact
        to={`/signin`}
        activeClassName="selected"
      >
        <i className="fas fa-user-alt mr-1 text-gray"></i>Login
      </NavLink>
    </li>
  );
}

export default LogoutLink;
