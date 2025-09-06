import classes from "./projects.module.css";
import { IoIosAddCircle } from "react-icons/io"; // אייקון לחיצה להוספת פרויקט
import { MdDelete } from "react-icons/md"; // אייקון מחיקה
import axios from "axios"; // קריאה ל־API
import { useState } from "react";

export default function Projects(props) {
  const show = props.show; // האם להציג את כפתור ההוספה והמחיקה
  const setIsPopupOpen = props.openPopUp; // פונקציה לפתיחת פופאפ הוספה
  const proList = props.projects; // רשימת הפרויקטים
  const getFunctions = props.getFunctions; // פונקציה לקבלת פונקציות של פרויקט
  const fetchData = props.fetchData; // רענון נתונים

  const [projectToDelete, setProjectToDelete] = useState(null); // אחסון פרויקט שנבחר למחיקה (לpopup)

  const sortedProList = [...proList].sort((a, b) =>
    a.projectName.localeCompare(b.projectName)
  ); // מיון אלפביתי של הפרויקטים

  function deleteProject(proId) {
    axios
      .put("/project/delete", { projectId: proId }) // קריאה לשרת למחיקת פרויקט
      .then(() => {
        fetchData(); // רענון הנתונים אחרי המחיקה
        setProjectToDelete(null); // סגירת הפופאפ
      })
      .catch((error) => {
        console.error("Error deleting project:", error); // טיפול בשגיאה
      });
  }

  const proListDisplay = sortedProList.map((el) => {
    if (!el.owner) return null; // רק פרויקטים שבבעלות המשתמש
    return (
      <div
        key={crypto.randomUUID()} // מפתח ייחודי לרכיב
        style={{ backgroundColor: el.color }} // צבע רקע של הפרויקט
        className={classes.proListItemWrapper}
      >
        <p
          className={classes.proListItem}
          onClick={() =>
            getFunctions({ id: el.projectId, name: el.projectName })
          } // הצגת פונקציות של הפרויקט
        >
          {el.projectName}
        </p>
        {show && (
          <MdDelete
            className={classes.deleteButton}
            onClick={() => setProjectToDelete(el.projectId)} // פתיחת פופאפ מחיקה
          />
        )}
      </div>
    );
  });

  const sharedPro = sortedProList
    .filter((el) => !el.owner) // פרויקטים משותפים בלבד
    .map((el) => (
      <div
        key={crypto.randomUUID()}
        style={{ backgroundColor: el.color }}
        className={classes.proListItemWrapper}
      >
        <p
          className={classes.proListItem}
          onClick={() =>
            getFunctions({ id: el.projectId, name: el.projectName })
          }
        >
          {el.projectName}
        </p>
      </div>
    ));

  // החלק החשוב: return מציג את כל הממשק של רכיב הפרויקטים
  return (
    <div className={classes.container}>
      {show && (
        <div className={classes.addProject}>
          <IoIosAddCircle
            onClick={() => setIsPopupOpen(true)} // פתיחת פופאפ הוספת פרויקט
            className={classes.plus}
          />
        </div>
      )}

      <p className={classes.title}>My Projects</p>
      {proListDisplay}

      {!show && (
        <div>
          <p className={classes.title}>Shared Projects</p>
          {sharedPro}
        </div>
      )}

      {/* Popup confirm */}
      {projectToDelete && (
        <div className={classes.confirmPopup}>
          <div className={classes.popupContent}>
            <p>Are you sure you want to delete this project?</p>
            <button
              className={classes.confirmButton}
              onClick={() => deleteProject(projectToDelete)} // אישור מחיקה
            >
              Yes
            </button>
            <button
              className={classes.cancelButton}
              onClick={() => setProjectToDelete(null)} // ביטול מחיקה
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
