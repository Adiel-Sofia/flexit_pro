const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const dbSingleton = require("../dbSingleton");
const db = dbSingleton.getConnection();

//להביא את כל ה id של תמונות לפיפונקציה ספציפית
router.post("/", (req, res) => {
  const functionId = req.body.functionId;
  const query = "SELECT pictureId FROM functions_pictures WHERE functionId = ?";

  db.query(query, [functionId], (err, result) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).send(err);
    }
    res.send(result);
  });
});

//להביא את כל המידע של תמונות לפי picturesIdsשקיבנו
router.post("/data", (req, res) => {
  const picturesIds = req.body.picturesIds;
  const query = "SELECT * FROM pictures WHERE pictureId IN (?)";

  db.query(query, [picturesIds], (err, result) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).send(err);
    }

    res.send(result);
  });
});

//למחוק תמונה מהמסד נתונים
router.delete("/delete/:pictureId", (req, res) => {
  const pictureId = req.params.pictureId;
  const query1 = "DELETE FROM pictures WHERE pictureId = ?";
  db.query(query1, [pictureId], (err, result) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).send(err);
    }
    res.send(true);
  });
});

//uploading pictures

// הגדרת storage עם תיקיית pictures
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "E:/Flexit/NodePart/uploads/pictures"); // שומר בתיקייה pictures
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

//סינון סיומות הקבצים שניתן להעלות
function fileFilter(req, file, cb) {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("you can only upload (jpg, png, gif) type of files"));
  }
}

const upload = multer({ storage: storage, fileFilter: fileFilter });

// נתיב העלאת תמונה
router.post("/uploads", upload.single("picture"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "no picture uploaded" });
  }

  const functionId = req.body.functionId; // מגיע מהבקשה (axios/FormData)
  if (!functionId) {
    return res.status(400).json({ error: "functionId is required" });
  }

  const pictureName = req.file.filename;

  const query = "INSERT INTO pictures (pictureName) VALUES (?)";
  db.query(query, [pictureName], (err, result) => {
    if (err) {
      console.error("שגיאה בהכנסת הנתון לטבלת pictures:", err);
      return res.status(500).json({ error });
    }

    const pictureId = result.insertId;

    const query1 =
      "INSERT INTO functions_pictures (functionId, pictureId) VALUES (?, ?)";
    db.query(query1, [functionId, pictureId], (err2) => {
      if (err2) {
        console.error("Err:", err2);
        return res.status(500).json({ error });
      }

      res.send(true);
    });
  });
});

module.exports = router;
