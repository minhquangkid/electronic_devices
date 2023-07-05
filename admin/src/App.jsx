import { BrowserRouter, Route, Switch } from "react-router-dom";
import Chat from "./Chat/Chat";
import Header from "./Header/Header";
import History from "./History/History";
import Home from "./Home/Home";
import Menu from "./Menu/Menu";
import Products from "./Products/Products";
import Users from "./Users/Users";
import Login from "./Login/Login";
import NewProduct from "./New/NewProduct";
import { AuthContextProvider } from "./Context/AuthContext";
import React, { useState, useEffect, useContext } from "react";

function App() {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("userData"));

    if (userData) {
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }
  }, []);

  const isLogin = () => {
    setShowMenu(true);
  };

  return (
    <div className="App">
      <AuthContextProvider>
        <BrowserRouter>
          <div
            id="main-wrapper"
            data-theme="light"
            data-layout="vertical"
            data-navbarbg="skin6"
            data-sidebartype="full"
            data-sidebar-position="fixed"
            data-header-position="fixed"
            data-boxed-layout="full"
          >
            <Header />

            {showMenu && <Menu />}

            <Switch>
              <Route exact path="/home" component={Home} />
              <Route path="/chat" component={Chat} />
              <Route path="/users" component={Users} />
              <Route path="/products" component={Products} />
              <Route path="/history" component={History} />
              <Route
                path="/"
                render={(props) => <Login {...props} isLogin={isLogin} />}
              />
              <Route path="/new" component={NewProduct} />
            </Switch>
          </div>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
