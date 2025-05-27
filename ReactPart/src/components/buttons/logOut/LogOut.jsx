import classes from "../logOut/logOut.module.css";
import { useNavigate } from "react-router-dom";

function LogOut(props) {
  const { func } = props;
  const navigate = useNavigate();

  function handleLogOut() {
    console.log("getting out");
    func();
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
