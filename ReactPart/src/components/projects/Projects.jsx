import classes from "./projects.module.css";
import { IoIosAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useState } from "react";

export default function Projects(props) {
  const show = props.show;
  const setIsPopupOpen = props.openPopUp;
  const proList = props.projects;
  const getFunctions = props.getFunctions;
  const fetchData = props.fetchData;

  const [projectToDelete, setProjectToDelete] = useState(null); // for popup

  const sortedProList = [...proList].sort((a, b) =>
    a.projectName.localeCompare(b.projectName)
  );

  function deleteProject(proId) {
    axios
      .put("/project/delete", { projectId: proId })
      .then(() => {
        fetchData();
        setProjectToDelete(null); // סגירת הפופאפ
      })
      .catch((error) => {
        console.error("Error deleting project:", error);
      });
  }

  const proListDisplay = sortedProList.map((el) => {
    if (!el.owner) return null;
    return (
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
        {show && (
          <MdDelete
            className={classes.deleteButton}
            onClick={() => setProjectToDelete(el.projectId)}
          />
        )}
      </div>
    );
  });

  const sharedPro = sortedProList
    .filter((el) => !el.owner)
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

  return (
    <div className={classes.container}>
      {show && (
        <div className={classes.addProject}>
          <IoIosAddCircle
            onClick={() => setIsPopupOpen(true)}
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
              onClick={() => deleteProject(projectToDelete)}
            >
              Yes
            </button>
            <button
              className={classes.cancelButton}
              onClick={() => setProjectToDelete(null)}
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
