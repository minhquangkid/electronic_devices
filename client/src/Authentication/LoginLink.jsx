import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { deleteSession } from "../Redux/Action/ActionSession";
import UserAPI from "../API/UserAPI";
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
      <Link className="nav-link" to="/signin">
        ( Logout )
      </Link>
    </li>
  );
}

export default LoginLink;
