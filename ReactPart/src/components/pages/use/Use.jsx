import "./use.module.css";
import Projects from "../../projects/Projects";
import Function from "../../functions/Functions";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Use() {
  const [projects, setProjects] = useState([]);
  const [functions, setFunctions] = useState([]);

  //this will happen first thing when we enter the page
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const emailOfUser = JSON.parse(localStorage.getItem("user")).email;
    const userToSend = {
      email: emailOfUser,
    };
    axios
      .post("project", userToSend)
      .then((res) => {
        setProjects(res.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  function getFunctions(id) {
    const idToSend = {
      functionId: id,
    };
    axios
      .post("project/functions", idToSend)
      .then((res) => {
        setFunctions(res.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  return (
    <main className="main">
      <div>
        <Projects
          show={false} //dont show the plus icon
          getFunctions={getFunctions} //get functions from db
          projects={projects} //get projects from DB
        />
      </div>
      <div>
        <Function />
      </div>
    </main>
  );
}
