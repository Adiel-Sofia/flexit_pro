import finalLogo from "../../../assets/finalLogo.png";
import classes from "../login/login.module.css";
import { useState } from "react";
import Submit from "../../buttons/submit/Submit";
import { useNavigate } from "react-router-dom";
import axios from "axios";
/**
 * description: Login component
 * @returns JSX of component
 */
export default function Login(props) {
  const { func } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  function navigateToCreate() {
    navigate("/create");
  }
  const userToSend = {
    email,
    password,
  };

  //function to check the user from DB
  function checkUser(e) {
    e.preventDefault();
    axios
      .post("user", userToSend)
      .then((res) => {
        if (res.data === null) {
          setShow(true);
        } else {
          console.log(res.data);
          func(res.data);
          navigate("/use");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div>
      <img className={classes.logo} src={finalLogo} />
      <div className={classes.form_data}>
        <form className={classes.createAccountForm} onSubmit={checkUser}>
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
      {show ? (
        <div className={classes.popUpErrorMsg}>
          <p>The password or the email is incorrect</p>
        </div>
      ) : null}
    </div>
  );
}
