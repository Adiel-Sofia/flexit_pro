import classes from "./projects.module.css";
export default function Projects(props) {
  const proList = props.projects;
  const proListDisplay = proList.map((el) => {
    return (
      <p className={classes.proListItem} key={crypto.randomUUID()}>
        {el}
      </p>
    );
  });
  return <div className={classes.container}>{proListDisplay}</div>;
}
