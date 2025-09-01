const express = require("express");
const router = express.Router();
const dbSingleton = require("../dbSingleton");
const db = dbSingleton.getConnection();

// מחזיר את רשימת eventId לפי eventId
router.post("/", (req, res) => {
  const functionId = req.body.functionId;
  const query = "SELECT eventId FROM functions_events WHERE functionId = ?";

  db.query(query, [functionId], (err, result) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).send(err);
    }

    res.send(result);
  });
});

router.post("/data", (req, res) => {
  const eventsIds = req.body.eventsIds;

  // בדיקה שהמערך תקין
  if (!Array.isArray(eventsIds) || eventsIds.length === 0) {
    return res.send([]);
  }

  const query = "SELECT * FROM event WHERE eventId IN (?)";

  db.query(query, [eventsIds], (err, result) => {
    if (err) {
      console.error("DB error in /events/data:", err);
      return res.status(500).send({ error: "Database query failed" });
    }

    res.send(result);
  });
});

router.post("/add", (req, res) => {
  const { functionId, title, startTime, endTime, allDay } = req.body;

  const formatDateTime = (dt) => {
    if (!dt) return null;

    return dt.replace("T", " ") + ":00"; // מוסיף שניות
  };

  const start = formatDateTime(startTime);
  const end = formatDateTime(endTime);

  const query =
    "INSERT INTO event (eventTitle, allDay, startTime, endTime) VALUES (?, ?, ?, ?)";

  db.query(query, [title, allDay ? 1 : 0, start, end], (err, result) => {
    if (err) {
      console.error("DB error in /events/add:", err);
      return res.status(500).send({ error: "Failed to insert event" });
    }

    const eventId = result.insertId;
    const query2 =
      "INSERT INTO functions_events (functionId, eventId) VALUES (?, ?)";

    db.query(query2, [functionId, eventId], (err2) => {
      if (err2) {
        console.error("DB error linking event to function:", err2);
        return res
          .status(500)
          .send({ error: "Failed to link event to function" });
      }

      res.send({ success: true, eventId });
    });
  });
});

router.post("/update", (req, res) => {
  const { eventId, title, startTime, endTime, allDay } = req.body;
  if (!eventId || !title || !startTime || !endTime) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const query = `
    UPDATE event
    SET eventTitle = ?, startTime = ?, endTime = ?, allDay = ?
    WHERE eventId = ?
  `;
  db.query(query, [title, startTime, endTime, allDay || 0, eventId], (err) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json({ success: true, message: "Event updated successfully" });
  });
});

router.delete("/delete/:eventId", (req, res) => {
  const eventId = req.params.eventId;
  const query1 = "DELETE FROM event WHERE eventId = ?";
  db.query(query1, [eventId], (err, result) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).send(err);
    }
    res.send(true);
  });
});

module.exports = router;
