const express = require("express");
const router = express.Router();
const dbSingleton = require("../dbSingleton");
const db = dbSingleton.getConnection();

//add new functions to db
router.post("/", (req, res) => {
  const email = req.body.email;
  const functions = req.body.functions;
  const projectId = req.body.projectId;
  const types = Object.keys(functions);
  const trueTypes = types.filter((key) => functions[key] === true);
  trueTypes.forEach((element) => {
    const query1 = "INSERT INTO functions (type,active) VALUES (?,?)";
    db.query(query1, [element, true], (err, results) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      const query2 =
        "INSERT INTO projects_functions (projectId,functionId) VALUES (?,?)";
      db.query(query2, [projectId, results.insertId], (err, result) => {
        if (err) {
          res.status(500).send(err);
          return;
        }
        const query3 =
          "INSERT INTO users_funcitons (email, functionId, ownerFunction, readPermission,writePermission) VALUES(?,?,?,?,?)";
        db.query(
          query3,
          [email, results.insertId, true, true, true],
          (err, result) => {
            if (err) {
              res.status(500).send(err);
              return;
            }
            res.status(200).json({
              success: true,
              message: "function added successfully.",
            });
          }
        );
      });
    });
  });
});
module.exports = router;
