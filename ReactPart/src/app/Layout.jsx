import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import classes from "./layout.module.css";
import { useNavigate } from "react-router-dom";
import UpdateProfile from "../components/popUps/updateProfile/UpdateProfile";
import ChangePassword from "../components/popUps/changePassword/ChangePassword";
import React, { useEffect, useState } from "react";
import axios from "axios";

/**
 * description: Layout component
 * create a patern for all pages- has header and footer
 * @returns JSX of component
 */
export default function Layout(props) {
  const [userIn, setUserIn] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const { logOut } = props; //logOut function from app - enters header
  const [updatePopUp, setUpdatePopUp] = useState(false); //show or not the update pop up
  const [changePassPopUp, setChangePassPopUp] = useState(false); //show or not the update pop up
  const navigate = useNavigate();

  //function to navigate to use- enters header for a button
  function navigateToUse() {
    navigate("/use");
  }

  //function to navigate to modify- enters header for a button
  function navigateToModify() {
    navigate("/modify");
  }

  return (
    <div className={classes.layoutContainer}>
      <Header
        userIn={userIn}
        setChangePassPopUp={setChangePassPopUp}
        setUpdatePopUp={setUpdatePopUp}
        logOut={logOut}
        modify={navigateToModify}
        use={navigateToUse}
      />

      <main className={classes.mainContent}>
        <Outlet />

        {/* popUp */}
        {updatePopUp ? <UpdateProfile setUpdatePopUp={setUpdatePopUp} /> : null}
        {changePassPopUp ? (
          <ChangePassword setChangePassPopUp={setChangePassPopUp} />
        ) : null}
      </main>

      <Footer className={classes.footer} />
    </div>
  );
}
