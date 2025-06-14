import React, { useState } from "react";
import classes from "./addProject.module.css";

export default function AddProject({ isOpen, onClose, onSubmit }) {
  const [projectName, setProjectName] = useState("");
  const [projectColor, setProjectColor] = useState("#007bff"); // Default to a blue color

  // If the popup is not open, don't render anything
  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Call the onSubmit prop with the gathered data
    onSubmit({ projectName, projectColor });

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
            <label htmlFor="projectName">Project Name:</label>
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

          {/* Submit Button */}
          <button type="submit" className={classes.submitButton}>
            Create Project
          </button>
        </form>
      </div>
    </div>
  );
}
