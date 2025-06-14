const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const dbSingleton = require("../dbSingleton");
const sgMail = require("@sendgrid/mail");
const db = dbSingleton.getConnection();

const system_mail = "FLEXIT.workspace@gmail.com";
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: system_mail,
//     pass: "Flexit&workspace123",
//   },
// });
sgMail.setApiKey("SENDGRID_API_KEY");

router.post("/register", (req, res) => {
  let flag = false;
  const { email, firstName, lastName, phone, userName, userbDate, password } =
    req.body;
  const img = null;
  const query = "SELECT * FROM users WHERE email=? ";
  db.query(query, [email], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    if (results.length > 0) res.json(true);
    else {
      console.log(email, firstName);
      const query1 =
        "INSERT INTO users (email, userName, password, firstName, lastName, phoneNumber, bDay) VALUES (?,?,?,?,?,?,?)";
      db.query(
        query1,
        [email, userName, password, firstName, lastName, phone, userbDate, img],
        (err, results) => {
          if (err) {
            res.status(500).send(err);
            return;
          }
          // const mailOptions = {
          //   from: system_mail,
          //   to: email,
          //   subject: "Sending Email using Node.js",
          //   text: "That was easy!",
          // };

          // transporter.sendMail(mailOptions, function (error, info) {
          //   if (error) {
          //     console.log(error);
          //   } else {
          //     console.log("Email sent: " + info.response);
          //   }
          // });

          // const msg = {
          //   to: email,
          //   from: system_mail,
          //   subject: "Trying",
          //   text: "checks if it works",
          //   html: "<p>fasdsdxz</p>",
          // };

          // sgMail
          //   .send(msg)
          //   .then(() => {
          //     console.log("success");
          //   })
          //   .catch((error) => {
          //     console.error("Error:", error);
          //   });
        }
      );
    }
  });
});
router.post("/", (req, res) => {
  const userData = req.body;
  let userIn = null;

  const query = "SELECT * FROM users";
  db.query(query, [], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    //dealing with results
    for (let i = 0; i < results.length; i++) {
      if (
        results[i].email === userData.email &&
        results[i].password === userData.password
      ) {
        console.log("found");
        userIn = results[i];
      }
    }

    res.json(userIn);
  });
});

module.exports = router;
