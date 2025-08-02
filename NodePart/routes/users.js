require("dotenv").config();
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
    if (results.length > 0) {
      res.send(false);
    } else {
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
            subject: "Thank You for Joining Us!",
            text: `Hi and welcome!

            Thank you for signing up to our website — we're excited to have you on board.
            From now on, you'll have access to all the tools, content, and services we offer.
            If you have any questions or need assistance, feel free to reach out.

          Wishing you a great experience!

          Best regards,  
          The Team`,
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }

            return res.status(200).send({ success: true });
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
          The Team`,
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
