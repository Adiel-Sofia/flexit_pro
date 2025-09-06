import classes from "./function.module.css";
import { FaCalendarAlt } from "react-icons/fa";
import { TfiGallery } from "react-icons/tfi";
import { FaRegPenToSquare } from "react-icons/fa6";
import { FaFileArrowUp } from "react-icons/fa6";
import { FaListAlt } from "react-icons/fa";
import { MdPermContactCalendar } from "react-icons/md";
import React, { useEffect, useState } from "react";
import axios from "axios";

/**
 * Functions component
 * @returns JSX of component
 */
export default function Function(props) {
  const {
    type, // סוג הפונקציה (calendar, gallery, blog וכו')
    active, // האם הפונקציה פעילה כברירת מחדל
    projectId, // מזהה הפרויקט
    functionId, // מזהה הפונקציה במסד הנתונים
    showChecked, // האם להציג צ'קבוקס להפעלה/כיבוי
    setShowFunctions, // setter לסגירת/פתיחת רשימת הפונקציות
    onClickFunc, // פונקציה שנקראת בעת לחיצה על אייקון
  } = props;

  const [activeState, setActiveState] = useState(active); // מצב מקומי אם הפונקציה פעילה
  const [functionID, setFunctionID] = useState(functionId); // מזהה מקומי של הפונקציה

  // טיפול בלחיצה על צ'קבוקס (הוספה למסד או עדכון מצב)
  function handleFunctionCheckBox(functionName) {
    console.log(functionID);
    if (functionID === null) {
      // יצירת פונקציה חדשה במסד נתונים
      const functionsData = {
        email: JSON.parse(localStorage.getItem("user")).email,
        functions: { [functionName]: true },
        projectId: projectId,
      };
      axios
        .post("function", functionsData)
        .then((res) => {
          setFunctionID(res.data.functionId); // עדכון מזהה הפונקציה שחזר מהשרת
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      // עדכון מצב פעיל/כבוי לפונקציה קיימת
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

  // טיפול בלחיצה על האייקון (רק אם הצ'קבוקס לא מוצג)
  function handleClick() {
    if (!showChecked) {
      setShowFunctions(false); // סגירת רשימת הפונקציות
      onClickFunc(type, functionID); // הפעלת הפונקציה שנבחרה
      console.log("clicked");
    }
  }

  return (
    <div className={classes.wrapper}>
      {/* הצגת צ'קבוקס לבחירה אם להפעיל/לכבות פונקציה */}
      {showChecked === true ? (
        <div className={classes.checkBoxItem}>
          <input
            type="checkbox"
            checked={activeState} // מצב נוכחי אם פעיל
            onChange={() => {
              handleFunctionCheckBox(type); // קריאה לשרת לעדכון/שמירה
              setActiveState((prev) => !prev); // עדכון מצב מקומי
            }}
          />
          <label>{type}</label>
        </div>
      ) : null}

      {/* הצגת אייקון לפי סוג הפונקציה, כל אייקון בלחיצה מפעיל handleClick */}
      <div className={classes.styleIcon}>
        {type === "calendar" ? <FaCalendarAlt onClick={handleClick} /> : null}
        {type === "gallery" ? <TfiGallery onClick={handleClick} /> : null}
        {type === "blog" ? <FaRegPenToSquare onClick={handleClick} /> : null}
        {type === "files" ? <FaFileArrowUp onClick={handleClick} /> : null}
        {type === "list" ? <FaListAlt onClick={handleClick} /> : null}
        {type === "contacts" ? (
          <MdPermContactCalendar onClick={handleClick} />
        ) : null}
      </div>
    </div>
  );
}
