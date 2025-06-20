import classes from "../stateButton/stateButton.module.css";
/**
 * description: StateButton component
 * use of modify buttons
 * @returns JSX of component
 */
function StateButton(props) {
  const { name, func } = props; //name- modify or use , func - navigate to a diffrent page
  return (
    <div className={classes.stateButton}>
      <button className={classes.button} onClick={func}>
        {name}
      </button>
    </div>
  );
}

export default StateButton;
