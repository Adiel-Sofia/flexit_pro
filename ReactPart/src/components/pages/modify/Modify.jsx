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
  const [sharePopUp, setSharePopUp] = useState(false);
  const [functions, setFunctions] = useState([]);
  const [color, setColor] = useState("#002255");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [shareEmail, setShareEmail] = useState("");
  const [errMSG, setErrMSG] = useState(false);
  const functionsType = [
    "calendar",
    "blog",
    "gallery",
    "files",
    "list",
    "contacts",
  ];

  function handleShare(proId) {
    if (!shareEmail) return alert("Please enter an email");
    const dataToSend = {
      projectName: currentProject.projectName,
      projectId: currentProject.id,
      fromEmail: JSON.parse(localStorage.getItem("user")).email,
      toEmail: shareEmail,
    };
    axios
      .post("project/share", dataToSend)
      .then((res) => {
        if (!res.data) {
          setErrMSG(true);
        } else {
          setSharePopUp(false);
          setShareEmail("");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  //fetching projects data
  useEffect(() => {
    fetchData();
  }, []);

  const allFunctionComponents = functionsType.map((type) => {
    const found = functions.find((f) => f.type === type);
    if (found) {
      return (
        <Function
          onClickFunc={() => {}}
          setShowFunctions={() => {}}
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

  function fetchData() {
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
  }

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
          <div>
            <button onClick={setSharePopUp} className={classes.shareButton}>
              Send Share Request
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
          fetchData={fetchData}
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
        />
        <Projects
          fetchData={fetchData}
          openPopUp={setIsPopupOpen}
          show={true}
          getFunctions={getFunctions}
          projects={projects}
        />
      </div>
      {sharePopUp && (
        <div className={classes.overlay}>
          <div className={classes.popup}>
            <h3>Share Project</h3>
            <input
              type="email"
              placeholder="Enter user email"
              value={shareEmail}
              onChange={(e) => setShareEmail(e.target.value)}
              className={classes.input}
            />
            {errMSG ? (
              <p>
                The email you are looking for does not exists in the system,
                please try again
              </p>
            ) : null}

            <div className={classes.buttons}>
              <button onClick={handleShare} className={classes.shareBtn}>
                Share
              </button>
              <button
                onClick={() => {
                  setSharePopUp(false);
                  setShareEmail("");
                }}
                className={classes.cancelBtn}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
