import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import classes from "./app.module.css";
// import { persons } from "./data";
import { Header, Footer } from "../components/";
import Login from "../components/pages/login/Login";
import CreateAccount from "../components/pages/createAccount/CreateAccount";
import NotFound from "../components/pages/notFound/NotFound";
function App() {
  const [user, setUser] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    axios
      .get("user")
      .then((res) => {
        setUser(res.data);
        console.log(user); // Data from API
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div className={classes.app}>
      <main>
        <Router>
          <Routes>
            <Route path="/" element={<Header person={user[0]} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<CreateAccount />} />

            {/* if nothing was found, show NotFound */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </main>
      <Footer />
    </div>
  );
}

export default App;
