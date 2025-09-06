const express = require("express");
const router = express.Router();
const dbSingleton = require("../dbSingleton");
const db = dbSingleton.getConnection();
const multer = require("multer");
const path = require("path");

//הבאת כל fileId מהמסד נתונים בהתאם לפונקציה
router.post("/", (req, res) => {
  const functionId = req.body.functionId;

  const query = "SELECT fileId FROM functions_files WHERE functionId = ?";

  db.query(query, [functionId], (err, result) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).send(err);
    }
    res.send(result);
  });
});

//הבאת כל נתוני הקבצים לפי רשימת fileIds
router.post("/data", (req, res) => {
  const filesIds = req.body.filesIds;
  const query = "SELECT * FROM files WHERE fileId IN (?)";

  db.query(query, [filesIds], (err, result) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).send(err);
    }

    res.send(result);
  });
});

//מחיקת קובץ מהמסד נתונים
router.delete("/delete/:fileId", (req, res) => {
  const fileId = req.params.fileId;
  const query1 = "DELETE FROM files WHERE fileId = ?";
  db.query(query1, [fileId], (err, result) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).send(err);
    }
    res.send(true);
  });
});

// הגדרת storage עם תיקיית files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "E:/Flexit/NodePart/uploads/files"); // שומר בתיקייה files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

//סינון סוגי הקובצים שניתן להעלות
function fileFilter(req, file, cb) {
  const allowedTypes = /doc|docx|xls|xlsx|pdf|txt/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(
      new Error("you can only upload (doc,docx,xls,xlsx,pdf,txt) type of files")
    );
  }
}

const upload = multer({ storage: storage, fileFilter: fileFilter });

//uploading files
router.post("/uploads", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "no files uploaded" });
  }

  const functionId = req.body.functionId;
  if (!functionId) {
    return res.status(400).json({ error: "functionId is required" });
  }

  const fileName = req.file.filename;
  const originalName = req.file.originalname; // השם המקורי של הקובץ

  const query = "INSERT INTO files (fileName, originalName) VALUES (?, ?)";
  db.query(query, [fileName, originalName], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ err });
    }

    const fileId = result.insertId;

    const query1 =
      "INSERT INTO functions_files (functionId, fileId) VALUES (?, ?)";
    db.query(query1, [functionId, fileId], (err2) => {
      if (err2) {
        console.error("Err:", err2);
        return res.status(500).json({ err2 });
      }

      res.send(true);
    });
  });
});

module.exports = router;
