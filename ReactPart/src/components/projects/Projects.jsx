import classes from "./projects.module.css";
import { IoIosAddCircle } from "react-icons/io";
export default function Projects(props) {
  const show = props.show;
  const setIsPopupOpen = props.openPopUp;
  const proList = props.projects;
  const getFunctions = props.getFunctions;

  const sortedProList = [...proList].sort((a, b) =>
    a.projectName.localeCompare(b.projectName)
  );
  const proListDisplay = sortedProList.map((el) => {
    if (el.owner)
      return (
        <p
          style={{ backgroundColor: el.color }}
          className={classes.proListItem}
          onClick={() => getFunctions(el.projectId)}
          key={crypto.randomUUID()}
        >
          {el.projectName}
        </p>
      );
  });

  const sharedPro = sortedProList.map((el) => {
    if (!el.owner)
      return (
        <p
          style={{ backgroundColor: el.color }}
          className={classes.proListItem}
          key={crypto.randomUUID()}
        >
          {el.projectName}
        </p>
      );
  });

  return (
    <div className={classes.container}>
      {show ? (
        <div className={classes.addProject}>
          {/* the plus button */}
          <IoIosAddCircle
            onClick={() => setIsPopupOpen(true)}
            className={classes.plus}
          />
        </div>
      ) : null}

      <p className={classes.title}>My Projects</p>
      {proListDisplay}
      {show ? null : (
        <div>
          <p className={classes.title}>Shared Projects</p>
          {sharedPro}
        </div>
      )}
    </div>
  );
}
