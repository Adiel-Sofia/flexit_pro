import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./header.module.css";
import finalLogo from "../../assets/finalLogo.png";
import StateButton from "../buttons/stateButton/StateButton";
import LogOut from "../buttons/logOut/LogOut";
import UpdateProfile from "../popUps/updateProfile/UpdateProfile";
/**
 * description: Header component
 * @returns JSX of component
 */

function Header(props) {
  const { logOut, setUpdatePopUp, userIn, setChangePassPopUp } = props;
  //the logOut function to move to the log out button
  //setUpdatePopUp function to change to true and show the Update pop up- use it on the drop down
  //user in to show the name of the user
  const [showDrop, setShowDrop] = useState(false);
  const image_src = "/uploads/woman.png";

  return (
    <header className={classes.header}>
      <div className={classes.userWrapper}>
        {showDrop ? (
          <div
            onMouseEnter={() => setShowDrop(true)}
            onMouseLeave={() => setShowDrop(false)}
            className={classes.dropdown_container}
          >
            <div className={classes.dropdown_menu}>
              <p onClick={() => setUpdatePopUp(true)}>Update my profile</p>
              <p onClick={() => setChangePassPopUp(true)}>Reset Password</p>
              <p>My Requests</p>
            </div>
          </div>
        ) : null}
        <div>
          <img
            onMouseEnter={() => setShowDrop(true)}
            onMouseLeave={() => setShowDrop(false)}
            src={image_src}
          />
          <LogOut logOut={logOut} />
        </div>
        <div>
          <p>{userIn.userName}</p>
        </div>
      </div>

      <div className={classes.logoWrapper}>
        <img className={classes.logo} src={finalLogo} />
      </div>
      <div className={classes.buttonsWrapper}>
        <StateButton name="Use" func={props.use} />
        <StateButton name="Moodify" func={props.modify} />
      </div>
    </header>
  );
}

export default Header;
