import classes from "./modify.module.css";
import Projects from "../../projects/Projects";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AddProject from "../../popUps/addProject/AddProject";
import Function from "../../function/Function";
export default function Modify() {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [choosePro, setChoosePro] = useState(false);
  const [functions, setFunctions] = useState([]);
  const [color, setColor] = useState("#002255");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const functionsType = [
    "calendar",
    "blog",
    "gallery",
    "files",
    "list",
    "charts",
  ];

  //fetching projects data
  useEffect(() => {
    fetchData();
  }, []);

  const allFunctionComponents = functionsType.map((type) => {
    const found = functions.find((f) => f.type === type);
    if (found) {
      return (
        <Function
          showChecked={true}
          functionId={found.functionId}
          projectId={currentProject}
          key={found.functionId}
          type={found.type}
          active={found.active}
        />
      );
    } else {
      return (
        <Function
          showChecked={true}
          functionId={null}
          projectId={currentProject}
          key={type}
          type={type}
          active={false}
        />
      );
    }
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

  function handleChangeStyle() {
    const projectData = {
      projectName: currentProject.name,
      projectId: currentProject.id,
      color: color,
    };

    axios
      .put("project/style", projectData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <main className={classes.container}>
      {choosePro === true ? (
        <div className={classes.changes}>
          <div className={classes.inputRow}>
            <input
              type="text"
              value={currentProject.name}
              className={classes.textInput}
              onChange={(e) =>
                setCurrentProject({ ...currentProject, name: e.target.value })
              }
            />
            <input
              type="color"
              className={classes.colorInput}
              value={color}
              onChange={(e) => {
                setColor(e.target.value);
              }}
            />
            <button className={classes.saveButton} onClick={handleChangeStyle}>
              Save
            </button>
          </div>
          <div className={classes.functions}>{allFunctionComponents}</div>
        </div>
      ) : (
        <div className={classes.changes}>
          Choose a Project to Start making changes!
        </div>
      )}

      <div className={classes.projects}>
        <AddProject
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
        />
        <Projects
          openPopUp={setIsPopupOpen}
          show={true}
          getFunctions={getFunctions}
          projects={projects}
        />
      </div>
    </main>
  );
}
