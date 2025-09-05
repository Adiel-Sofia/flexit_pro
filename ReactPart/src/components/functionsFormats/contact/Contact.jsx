import React, { useState } from "react";
import classes from "./contact.module.css";
import { IoPeopleCircleOutline } from "react-icons/io5";
import { MdEdit, MdDelete } from "react-icons/md";
import axios from "axios";

/**
 * ContactCard
 * Props:
 * - contactId: number
 * - fullName: string
 * - email: string
 * - phone: string
 * - getAllContacts: function (לריענון רשימת אנשי קשר)
 */
export default function Contact({
  contactId,
  fullName = "Adiel Sofia Mendelson",
  email = "adiel13150@gmail.com",
  phoneNumber = "054-4777627",
  getAllContacts,
}) {
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [editContact, setEditContact] = useState({
    fullName,
    email,
    phoneNumber,
  });
  const [errorMessage, setErrorMessage] = useState("");

  // --- Handle Edit ---
  function handleEdit() {
    if (
      !editContact.fullName ||
      !editContact.email ||
      !editContact.phoneNumber
    ) {
      setErrorMessage("כל השדות חובה למילוי");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editContact.email)) {
      setErrorMessage("פורמט אימייל לא נכון");
      return;
    }

    const phoneRegex = /^[0-9\-+]{7,15}$/;
    if (!phoneRegex.test(editContact.phoneNumber)) {
      setErrorMessage("פורמט טלפון לא נכון");
      return;
    }

    axios
      .post("/contacts/edit", { contactId, ...editContact })
      .then(() => {
        setShowEditPopup(false);
        getAllContacts();
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage("שגיאה בשרת, נסה שוב");
      });
  }

  function handleDelete() {
    axios
      .delete(`/contacts/delete?contactId=${contactId}`)
      .then(() => {
        setShowDeletePopup(false);
        getAllContacts();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className={classes.wrapper}>
      {/* Buttons */}
      <div className={classes.buttonsContainer}>
        <MdEdit onClick={() => setShowEditPopup(true)} />
        <MdDelete onClick={() => setShowDeletePopup(true)} />
      </div>

      {/* Avatar */}
      <div className={classes.avatar}>
        <div className={classes.initials}>
          <IoPeopleCircleOutline />
        </div>
      </div>

      {/* Info */}
      <div className={classes.info}>
        <div className={classes.fullName}>{fullName}</div>
        <div className={classes.email}>{email}</div>
        <div className={classes.phone}>{phoneNumber}</div>
      </div>

      {/* Edit Popup */}
      {showEditPopup && (
        <div className={classes.popupOverlay}>
          <div className={classes.popup}>
            <h3>Edit Contact</h3>
            {errorMessage && (
              <div className={classes.error}>{errorMessage}</div>
            )}
            <input
              placeholder="Full Name"
              value={editContact.fullName}
              onChange={(e) =>
                setEditContact({ ...editContact, fullName: e.target.value })
              }
            />
            <input
              placeholder="Email"
              value={editContact.email}
              onChange={(e) =>
                setEditContact({ ...editContact, email: e.target.value })
              }
            />
            <input
              placeholder="Phone Number"
              value={editContact.phoneNumber}
              onChange={(e) =>
                setEditContact({ ...editContact, phoneNumber: e.target.value })
              }
            />

            <div className={classes.popupButtons}>
              <button onClick={handleEdit} className={classes.saveBtn}>
                Save
              </button>
              <button
                onClick={() => {
                  setShowEditPopup(false);
                  setErrorMessage("");
                  setEditContact({ fullName, email, phoneNumber });
                }}
                className={classes.cancelBtn}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Popup */}
      {showDeletePopup && (
        <div className={classes.popupOverlay}>
          <div className={classes.popup}>
            <h3>Delete Contact</h3>
            <p>
              Are you sure you want to delete <span>{fullName}</span>?
            </p>
            <div className={classes.popupButtons}>
              <button onClick={handleDelete} className={classes.deleteBtn}>
                Delete
              </button>
              <button
                onClick={() => setShowDeletePopup(false)}
                className={classes.cancelBtn}
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
