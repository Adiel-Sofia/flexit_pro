import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Use from "../components/pages/use/Use";
import classes from "./app.module.css";
import { Header, Footer } from "../components/";
import Login from "../components/pages/login/Login";
import Layout from "./Layout";
import CreateAccount from "../components/pages/createAccount/CreateAccount";
import NotFound from "../components/pages/notFound/NotFound";

function App() {
  const [userIn, setUserIn] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  // let userFinal = [];
  function reLogin(userToSet) {
    console.log(userToSet);
    setUserIn(localStorage.setItem("user", JSON.stringify(userToSet)));
    console.log("dljzfhkfhk");
    console.log(userIn);
  }

  return (
    <div className={classes.app}>
      <main>
        <Router>
          <Routes>
            <Route path="/" element={<Login func={reLogin} />} />
            <Route path="/create" element={<CreateAccount />} />

            <Route
              element={userIn ? <Layout user={userIn} /> : <Navigate to="/" />}
            >
              <Route path="/use" element={<Use />} />
              {/* if nothing was found, show NotFound */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      </main>
      <Footer />
    </div>
  );
}

export default App;
