import classes from "./functions.module.css";
import { FaCalendarAlt } from "react-icons/fa";
/**
 * Functions component
 * @returns JSX of component
 */
export default function Function(props) {
  return (
    <div className={classes.wrapper}>
      <div className={classes.checkBoxItem}>
        <input type="checkbox" />
        <label>Calender</label>
      </div>
      <div className={classes.styleIcon}>
        <FaCalendarAlt />
      </div>
    </div>
  );
}
