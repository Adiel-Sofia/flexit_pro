require("dotenv").config(); // Add this at the very top of your entry file (e.g., app.js or server.js)
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const dbSingleton = require("../dbSingleton");
const sgMail = require("@sendgrid/mail");
const db = dbSingleton.getConnection();

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

//request to enter a new user to db
router.post("/register", (req, res) => {
  let flag = false;
  const { email, firstName, lastName, phone, userName, userbDate, password } =
    req.body;
  const img = null;

  //checks if there is already a user
  const query = "SELECT * FROM users WHERE email=? ";
  db.query(query, [email], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    //if a user exists send false so the FE can show err msg
    if (results.length > 0) flag = false;
    else {
      //in case there is no user - enter it to the db
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

          //prepering email information
          const mailOptions = {
            from: system_mail,
            to: email,
            subject: "Sending Email using Node.js",
            text: "That was easy!",
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });

          const msg = {
            to: email,
            from: system_mail,
            subject: "Trying",
            text: "checks if it works",
            html: "<p>fasdsdxz</p>",
          };

          //sending email
          sgMail
            .send(msg)
            .then(() => {
              flag = true;
              res.send(flag);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }
      );
    }
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

//cheking if user exist to log in
router.post("/", (req, res) => {
  const userData = req.body;
  let userIn = null;

  //checking if the email and password entered are correct - in the DB
  const query = "SELECT * FROM users WHERE email=? AND password=?";
  db.query(query, [userData.email, userData.password], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    //dealing with results - if there is a user send the details , if not send null
    if (results[0]) userIn = results[0];
    res.json(userIn);
  });
});

//update a user in db
router.put("/update", (req, res) => {
  const userData = req.body;
  console.log("in");
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
      console.log("success");
    }
  );
});

module.exports = router;
