import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserAPI from "../API/UserAPI";
import { AuthContext } from "../Context/AuthContext";
import queryString from "query-string";

import "./Login.css";

const Login = (props) => {
  const { isLogin } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState([]);
  const { loading, error, dispatch } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    // const fetchData = async () => {
    //   const response = await UserAPI.getAllData();
    //   setUser(response);
    // };
    // fetchData();
  }, []);

  const handleSubmit = () => {
    // const findUser = user.find((value) => {
    //   return value.email === email;
    // });

    // if (findUser && findUser.password === password) {
    //   if (findUser.role !== "Customer") {
    //     dispatch({ type: "LOGIN_SUCCESS", payload: findUser });

    //     localStorage.setItem(
    //       "userData",
    //       JSON.stringify({ email: findUser.email, role: findUser.role })
    //     );
    //     history.push("/home");
    //   } else {
    //     alert("Only Admin or Counselor can login");
    //   }
    // } else {
    //   alert("Email or password wrong!");
    // }
    const fetchLogin = () => {
      const params = {
        email: email,
        password: password,
      };

      const query = "?" + queryString.stringify(params);

      UserAPI.postSignIn(query)
        .then((data) => {
          console.log(data);
          localStorage.setItem(
            "userData",
            JSON.stringify({ email: data.email, role: data.role })
          );
          isLogin();
          history.push("/home");
        })
        .catch((error) => {
          // Error occurred during the API call, try catch cũng dùng giống vậy
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          // console.log(error);
          alert(error.response.data.message);
          return;
        });
    };

    fetchLogin();
  };

  return (
    <div style={{ zIndex: "100", width: "100%" }}>
      <div className="page-breadcrumb">
        <div className="row">
          <div class="login">
            <div class="heading">
              <h2>Sign in</h2>
              <form action="#">
                <div className="input-group input-group-lg">
                  <span className="input-group-addon">
                    <i className="fa fa-user"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="input-group input-group-lg">
                  <span className="input-group-addon">
                    <i className="fa fa-lock"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button type="button" className="float" onClick={handleSubmit}>
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
