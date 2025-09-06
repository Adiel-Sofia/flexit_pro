import React, { useState } from "react";
import classes from "./blog.module.css";
import { MdEdit, MdDelete } from "react-icons/md";
import axios from "axios";

const Blog = ({ title, author, date, content, postId, getBlogData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDate, setEditedDate] = useState(date.split("T")[0]); // רק התאריך
  const [editedContent, setEditedContent] = useState(content);

  //פונקציה למחיקת פרויקט מהשרת
  function deleteItem(postId) {
    axios
      .delete(`/posts/delete/${postId}`)
      .then((result) => {
        console.log(result.data);
        getBlogData();
        setShowDeleteConfirm(false);
      })
      .catch((error) => {
        console.error("Error in /posts/delete:", error);
      });
  }

  //שמירת פוסט חדש בשרת
  const handleSave = () => {
    const updatedPost = {
      postId: postId,
      title: editedTitle,
      date: editedDate,
      content: editedContent,
    };

    axios
      .put("/posts/edit", updatedPost)
      .then((result) => {
        console.log(result.data);
        getBlogData();
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error in /posts/data:", error);
      });
  };

  return (
    <div className={classes.blog_container}>
      <div className={classes.blog_header}>
        <div className={classes.blog_title}>{title}</div>
        <MdDelete
          className={classes.editButton}
          onClick={() => setShowDeleteConfirm(true)}
        />
        <MdEdit
          className={classes.editButton}
          onClick={() => setIsEditing(true)}
        />
      </div>
      <div className={classes.blog_meta}>
        By {author} | {date.split("T")[0]}
      </div>
      <div className={classes.blog_content}>{content}</div>

      {/* PopUp לעריכת בלוג */}
      {isEditing && (
        <div className={classes.modalOverlay}>
          <div className={classes.modal}>
            <h2>Edit Blog</h2>
            <label>Title:</label>
            <input
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />

            <label>Date:</label>
            <input
              type="date"
              value={editedDate}
              onChange={(e) => setEditedDate(e.target.value)}
            />

            <label>Content:</label>
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />

            <div className={classes.modalButtons}>
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* PopUp לאישור מחיקה */}
      {showDeleteConfirm && (
        <div className={classes.modalOverlay}>
          <div className={classes.modal}>
            <h3>Are you sure you want to delete this post?</h3>
            <div className={classes.modalButtons}>
              <button onClick={() => deleteItem(postId)}>Yes, Delete</button>
              <button onClick={() => setShowDeleteConfirm(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
