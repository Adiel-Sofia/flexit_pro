import classes from "../submit/submit.module.css";
export default function Submit(props) {
  const { text } = props;
  return (
    <div className={classes.submitButton}>
      <button className={classes.button} type="submit">
        {text}
      </button>
    </div>
  );
}
