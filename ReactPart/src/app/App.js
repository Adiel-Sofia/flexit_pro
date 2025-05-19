import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import axios from "axios";
import classes from "./app.module.css";

import { Header, Footer } from "../components/";
import Login from "../components/pages/login/Login";
import Layout from "./Layout";
import CreateAccount from "../components/pages/createAccount/CreateAccount";
import NotFound from "../components/pages/notFound/NotFound";
function App() {
  const [user, setUser] = useState({
    name: "adiel",
    email: "adiel13150@gmail.com",
    password: "123456",
    image_src: "/uploads/woman.png",
  });
  const [usersList, setUsersList] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    axios
      .get("user")
      .then((res) => {
        setUsersList(res.data);
        console.log(usersList); // Data from API
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  function reLogin(userToSet) {
    console.log(userToSet);
    console.log("ds,j");
    setUser(userToSet);
    console.log(user);
  }
  return (
    <div className={classes.app}>
      <main>
        <Router>
          <Routes>
            <Route
              path="/"
              element={<Login func={reLogin} users={usersList} />}
            />
            <Route path="/create" element={<CreateAccount />} />

            <Route element={user ? <Layout /> : <Navigate to="/" />}>
              <Route path="/use" element={<Header user={user} />} />
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
