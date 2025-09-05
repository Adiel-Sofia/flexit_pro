const express = require("express");
const router = express.Router();
const dbSingleton = require("../dbSingleton");
const db = dbSingleton.getConnection();

// השתמש ב-router ולא ב-app
router.post("/", (req, res) => {
  const { functionId } = req.body;
  const query = `
    SELECT c.contactId, c.fullName, c.email, c.phoneNumber
    FROM contact c
    INNER JOIN functions_contacts fc ON c.contactId = fc.contactId
    WHERE fc.functionId = ?
  `;

  db.query(query, [functionId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.json(results);
  });
});

router.post("/add", (req, res) => {
  const { fullName, email, phoneNumber, functionId } = req.body;
  const insertContactQuery = `
    INSERT INTO contact (fullName, email, phoneNumber) VALUES (?, ?, ?)
  `;

  db.query(
    insertContactQuery,
    [fullName, email, phoneNumber],
    (err, result) => {
      if (err)
        return res.status(500).json({ error: "Failed to insert contact" });

      const contactId = result.insertId;
      const insertLinkQuery = `
      INSERT INTO functions_contacts (functionId, contactId) VALUES (?, ?)
    `;

      db.query(insertLinkQuery, [functionId, contactId], (err2) => {
        if (err2)
          return res.status(500).json({ error: "Failed to link contact" });

        res.json({ contactId, fullName, email, phoneNumber });
      });
    }
  );
});

// --- עדכון איש קשר ---
router.post("/edit", (req, res) => {
  const { contactId, fullName, email, phoneNumber } = req.body;

  if (!contactId || !fullName || !email || !phoneNumber) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const query = `
    UPDATE contact
    SET fullName = ?, email = ?, phoneNumber = ?
    WHERE contactId = ?
  `;

  db.query(query, [fullName, email, phoneNumber, contactId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to update contact" });
    }
    res.json({ success: true });
  });
});

router.delete("/delete", (req, res) => {
  const { contactId } = req.query; // כאן אנחנו לוקחים מה-URL

  if (!contactId) {
    return res.status(400).json({ error: "Missing contactId" });
  }

  const query = `DELETE FROM contact WHERE contactId = ?`;

  db.query(query, [contactId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to delete contact" });
    }
    res.json({ success: true });
  });
});

module.exports = router;
