import classes from "../logOut/logOut.module.css";
import { useNavigate } from "react-router-dom";
/**
 * description: LogOut component
 * @param {Function} props.logOut - פונקציה שמופעלת כדי לבצע התנתקות מהמערכת
 * @returns JSX of component
 */
function LogOut(props) {
  const { logOut } = props; //logOut function - get it from header
  const navigate = useNavigate(); //nevigate to the log in page

  function handleLogOut() {
    console.log("getting out");
    logOut();
    navigate("/");
  }
  return (
    <div className={classes.stateButton}>
      <button onClick={handleLogOut} className={classes.button}>
        Log Out
      </button>
    </div>
  );
}

export default LogOut;
