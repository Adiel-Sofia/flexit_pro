// import "./modify.module.css";
import Projects from "../../projects/Projects";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AddProject from "../../popUps/addProject/AddProject";
export default function Modify() {
  const [projects, setProjects] = useState([]);
  const [functions, setFunctions] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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
        {/* add project pop up */}
        <AddProject
          isOpen={isPopupOpen} // Controls whether the popup is visible
          onClose={() => setIsPopupOpen(false)} // Function to close the popup
        />

        {/* the projects list */}
        <Projects
          openPopUp={setIsPopupOpen} //the functions to change the state og the pop up
          show={true} //to show the plus button
          getFunctions={getFunctions} //the function - get the functions from DB
          projects={projects} //function to get project from DB
        />
      </div>
    </main>
  );
}
