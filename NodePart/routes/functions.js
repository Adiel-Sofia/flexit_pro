const express = require("express");
const router = express.Router();
const dbSingleton = require("../dbSingleton");
const db = dbSingleton.getConnection();

//add new functions to db
router.post("/", (req, res) => {
  const email = req.body.email;
  const functions = req.body.functions;
  const projectId = req.body.projectId.id;
  console.log(
    "email:",
    email,
    " functions:",
    functions,
    " projectId: ",
    projectId
  );
  const types = Object.keys(functions);
  const trueTypes = types.filter((key) => functions[key] === true);

  if (trueTypes.length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "No functions selected." });
  }

  let completed = 0;
  let hasError = false;

  trueTypes.forEach((type) => {
    const query1 = "INSERT INTO functions (type, active) VALUES (?, ?)";
    db.query(query1, [type, true], (err, results) => {
      if (hasError) return;

      if (err) {
        hasError = true;
        return res
          .status(500)
          .send("Error inserting to functions: " + err.message);
      }

      const functionId = results.insertId;
      console.log("Inserting into projects_functions:", projectId, functionId);
      const query2 =
        "INSERT INTO projects_functions (projectId, functionId) VALUES (?, ?)";
      db.query(query2, [projectId, functionId], (err) => {
        if (hasError) return;
        if (err) {
          hasError = true;
          return res
            .status(500)
            .send("Error inserting to projects_functions: " + err.message);
        }
        console.log("sedond query pass");
        const query3 = `
          INSERT INTO users_funcitons 
          (email, functionId, ownerFunction, readPermission, writePermission) 
          VALUES (?, ?, ?, ?, ?)`;

        db.query(query3, [email, functionId, true, true, true], (err) => {
          if (hasError) return;

          if (err) {
            hasError = true;
            return res
              .status(500)
              .send("Error inserting to users_funcitons: " + err.message);
          }
          console.log("third query pass");
          completed++;

          if (completed === trueTypes.length) {
            return res.status(200).json({
              functionId: functionId,
              success: true,
              message: "All functions added successfully.",
            });
          }
        });
      });
    });
  });
});

//update active for a function in DB
router.put("/updateActive", (req, res) => {
  const functionId = req.body.functionId;
  const state = req.body.state;
  console.log("we enter: ", state, functionId);
  const query = "UPDATE functions  SET active = ? WHERE functionId = ?";
  db.query(query, [state, functionId], (err) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.status(200).json({
      success: true,
      message: "Function status changed successfully.",
    });
  });
});

module.exports = router;
