import classes from "./use.module.css";
import Projects from "../../projects/Projects";
import Function from "../../function/Function";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CalendarFunc from "../../functionsFormats/calendar/CalendarFunc";
export default function Use() {
  const [projects, setProjects] = useState([]);
  const [functions, setFunctions] = useState([]);
  const [choosePro, setChoosePro] = useState(false);
  const [goBack, setGoBack] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  //this will happen first thing when we enter the page
  useEffect(() => {
    fetchData();
  }, []);
  const allFunctionComponents = functions.map((el) => {
    return (
      <Function
        showChecked={false}
        functionId={el.functionId}
        projectId={currentProject}
        key={el.functionId}
        type={el.type}
        active={el.active}
      />
    );
  });

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

  function getFunctions(project) {
    setChoosePro(true);
    setCurrentProject(project);
    const idToSend = {
      functionId: project.id,
    };
    axios
      .post("project/functions", idToSend)
      .then((res) => {
        console.log(res.data);
        setFunctions(res.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <main className={classes.container}>
      <div className={classes.changes}>
        <div className={classes.functions}>{allFunctionComponents}</div>
      </div>
      <div className={classes.projects}>
        <Projects
          show={false} //dont show the plus icon
          getFunctions={getFunctions} //get functions from db
          projects={projects} //get projects from DB
        />
      </div>
    </main>
  );
}
