import classes from '../stateButton/stateButton.module.css'

function StateButton(props) {
  const { name, func } = props;
  return (
    <div className={classes.stateButton}>
      <button className={classes.button}>{name}</button>
    </div>
  );
}

export default StateButton;
