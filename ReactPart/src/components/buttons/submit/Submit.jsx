import classes from "../submit/submit.module.css";
export default function Submit(props) {
  const { text, func } = props;
  return (
    <div className={classes.submitButton}>
      <button onClick={func} className={classes.button} type="submit">
        {text}
      </button>
    </div>
  );
}
