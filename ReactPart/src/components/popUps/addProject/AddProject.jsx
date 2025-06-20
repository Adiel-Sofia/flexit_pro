import React, { useState } from "react";
import classes from "./addProject.module.css";
import axios from "axios";

export default function AddProject({ isOpen, onClose }) {
  const [projectName, setProjectName] = useState("");
  const [projectColor, setProjectColor] = useState("#007bff"); // Default to a blue color
  const [projectId, setProjectId] = useState(0);
  const [modules, setModules] = useState({
    calendar: false,
    blog: false,
    gallery: false,
    files: false,
    list: false,
    charts: false,
  });
  // If the popup is not open, don't render anything
  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e) => {
    const projectData = {
      email: JSON.parse(localStorage.getItem("user")).email,
      name: projectName,
      color: projectColor,
    };
    e.preventDefault();

    axios
      .post("project/add", projectData)
      .then((res) => {
        console.log("res data", res.data.newProjectId);
        const functionsData = {
          email: JSON.parse(localStorage.getItem("user")).email,
          functions: modules,
          projectId: res.data.newProjectId,
        };

        axios
          .post("function", functionsData)
          .then((res) => {
            console.log(res.data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    // Reset fields and close the popup after submission
    setProjectName("");
    setProjectColor("#007bff");
    onClose();
  };

  return (
    <div className={classes.overlay}>
      <div className={classes.popup}>
        {/* Close Button */}
        <button className={classes.closeButton} onClick={onClose}>
          &times; {/* A common character for a close button */}
        </button>

        <h2>Create New Project</h2>

        <form onSubmit={handleSubmit}>
          {/* Project Name Input */}
          <div className={classes.inputGroup}>
            <label>Project Name:</label>
            <input
              type="text"
              id="projectName"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="e.g., Marketing Campaign"
              required // Make this field mandatory
            />
          </div>

          {/* Color Input */}
          <div className={classes.inputGroup}>
            <label htmlFor="projectColor">Color:</label>
            <input
              type="color"
              id="projectColor"
              value={projectColor}
              onChange={(e) => setProjectColor(e.target.value)}
            />
          </div>

          {/* check Boxes */}
          <div className={classes.functionsCheckBox}>
            <div className={classes.functionItem}>
              <input
                onChange={() => {
                  setModules((prevModules) => ({
                    ...prevModules,
                    calendar: !prevModules.calendar,
                  }));
                }}
                type="checkbox"
              />
              <label>Calander</label>
            </div>
            <div className={classes.functionItem}>
              <input
                onChange={() => {
                  setModules((prevModules) => ({
                    ...prevModules,
                    gallery: !prevModules.gallery,
                  }));
                }}
                type="checkbox"
              />
              <label>Gallery</label>
            </div>
            <div className={classes.functionItem}>
              <input
                onChange={() => {
                  setModules((prevModules) => ({
                    ...prevModules,
                    blog: !prevModules.blog,
                  }));
                }}
                type="checkbox"
              />
              <label>Blog</label>
            </div>
            <div className={classes.functionItem}>
              <input
                onChange={() => {
                  setModules((prevModules) => ({
                    ...prevModules,
                    files: !prevModules.files,
                  }));
                }}
                type="checkbox"
              />
              <label>Files</label>
            </div>
            <div className={classes.functionItem}>
              <input type="checkbox" />
              <label>List</label>
            </div>
            <div className={classes.functionItem}>
              <input
                onChange={() => {
                  setModules((prevModules) => ({
                    ...prevModules,
                    charts: !prevModules.charts,
                  }));
                }}
                type="checkbox"
              />
              <label>Charts</label>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className={classes.submitButton}>
            Create Project
          </button>
        </form>
      </div>
    </div>
  );
}
