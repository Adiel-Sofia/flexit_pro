require("dotenv").config();
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const dbSingleton = require("../dbSingleton");
const sgMail = require("@sendgrid/mail");
const db = dbSingleton.getConnection();
const bcrypt = require("bcrypt");

//our email to send from
const system_mail = "FLEXIT.workspace@gmail.com";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: system_mail,
    pass: "xltv loih wpil xhxu",
  },
});

router.post("/register", (req, res) => {
  const { email, firstName, lastName, phone, userName, userbDate, password } =
    req.body;
  const img = null;

  // בדיקה אם המשתמש כבר קיים
  const query = "SELECT * FROM users WHERE email=? ";
  db.query(query, [email], (err, results) => {
    if (err) return res.status(500).send(err);

    if (results.length > 0) {
      return res.send(false); // כבר קיים
    }

    // הצפנת סיסמה לפני שמירה
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).send(err);

      const query1 =
        "INSERT INTO users (email, userName, password, firstName, lastName, phoneNumber, bDay, img) VALUES (?,?,?,?,?,?,?,?)";

      db.query(
        query1,
        [
          email,
          userName,
          hashedPassword,
          firstName,
          lastName,
          phone,
          userbDate,
          img,
        ],
        (err, results) => {
          if (err) return res.status(500).send(err);

          // שליחת מייל
          const mailOptions = {
            from: system_mail,
            to: email,
            subject: "Thank You for Joining Us!",
            text: `Hi and welcome!\n\nThank you for signing up...`,
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) console.log(error);
            return res.status(200).send({ success: true });
          });
        }
      );
    });
  });
});

//getting information about the user - to show on update popUp
router.post("/getData", (req, res) => {
  const userData = req.body;
  let userIn = null;

  //getting the information of one user
  const query = "SELECT * FROM users WHERE email=?";
  db.query(query, [userData.email], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    //dealing with results - checking if there is a user and sending the data to FE
    if (results[0]) userIn = results[0];
    res.json(userIn);
  });
});

// התחברות
router.post("/", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email=?";
  db.query(query, [email], (err, results) => {
    if (err) return res.status(500).send(err);

    if (!results[0]) {
      return res.json(null); // משתמש לא נמצא
    }

    const user = results[0];

    // השוואה בין סיסמה שהוזנה לסיסמה המוצפנת בבסיס הנתונים
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).send(err);

      if (isMatch) {
        // יוצרים אובייקט חדש בלי הסיסמה
        const safeUser = {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          userName: user.userName,
        };
        res.json(safeUser); // שולחים רק מידע בטוח
      } else {
        res.json(null); // סיסמה לא נכונה
      }
    });
  });
});

//Sending email with number to verify
router.put("/sendEmail", (req, res) => {
  const { email, randomNumber } = req.body;
  const mailOptions = {
    from: system_mail,
    to: email,
    subject: "Your Verification Code",
    text: `Hi,

          We received a request to verify your identity. To continue, please enter the 4-digit code below on our website:

          🔐 Your code: ${randomNumber}

          If you did not request this code, please ignore this message.

          If you need help or did not initiate this request, feel free to contact our support team.

          Thank you,
          The Flexit Team`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }

    return res.status(200).send({ success: true });
  });
});

//החלפת סיסמה למשתמש
router.put("/changePassword", (req, res) => {
  const { email, oldPass, newPass } = req.body;

  const query = "SELECT password FROM users WHERE email=?";
  db.query(query, [email], (err, results) => {
    if (err) return res.status(500).send(err);

    if (!results[0]) return res.send(false);

    const hashedPassword = results[0].password;

    // בודקים שהסיסמה הישנה תואמת
    bcrypt.compare(oldPass, hashedPassword, (err, isMatch) => {
      if (err) return res.status(500).send(err);

      if (!isMatch) return res.send(false);

      // מצפינים את הסיסמה החדשה
      bcrypt.hash(newPass, 10, (err, newHashed) => {
        if (err) return res.status(500).send(err);

        const query1 = "UPDATE users SET password=? WHERE email=?";
        db.query(query1, [newHashed, email], (err, results) => {
          if (err) return res.status(500).send(err);
          res.send(true);
        });
      });
    });
  });
});

//update a user in db
router.put("/update", (req, res) => {
  const userData = req.body;

  //update data of a user in db
  const query =
    "UPDATE users SET userName=? , firstName=?, lastName=? ,phoneNumber=? WHERE email=?";
  db.query(
    query,
    [
      userData.userName,
      userData.firstName,
      userData.lastName,
      userData.phoneNumber,
      userData.email,
    ],
    (err, results) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      //dealing with results

      const mailOptions = {
        from: system_mail,
        to: userData.email,
        subject:
          "Thank You for Updating you informationYour Details Have Been Updated Successfully!",
        text: `Hi,

          We wanted to let you know that your account details have been successfully updated.

          If you didn’t make this change or believe an unauthorized person has accessed your account, please contact us immediately.

          Thank you for keeping your information up to date!

          Best regards,
          The Flexit Team`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          return res.status(200).send({ success: true });
        }
      });
    }
  );
});

module.exports = router;
