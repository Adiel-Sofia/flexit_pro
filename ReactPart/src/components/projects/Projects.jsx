import classes from "./projects.module.css";
import { IoIosAddCircle } from "react-icons/io";
export default function Projects(props) {
  const show = props.show;
  const setIsPopupOpen = props.openPopUp;
  const proList = props.projects;
  const getFunctions = props.getFunctions;
  const proListDisplay = proList.map((el) => {
    if (el.owner)
      return (
        <p
          className={classes.proListItem}
          onClick={() => getFunctions(el.projectId)}
          key={crypto.randomUUID()}
        >
          {el.projectName}
        </p>
      );
  });

  const sharedPro = proList.map((el) => {
    if (!el.owner)
      return (
        <p className={classes.proListItem} key={crypto.randomUUID()}>
          {el.projectName}
        </p>
      );
  });

  return (
    <div className={classes.container}>
      {show ? (
        <div className={classes.addProject}>
          <IoIosAddCircle
            onClick={() => setIsPopupOpen(true)}
            className={classes.plus}
          />
        </div>
      ) : null}
      {/* <div className={classes.addProject}>
        <IoIosAddCircle className={classes.plus} />
      </div> */}
      <p className={classes.title}>My Projects</p>
      {proListDisplay}
      <p className={classes.title}>Shared Projects</p>
      {sharedPro}
    </div>
  );
}
