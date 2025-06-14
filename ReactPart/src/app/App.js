import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Use from "../components/pages/use/Use";
import classes from "./app.module.css";
import Login from "../components/pages/login/Login";
import Layout from "./Layout";
import CreateAccount from "../components/pages/createAccount/CreateAccount";
import NotFound from "../components/pages/notFound/NotFound";
import Modify from "../components/pages/modify/Modify";

function App() {
  const [userIn, setUserIn] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  function reLogin(userToSet) {
    console.log(userToSet);
    localStorage.setItem("user", JSON.stringify(userToSet));
    setUserIn(localStorage.getItem("user"));
  }

  function logOut() {
    localStorage.setItem("user", JSON.stringify(null));
    setUserIn(localStorage.getItem("user"));
    console.clear();
  }

  return (
    <div className={classes.app}>
      <main>
        <Router>
          <Routes>
            <Route path="/" element={<Login func={reLogin} />} />
            <Route path="/create" element={<CreateAccount />} />

            <Route
              element={
                userIn ? <Layout logOut={logOut} /> : <Navigate to="/" />
              }
            >
              <Route path="/use" element={<Use />} />
              <Route path="/modify" element={<Modify />} />
              {/* if nothing was found, show NotFound */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      </main>
    </div>
  );
}

export default App;
