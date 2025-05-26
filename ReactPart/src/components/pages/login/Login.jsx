import finalLogo from "../../../assets/finalLogo.png";
import classes from "../login/login.module.css";
import { useState } from "react";
import Submit from "../../buttons/submit/Submit";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Login(props) {
  const { func } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  function navigateToCreate() {
    navigate("/create");
  }
  const userToSend = {
    email,
    password,
  };

  function checkUser(e) {
    axios
      .post("user", userToSend)
      .then((res) => {
        console.log("adiel");
        console.log(res.data);
        func(res.data);
        // Data from API
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    e.preventDefault();
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
          <Submit text="Let me in!" func={checkUser} />
        </form>
      </div>
      <p className={classes.p}>
        Dont Have an Acount? <span onClick={navigateToCreate}>Sign Up!</span>
      </p>
    </div>
  );
}
