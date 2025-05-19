import finalLogo from "../../../assets/finalLogo.png";
import classes from "../login/login.module.css";
import { useState } from "react";
import Submit from "../../buttons/submit/Submit";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  const { func, users } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  function navigateToCreate() {
    navigate("/create");
  }
  return (
    <div>
      <img className={classes.logo} src={finalLogo} />
      <div className={classes.form_data}>
        <form className={classes.createAccountForm}>
          <div className={classes.form__item}>
            <label>Email:</label>
            <input
              className={classes.inputBox}
              type="Email"
              required
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={classes.form__item}>
            <label>Password:</label>
            <input
              className={classes.inputBox}
              type="password"
              required
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Submit text="Let me in!" />
        </form>
      </div>
      <p className={classes.p}>
        Dont Have an Acount? <span onClick={navigateToCreate}>Sign Up!</span>
      </p>
    </div>
  );
}
