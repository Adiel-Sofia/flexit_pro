import finalLogo from "../../../assets/finalLogo.png";
import classes from "../createAccount/createAccount.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Submit from "../../buttons/submit/Submit";
import axios from "axios";

/**
 * description: CreateAccount component
 * create a patern for all pages- has header and footer
 * @returns JSX of component
 */

function CreateAccount() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [userName, setUserName] = useState("");
  const [userbDate, setBdate] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false); //if to show an error msg
  const navigate = useNavigate();

  const today = new Date();
  const minAge = 10; // גיל מינימום
  const maxAge = 100; // גיל מקסימום

  // תאריך מקסימלי (מי שנולד עד לפני 10 שנים)
  const maxDate = new Date(
    today.getFullYear() - minAge,
    today.getMonth(),
    today.getDate()
  )
    .toISOString()
    .split("T")[0];

  // תאריך מינימלי (מי שנולד לפני יותר מ־100 שנים)
  const minDate = new Date(
    today.getFullYear() - maxAge,
    today.getMonth(),
    today.getDate()
  )
    .toISOString()
    .split("T")[0];

  const userToSave = {
    email,
    firstName,
    lastName,
    phone,
    userName,
    userbDate,
    password,
  };
  function navigateToLogIn() {
    navigate("/");
  }

  //function to handle the submition - adding user to DB
  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("user/register", userToSave)
      .then((res) => {
        console.log(res.data);
        if (res.data === false) setShow(true);
        else {
          navigateToLogIn();
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
        {/* form to add a user */}
        <form className={classes.createAccountForm} onSubmit={handleSubmit}>
          <div className={classes.form__item}>
            <label>Email:</label>
            <input
              className={classes.inputBox}
              type="Email"
              required
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={classes.form__item}>
            <label>First Name:</label>
            <input
              className={classes.inputBox}
              type="text"
              required
              value={firstName}
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className={classes.form__item}>
            <label>Last Name:</label>
            <input
              className={classes.inputBox}
              type="text"
              required
              value={lastName}
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className={classes.form__item}>
            <label>Phone Number:</label>
            <input
              className={classes.inputBox}
              type="tel"
              required
              value={phone}
              pattern="^05\d-\d{7}$"
              placeholder="Phone number"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className={classes.form__item}>
            <label>User Name:</label>
            <input
              className={classes.inputBox}
              type="text"
              required
              value={userName}
              placeholder="User Name"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className={classes.form__item}>
            <label>Birth Date:</label>
            <input
              className={classes.inputBox}
              type="date"
              required
              value={userbDate}
              min={minDate} // אי אפשר לבחור תאריך ישן יותר מגיל 100
              max={maxDate} // אי אפשר לבחור תאריך צעיר יותר מגיל 10
              onChange={(e) => setBdate(e.target.value)}
            />
          </div>
          <div className={classes.form__item}>
            <label>Password:</label>
            <input
              className={classes.inputBox}
              type="password"
              required
              value={password}
              pattern="^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Submit text="Create My Account!" />
          <p className={classes.p}>
            Already Have an Acount?{" "}
            <span onClick={navigateToLogIn}>Log In!</span>
          </p>
        </form>
      </div>
      {show ? (
        <div className={classes.popUpErrorMsg}>
          <p>A user with this Email already exists</p>
        </div>
      ) : null}
    </div>
  );
}

export default CreateAccount;
