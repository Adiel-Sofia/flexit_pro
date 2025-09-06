const express = require("express");
const router = express.Router();
const dbSingleton = require("../dbSingleton");
const db = dbSingleton.getConnection();

// מחזיר את רשימת postId לפי functionId
router.post("/", (req, res) => {
  const functionId = req.body.functionId;
  const query = "SELECT postId FROM functions_posts WHERE functionId = ?";

  db.query(query, [functionId], (err, result) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).send(err);
    }
    // מחזירים את כל השורות (מערך של אובייקטים)
    res.send(result);
  });
});

// מחזיר נתוני פוסטים לפי רשימת מזהי postId
router.post("/data", (req, res) => {
  const postsIds = req.body.postsIds; // אמור להיות מערך של מספרים [1,2,3]
  const query = "SELECT * FROM posts WHERE postId IN (?)";

  db.query(query, [postsIds], (err, result) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).send(err);
    }

    res.send(result);
  });
});

//עריכת נתונים של פוסט של בלוג
router.put("/edit", (req, res) => {
  const postId = req.body.postId;
  const title = req.body.title;
  const date = req.body.date;
  const content = req.body.content;
  const query = `
  UPDATE posts 
  SET title = ?, content = ?, postDate = ?
  WHERE postId = ?
`;

  db.query(query, [title, content, date, postId], (err, result) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).send(err);
    }
    res.send(true);
  });
});

//הוספת פוסט לבלוג מסוים במסד הנתונים
router.put("/add", (req, res) => {
  const functionId = req.body.functionId;
  const title = req.body.title;
  const content = req.body.content;
  const query =
    "INSERT INTO posts (title, content, postDate) VALUES ( ?,? , CURDATE());";

  db.query(query, [title, content], (err, result) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).send(err);
    }
    const postId = result.insertId;
    const query1 =
      "INSERT into functions_posts (functionId , postId) VALUES (?, ?)";

    db.query(query1, [functionId, postId], (err, result) => {
      if (err) {
        console.error("DB error:", err);
        return res.status(500).send(err);
      }
      res.send(true);
    });
  });
});

//מחיקת פוסט מסוים מבלוג במסד הנתונים
router.delete("/delete/:postId", (req, res) => {
  const postId = req.params.postId;
  const query1 = "DELETE FROM posts WHERE postId = ?";
  db.query(query1, [postId], (err, result) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).send(err);
    }
    res.send(true);
  });
});

module.exports = router;
