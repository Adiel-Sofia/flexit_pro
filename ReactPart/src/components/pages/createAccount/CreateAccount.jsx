import finalLogo from "../../../assets/finalLogo.png";
import classes from "../createAccount/createAccount.module.css";
import { useState } from "react";
import Submit from "../../buttons/submit/Submit";
function CreateAccount(props) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [userName, setUserName] = useState("");
  const [userbDate, setBdate] = useState("");
  const [password, setPassword] = useState("");
  const func = props.func;
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
            <label>First Name:</label>
            <input
              className={classes.inputBox}
              type="text"
              required
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
              pattern="^[0-9]{10}$"
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
              placeholder="User Name"
              onChange={(e) => setBdate(e.target.value)}
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
          <Submit text="Create My Account!" />
        </form>
      </div>
    </div>
  );
}

export default CreateAccount;
