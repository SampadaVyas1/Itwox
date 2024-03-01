import React, { useState } from "react";
import { Button, Text } from "tamagui";
import classes from "./home.module.scss";
import { useNavigate, useRoutes } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleNaviagte = (redirect: string) => {
    navigate(redirect);
  };
  const isLoginFalse =
    localStorage.getItem("email") && localStorage.getItem("password");
  const [isLogin, setIsLogin] = useState();

  return (
    <div>
      <nav className={classes.navBar}>
        {!isLoginFalse && (
          <li onClick={() => handleNaviagte("/sign-in")}>Sign In</li>
        )}
        {isLoginFalse && (
          <li onClick={() => handleNaviagte("/dashboard")}>Dashboard</li>
        )}
        {isLoginFalse && (
          <li
            onClick={() => {
              localStorage.removeItem("email");
              localStorage.removeItem("password");

              handleNaviagte("/");
            }}
          >
            SignOut
          </li>
        )}
      </nav>
      <div className={classes.homeWrapper}>
        <h1>Home</h1>
        <div className={classes.desc}>To visit DashBoard please SignIn</div>
        <div className={classes.desc}>
          Only SignIn people will be able to see DashBoard
        </div>
        <div className={classes.desc}>
          Cannot Vist Sign In page without SignOut
        </div>
      </div>
    </div>
  );
};

export default Home;
