import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import classes from "./layout.module.css";
import React, { useEffect, useState } from "react";
export default function Layout(props) {
  const [currentUser, setCurrentUser] = useState(props.user);
  const user = props.user;
  // console.log(currentUser);

  return (
    <div className={classes.layoutContainer}>
      <Header user={currentUser} />

      <main className={classes.mainContent}>
        <Outlet />
      </main>

      <Footer className={classes.footer} />
    </div>
  );
}
