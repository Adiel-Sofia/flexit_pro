import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./header.module.css";
import finalLogo from "../../assets/finalLogo.png";
import StateButton from "../buttons/stateButton/StateButton";
/**
 * description: Header component
 * @returns JSX of component
 */
function Header(props) {
  console.log(props.user);
  const { name, image_src } = props.user;

  return (
    <header className={classes.header}>
      <div className={classes.userWrapper}>
        <img src={image_src} />
        <p>{name}</p>
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
