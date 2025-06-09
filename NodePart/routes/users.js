const express = require("express");
const router = express.Router();
const dbSingleton = require("../dbSingleton");
const db = dbSingleton.getConnection();

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
    console.log(results);
    if (results.length > 0) res.json(true);
    else {
      console.log(email, firstName);
      const query1 =
        "INSERT INTO users (email, userName, password, firstName, lastName, phoneNumber, bDate, img) VALUES (?,?,?,?,?,?,?,?) ";
      db.query(
        query1,
        [email, userName, password, firstName, lastName, phone, userbDate, img],
        (err, results) => {
          if (err) {
            res.status(500).send(err);
            return;
          }
          console.log(results);
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

router.delete("/:id", (req, res) => {
  res.json({ message: "article deleted!" });
});
module.exports = router;
