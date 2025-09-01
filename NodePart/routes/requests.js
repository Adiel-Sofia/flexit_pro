const express = require("express");
const router = express.Router();
const dbSingleton = require("../dbSingleton");
const db = dbSingleton.getConnection();
router.post("/accept", (req, res) => {
  const userEmail = req.body.userEmail;
  const query = "SELECT * FROM requests WHERE toUser = ?";

  db.query(query, [userEmail], (err, result) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).send(err);
    }
    console.log(result.data);
    res.send(result);
  });
});

router.put("/deny", (req, res) => {
  const requestId = req.body.requestId;
  const query = "UPDATE requests SET active = ? WHERE requestId = ?";
  db.query(query, [0, requestId], (err, result) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).send(err);
    }

    res.send(true);
  });
});
router.post("/", (req, res) => {
  const email = req.body.email;
  console.log(email);
  const query = "SELECT * FROM requests WHERE toUser = ? and active=? ";

  db.query(query, [email, 1], (err, result) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).send(err);
    }

    console.log(result);
    res.send(result);
  });
});

module.exports = router;
