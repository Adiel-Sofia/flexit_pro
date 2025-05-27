import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./header.module.css";
import finalLogo from "../../assets/finalLogo.png";
import StateButton from "../buttons/stateButton/StateButton";
import LogOut from "../buttons/logOut/LogOut";
/**
 * description: Header component
 * @returns JSX of component
 */
function Header(props) {
  const { func } = props;
  const [userIn, setUserIn] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  console.log(userIn);

  const image_src = "/uploads/woman.png";
  return (
    <header className={classes.header}>
      <div className={classes.userWrapper}>
        <div>
          <img src={image_src} />
          <LogOut func={func} />
        </div>
        <div>
          <p>{userIn.userName}</p>
        </div>
      </div>

      <div className={classes.logoWrapper}>
        <img className={classes.logo} src={finalLogo} />
      </div>
      <div className={classes.buttonsWrapper}>
        <StateButton name="Use" />
        <StateButton name="Moodify" />
      </div>
    </header>
  );
}

export default Header;
