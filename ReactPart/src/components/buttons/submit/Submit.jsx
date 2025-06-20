import classes from "../submit/submit.module.css";
/**
 * description: Submit component
 * use to submit forms
 * @returns JSX of component
 */
export default function Submit(props) {
  const { text } = props; //the text to show on the button
  return (
    <div className={classes.submitButton}>
      <button className={classes.button} type="submit">
        {text}
      </button>
    </div>
  );
}
