import React, { useEffect, useState } from "react";
import classes from "../updateProfile/updateProfile.module.css";
import Submit from "../../buttons/submit/Submit";
import axios from "axios";

export default function UpdateProfile(props) {
  // שמירת האימייל של המשתמש מתוך localStorage
  const [email, setEmail] = useState(
    JSON.parse(localStorage.getItem("user")).email
  );
  // סטייטים עבור פרטי המשתמש
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [userName, setUserName] = useState("");
  const { setUpdatePopUp } = props;

  // פונקציה לשליחת הטופס - מעדכנת את פרטי המשתמש בשרת
  const handleSubmit = (e) => {
    const userToUpdate = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phone,
      userName: userName,
    };
    axios
      .put("user/update", userToUpdate)
      .then((res) => {
        setUpdatePopUp(false); // סגירת חלון העדכון לאחר הצלחה
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // טעינת הנתונים הראשוניים של המשתמש עם טעינת הקומפוננטה
  useEffect(() => {
    fetchData();
  }, []);

  // בקשת נתוני המשתמש מהשרת לפי האימייל
  const fetchData = () => {
    const userToSend = {
      email: email,
    };
    axios
      .post("user/getData", userToSend)
      .then((res) => {
        console.log(res.data);
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setPhone(res.data.phoneNumber);
        setUserName(res.data.userName);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    // מבנה ה־UI של הפופאפ לעדכון פרופיל
    <div className={classes.overlay}>
      <div className={classes.popup}>
        {/* כפתור לסגירת הפופאפ */}
        <button
          className={classes.closeButton}
          onClick={() => setUpdatePopUp(false)}
        >
          &times;
        </button>

        {/* טופס עדכון פרטי המשתמש */}
        <form className={classes.createAccountForm} onSubmit={handleSubmit}>
          {/* שדה אימייל - לקריאה בלבד */}
          <div className={classes.form__item}>
            <label>Email:</label>
            <input
              className={classes.inputBox}
              type="Email"
              readOnly
              value={email}
            />
          </div>

          {/* שדה שם פרטי */}
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

          {/* שדה שם משפחה */}
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

          {/* שדה טלפון עם pattern לתבנית תקינה */}
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

          {/* שדה שם משתמש */}
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

          {/* כפתור שליחה - עדכון פרופיל */}
          <Submit text="Update My Profile!" />
        </form>
      </div>
    </div>
  );
}
