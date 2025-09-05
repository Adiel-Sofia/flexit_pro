import React, { useEffect, useState } from "react";
import axios from "axios";
import Contact from "../contact/Contact";
import classes from "./allContacts.module.css";
import { IoAddCircle } from "react-icons/io5";

export default function AllContacts({ functionId }) {
  const [contacts, setContacts] = useState([]);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [newContact, setNewContact] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getAllContacts();
  }, [functionId]);

  function getAllContacts() {
    axios
      .post("/contacts", { functionId })
      .then((res) => setContacts(res.data))
      .catch((err) => console.error(err));
  }

  function handleAddContact() {
    // בדיקות צד לקוח
    if (!newContact.fullName || !newContact.email || !newContact.phoneNumber) {
      setErrorMessage("כל השדות חובה למילוי");
      return;
    }

    // בדיקת אימייל
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newContact.email)) {
      setErrorMessage("Wromg email format");
      return;
    }

    // בדיקת מספר טלפון
    const phoneRegex = /^[0-9\-+]{7,15}$/;
    if (!phoneRegex.test(newContact.phoneNumber)) {
      setErrorMessage("Wrong pgone format");
      return;
    }

    // אם כל הבדיקות עוברות
    axios
      .post("/contacts/add", { ...newContact, functionId })
      .then((res) => {
        setContacts([...contacts, res.data]);
        setShowAddPopup(false);
        setNewContact({ fullName: "", email: "", phoneNumber: "" });
        setErrorMessage("");
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage("שגיאה בשרת, נסה שוב");
      });
  }

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h2>Contacts</h2>
        <IoAddCircle
          className={classes.addIcon}
          onClick={() => setShowAddPopup(true)}
        />
      </div>

      <div className={classes.grid}>
        {contacts.map((contact) => (
          <Contact
            key={contact.contactId}
            contactId={contact.contactId}
            fullName={contact.fullName}
            email={contact.email}
            phone={contact.phoneNumber}
            getAllContacts={getAllContacts}
          />
        ))}
      </div>

      {showAddPopup && (
        <div className={classes.popupOverlay}>
          <div className={classes.popup}>
            <h3>Add a Contact</h3>
            {errorMessage && (
              <div className={classes.error}>{errorMessage}</div>
            )}
            <input
              placeholder="Full Name"
              value={newContact.fullName}
              onChange={(e) =>
                setNewContact({ ...newContact, fullName: e.target.value })
              }
            />
            <input
              placeholder="Email"
              value={newContact.email}
              onChange={(e) =>
                setNewContact({ ...newContact, email: e.target.value })
              }
            />
            <input
              placeholder="PhoneNumber"
              value={newContact.phoneNumber}
              onChange={(e) =>
                setNewContact({ ...newContact, phoneNumber: e.target.value })
              }
            />
            <div className={classes.popupButtons}>
              <button onClick={handleAddContact}>Add</button>
              <button
                onClick={() => {
                  setShowAddPopup(false);
                  setErrorMessage("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
