import React, { useEffect, useState } from "react";
import classes from "../updateProfile/updateProfile.module.css";
import Submit from "../../buttons/submit/Submit";
import axios from "axios";

export default function ChangePassword(props) {
  const [email, setEmail] = useState(
    JSON.parse(localStorage.getItem("user")).email
  );
  const [formerPassword, setFormerPassword] = useState("");
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [userNumber, setUserNumber] = useState("");
  const [randomNumber, setRandomNumber] = useState(
    Math.floor(Math.random() * 9000) + 1000
  );
  const { setChangePassPopUp } = props;

  function sendVerificationCode() {
    const generatedNumber = Math.floor(Math.random() * 9000) + 1000;
    setRandomNumber(generatedNumber);
    const dataToSend = {
      email: email,
      randomNumber: generatedNumber,
    };
    axios
      .put("user/sendEmail", dataToSend)
      .then((res) => {
        console.log("Email has been sent");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(randomNumber);
    console.log(userNumber);
    if (String(randomNumber) === userNumber) {
      const userToUpdate = {
        email: email,
        oldPass: formerPassword,
        newPass: newPassword1,
      };
      if (newPassword1 === newPassword2) {
        axios
          .put("user/changePassword", userToUpdate)
          .then((res) => {
            if (res) setChangePassPopUp(false);
            else {
              //הודעת שגיאה של סיסמה נוכחית לא נכונה
              console.log("the password is incorect");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } else {
        //the 2 password do not match
        console.log("the 2 password do not match");
      }
    } else {
      //msg that the number from email is incorrect
      console.log("the 4 digits are incorect");
    }
  };

  return (
    <div className={classes.overlay}>
      <div className={classes.popup}>
        {/* Close Button */}
        <button
          className={classes.closeButton}
          onClick={() => setChangePassPopUp(false)}
        >
          &times;
        </button>
        <form className={classes.createAccountForm} onSubmit={handleSubmit}>
          <div className={classes.form__item}>
            <label>Current Password:</label>
            <input
              className={classes.inputBox}
              type="password"
              required
              value={formerPassword}
              placeholder="Current Password"
              onChange={(e) => setFormerPassword(e.target.value)}
            />
          </div>
          <div className={classes.form__item}>
            <label>Digits from email</label>
            <input
              className={classes.inputBox}
              type="text"
              inputMode="numeric"
              pattern="\d{4}"
              maxLength={4}
              placeholder="Enter 4 digits from email"
              onChange={(e) => setUserNumber(e.target.value)}
            />
            <button onClick={sendVerificationCode}>
              Send me Verification Code
            </button>
          </div>
          <div className={classes.form__item}>
            <label>New Password:</label>
            <input
              className={classes.inputBox}
              type="password"
              required
              pattern="^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$"
              value={newPassword1}
              placeholder="New Password"
              onChange={(e) => setNewPassword1(e.target.value)}
            />
          </div>
          <div className={classes.form__item}>
            <label>New Password - again:</label>
            <input
              className={classes.inputBox}
              type="password"
              required
              pattern="^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$"
              value={newPassword2}
              placeholder="New Password - again"
              onChange={(e) => setNewPassword2(e.target.value)}
            />
          </div>

          <Submit text="change my password" />
        </form>
      </div>
    </div>
  );
}
