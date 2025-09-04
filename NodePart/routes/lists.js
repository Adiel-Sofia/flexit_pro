const express = require("express");
const router = express.Router();
const dbSingleton = require("../dbSingleton");
const db = dbSingleton.getConnection();

// router.post("/", (req, res) => {
//   const functionId = req.body.functionId;

//   const query = `
//     SELECT l.listId, l.listName, li.content
//     FROM list_function lf
//     JOIN list l ON lf.listId = l.listId
//     JOIN list_listitem lli ON l.listId = lli.listId
//     JOIN listitem li ON lli.listItemId = li.listItemId
//     WHERE lf.functionId = ?
//     ORDER BY l.listId, li.listItemId
//   `;

//   db.query(query, [functionId], (err, results) => {
//     if (err) {
//       console.error("DB error:", err);
//       return res.status(500).send(err);
//     }

//     const listsArray = [];

//     results.forEach((row) => {
//       // מחפשים אם הרשימה כבר קיימת במערך
//       let listObj = listsArray.find((l) => l.listId === row.listId);

//       if (!listObj) {
//         // אם לא קיימת, יוצרים אובייקט חדש ומוסיפים למערך
//         listObj = {
//           listId: row.listId,
//           title: row.listName,
//           items: [],
//         };
//         listsArray.push(listObj);
//       }

//       listObj.items.push({ text: row.content, completed: false });
//     });

//     res.json(listsArray);
//   });
// });
router.post("/", (req, res) => {
  const functionId = req.body.functionId;

  const query = `
    SELECT l.listId, l.listName, li.content
    FROM list_function lf
    JOIN list l ON lf.listId = l.listId
    LEFT JOIN list_listitem lli ON l.listId = lli.listId
    LEFT JOIN listitem li ON lli.listItemId = li.listItemId
    WHERE lf.functionId = ?
    ORDER BY l.listId, li.listItemId
  `;

  db.query(query, [functionId], (err, results) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).send(err);
    }

    const listsArray = [];

    results.forEach((row) => {
      // מחפשים אם הרשימה כבר קיימת במערך
      let listObj = listsArray.find((l) => l.listId === row.listId);

      if (!listObj) {
        // אם לא קיימת, יוצרים אובייקט חדש ומוסיפים למערך
        listObj = {
          listId: row.listId,
          title: row.listName,
          items: [],
        };
        listsArray.push(listObj);
      }

      if (row.content) {
        listObj.items.push({ text: row.content, completed: false });
      }
    });

    res.json(listsArray);
  });
});

router.delete("/delete/:listId", (req, res) => {
  const listId = req.params.listId;

  const deleteItemsQuery = `
    DELETE li FROM listitem li
    JOIN list_listitem lli ON li.listItemId = lli.listItemId
    WHERE lli.listId = ?
  `;

  db.query(deleteItemsQuery, [listId], (err) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).send(err);
    }

    // אחרי זה מוחקים את הרשימה עצמה
    const deleteListQuery = "DELETE FROM list WHERE listId = ?";
    db.query(deleteListQuery, [listId], (err2) => {
      if (err2) {
        console.error("DB error:", err2);
        return res.status(500).send(err2);
      }
      res.send(true);
    });
  });
});

router.post("/add", (req, res) => {
  const { functionId, listName } = req.body;

  if (!functionId || !listName) {
    return res
      .status(400)
      .json({ error: "functionId and listName are required" });
  }

  // 1. מוסיפים רשימה לטבלה list
  const insertListQuery = "INSERT INTO list (listName) VALUES (?)";

  db.query(insertListQuery, [listName], (err, result) => {
    if (err) {
      console.error("DB error inserting into list:", err);
      return res.status(500).send(err);
    }

    const newListId = result.insertId;

    // 2. מוסיפים קשר לטבלה list_function
    const insertRelationQuery =
      "INSERT INTO list_function (functionId, listId) VALUES (?, ?)";
    db.query(insertRelationQuery, [functionId, newListId], (err2) => {
      if (err2) {
        console.error("DB error inserting into list_function:", err2);
        return res.status(500).send(err2);
      }

      res.json({
        success: true,
        listId: newListId,
        listName,
        functionId,
      });
    });
  });
});

router.post("/itemAddition", (req, res) => {
  const { listId, text } = req.body;

  // כאן כבר מניחים שהבדיקה נעשתה בצד React
  if (!listId || !text) {
    return res.status(400).send({ error: "Missing listId or text" });
  }

  // מוסיפים את הפריט לטבלת listitem
  const insertItemQuery = "INSERT INTO listitem (content) VALUES (?)";

  db.query(insertItemQuery, [text], (err, result) => {
    if (err) {
      console.error("DB error inserting item:", err);
      return res.status(500).send(err);
    }

    const newItemId = result.insertId;

    // מוסיפים את הקשר בין הרשימה והפריט בטבלה list_listitem
    const insertLinkQuery =
      "INSERT INTO list_listitem (listId, listItemId) VALUES (?, ?)";

    db.query(insertLinkQuery, [listId, newItemId], (err2) => {
      if (err2) {
        console.error("DB error inserting link:", err2);
        return res.status(500).send(err2);
      }

      res.send({ success: true, listItemId: newItemId });
    });
  });
});

module.exports = router;
