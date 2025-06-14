const express = require("express");
const router = express.Router();
const dbSingleton = require("../dbSingleton");
const db = dbSingleton.getConnection();

router.post("/", (req, res) => {
  const email = req.body.email;

  const query1 =
    "SELECT projectName , projectId,owner FROM users_projects NATURAL JOIN projects WHERE email=?";
  // const query1 = "SELECT projectId FROM users_projects WHERE email=?";
  db.query(query1, [email], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

router.post("/functions", (req, res) => {
  const projectId = req.body.functionId;
  console.log(projectId);
  const query1 =
    "SELECT *  FROM projects_functions NATURAL JOIN functions where projectId=?";
  db.query(query1, [projectId], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    console.log(results);
    // res.json(results);
  });
});

module.exports = router;
