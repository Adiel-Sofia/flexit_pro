const express = require("express");
const router = express.Router();
const dbSingleton = require("../dbSingleton");
const db = dbSingleton.getConnection();

//getting all the projects data to show in FE
router.post("/", (req, res) => {
  const email = req.body.email;
  const query1 = `
  SELECT p.projectId, p.projectName, p.color, up.owner
  FROM users_projects up
  JOIN projects p ON up.projectId = p.projectId
  WHERE up.email = ?
    AND p.active = ?;
`;

  db.query(query1, [email, 1], (err, results) => {
    if (err) {
      console.error("DB Error:", err);
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

//getting the information of the peojects's functions
router.post("/functions", (req, res) => {
  const projectId = req.body.functionId;

  //get data of a functions based on project id

  const query1 =
    "SELECT * " +
    "FROM projects_functions pf " +
    "JOIN functions f ON pf.functionId = f.functionId " +
    "WHERE pf.projectId = ? ";

  db.query(query1, [projectId], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    // console.log(results);
    res.json(results);
  });
});

//adiing a new project and the relationship with the user
router.post("/add", (req, res) => {
  const projectName = req.body.name;
  const color = req.body.color;
  const email = req.body.email;

  const query =
    "SELECT * from projects  NATURAL JOIN users_projects WHERE projectName=? ";
  db.query(query, [projectName], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    //checking if project exists
    if (results.length > 0) {
      res
        .status(409)
        .json({ success: false, message: "Project name already exists." });
      return;
    } else {
      //enter a new project to db
      const query1 =
        "INSERT INTO projects (projectName , color, active) VALUES(?,?,?)";
      db.query(query1, [projectName, color, true], (err, results) => {
        if (err) {
          res.status(500).send(err);
          return;
        }
        //adding to users_project
        newProjectId = results.insertId;
        const query2 =
          "INSERT INTO users_projects (email , projectId, owner) VALUES(?,? ,?)";
        db.query(query2, [email, newProjectId, true], (err, result) => {
          if (err) {
            res.status(500).send(err);
            return;
          }
          console.log(newProjectId);
          res.status(200).json({
            success: true,
            newProjectId: newProjectId,
            message: "Project added successfully.",
          });
        });
      });
    }
  });
});

//changing color and name in db
router.put("/style", (req, res) => {
  console.log(req.body.name);
  const projectName = req.body.projectName;
  const projectId = req.body.projectId;
  const color = req.body.color;

  const query =
    "UPDATE projects SET projectName = ? ,color=? WHERE projectId = ?";

  db.query(query, [projectName, color, projectId], (err) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.status(200).json({
      success: true,
      message: "Project style and name changed successfully.",
    });
  });
});

router.put("/delete", (req, res) => {
  const projectId = req.body.projectId;
  console.log(projectId);
  const query = "UPDATE projects SET active = ?  WHERE projectId = ?";
  db.query(query, [0, projectId], (err) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.status(200).json({
      success: true,
      message: "Project active changed successfully.",
    });
  });
});

router.post("/share", (req, res) => {
  const projectId = req.body.projectId;
  const fromEmail = req.body.fromEmail;
  const toEmail = req.body.toEmail;
  const projectName = req.body.projectName;
  console.log("projectId:", projectId);
  console.log("fromEmail:", fromEmail);
  console.log("toEmail:", toEmail);
  console.log("projectName:", projectName);
  const query = "SELECT * FROM users WHERE email=?";
  db.query(query, [toEmail], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    //dealing with results - if there is a user send the details , if not send null
    if (results[0]) {
      const query1 =
        "INSERT INTO requests (fromUser , toUser , projectId , active, projectName)  values ( ?,?,?,?,?)";

      db.query(
        query1,
        [fromEmail, toEmail, projectId, 1, projectName],
        (err, results) => {
          if (err) {
            res.status(500).send(err);
            return;
          }
          res.json(true);
        }
      );
    } else {
      res.json(false);
    }
  });
});

module.exports = router;
