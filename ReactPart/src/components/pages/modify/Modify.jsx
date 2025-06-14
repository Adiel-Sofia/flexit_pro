// import "./modify.module.css";
import Projects from "../../projects/Projects";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AddProject from "../../popUps/addProject/AddProject";
export default function Modify() {
  const [projects, setProjects] = useState([]);
  const [functions, setFunctions] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
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

  const handleCreateProject = (projectData) => {
    console.log("New project");
  };
  return (
    <main className="main">
      <div>
        <AddProject
          isOpen={isPopupOpen} // Controls whether the popup is visible
          onClose={() => setIsPopupOpen(false)} // Function to close the popup
          onSubmit={handleCreateProject} // Function to handle form submission
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
