import classes from "./function.module.css";
import { FaCalendarAlt } from "react-icons/fa";
import { TfiGallery } from "react-icons/tfi";
import { FaRegPenToSquare } from "react-icons/fa6";
import { FaFileArrowUp } from "react-icons/fa6";
import { FaListAlt } from "react-icons/fa";
import { FaChartPie } from "react-icons/fa6";
import React, { useEffect, useState } from "react";
import axios from "axios";

/**
 * Functions component
 * @returns JSX of component
 */
export default function Function(props) {
  const {
    type,
    active,
    projectId,
    functionId,
    showChecked,
    setShowFunctions,
    onClickFunc,
  } = props;
  const [activeState, setActiveState] = useState(active);
  const [functionID, setFunctionID] = useState(functionId);
  function handleFunctionCheckBox(functionName) {
    console.log(functionID);
    if (functionID === null) {
      const functionsData = {
        email: JSON.parse(localStorage.getItem("user")).email,
        functions: { [functionName]: true },
        projectId: projectId,
      };
      axios
        .post("function", functionsData)
        .then((res) => {
          setFunctionID(res.data.functionId);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      const functionsData = {
        functionId: functionID,
        state: !activeState,
      };
      console.log("here");
      axios
        .put("function/updateActive", functionsData)
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }

  function handleClick() {
    if (!showChecked) {
      setShowFunctions(false);
      onClickFunc(type, functionID);
      console.log("clicked");
    }
  }
  return (
    <div className={classes.wrapper}>
      {showChecked === true ? (
        <div className={classes.checkBoxItem}>
          <input
            type="checkbox"
            checked={activeState}
            onChange={() => {
              handleFunctionCheckBox(type);
              setActiveState((prev) => !prev);
            }}
          />
          <label>{type}</label>
        </div>
      ) : null}

      <div className={classes.styleIcon}>
        {type === "calendar" ? <FaCalendarAlt onClick={handleClick} /> : null}
        {type === "gallery" ? <TfiGallery onClick={handleClick} /> : null}
        {type === "blog" ? <FaRegPenToSquare onClick={handleClick} /> : null}
        {type === "files" ? <FaFileArrowUp onClick={handleClick} /> : null}
        {type === "list" ? <FaListAlt onClick={handleClick} /> : null}
        {type === "charts" ? <FaChartPie onClick={handleClick} /> : null}
      </div>
    </div>
  );
}
