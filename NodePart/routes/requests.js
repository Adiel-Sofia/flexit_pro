const express = require("express");
const router = express.Router();
const dbSingleton = require("../dbSingleton");
const db = dbSingleton.getConnection();

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

router.put("/accept", (req, res) => {
  const requestId = req.body.requestId;
  const projectId = req.body.projectId;
  const email = req.body.email;

  const query = "UPDATE requests SET active = ? WHERE requestId = ?";
  db.query(query, [0, requestId], (err, result) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).send(err);
    }

    const query1 =
      "INSERT INTO users_projects (email , projectId, owner) VALUES (?,?,?)";
    db.query(query1, [email, projectId, 0], (err, result) => {
      if (err) {
        console.error("DB error:", err);
        return res.status(500).send(err);
      }
    });

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
