import React, { useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { IoAddCircle } from "react-icons/io5";
import axios from "axios";
import classes from "./imageGallery.module.css";

export default function ImageGallery({ functionId }) {
  // state לניהול פתיחת חלון צפייה בתמונה
  const [open, setOpen] = useState(false);
  // state לאחסון כל התמונות
  const [images, setImages] = useState([]);
  // state לניהול התמונה הנוכחית בגלריה
  const [currentIndex, setCurrentIndex] = useState(0);
  // state לפתיחת חלון הוספת תמונה
  const [isAdding, setIsAdding] = useState(false);
  // state לשמירת הודעת שגיאה
  const [error, setError] = useState(null);
  // state לקובץ שנבחר להעלאה
  const [file, setFile] = useState(null);
  // state לניהול פופאפ מחיקה
  const [deletePopup, setDeletePopup] = useState(false);
  // state לאחסון מזהה התמונה למחיקה
  const [imageToDelete, setImageToDelete] = useState(null);

  // פונקציה להעלאת תמונה לשרת
  function uploadPicture() {
    console.log("here");
    if (!file) {
      setError("Please select a file first");
      return;
    }
    const formData = new FormData();
    formData.append("picture", file);
    formData.append("functionId", functionId);
    axios
      .post("/pictures/uploads", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data === true) {
          setIsAdding(false);
          setFile(null);
          setError(null);
          getImagesData(); // רענון רשימת התמונות אחרי העלאה
        } else {
          setError("Failed to upload image");
        }
      })
      .catch((err) => {
        console.error("Upload error:", err);
        setError("Error uploading image");
      });
  }

  // פונקציה להבאת רשימת התמונות מהשרת
  function getImagesData() {
    const functionToSend = { functionId };
    axios
      .post("/pictures", functionToSend)
      .then((res) => {
        const picturesIds = res.data.map((obj) => obj.pictureId);

        if (picturesIds.length > 0) {
          axios
            .post("/pictures/data", { picturesIds })
            .then((result) => {
              const imagesFromDB = result.data.map((pic, index) => ({
                id: pic.pictureId,
                src: `/uploads/pictures/${pic.pictureName}`,
                alt: `Image ${index + 1}`,
              }));
              setImages(imagesFromDB);
            })
            .catch((error) => console.error("Error in /pictures/data:", error));
        } else {
          setImages([]); // אין תמונות
        }
      })
      .catch((error) => console.error("Error in /pictures:", error));
  }

  // פותח פופאפ למחיקת תמונה
  const confirmDelete = (id) => {
    setImageToDelete(id);
    setDeletePopup(true);
  };

  // מוחק את התמונה שנבחרה
  const handleDelete = () => {
    if (!imageToDelete) return;
    console.log(imageToDelete);
    axios
      .delete(`/pictures/delete/${imageToDelete}`)
      .then(() => {
        getImagesData(); // רענון הגלריה אחרי מחיקה
        setDeletePopup(false);
        setImageToDelete(null);
      })
      .catch((error) => {
        console.error("Error deleting image:", error);
        setDeletePopup(false);
        setImageToDelete(null);
      });
  };

  // סגירת פופאפ מחיקה
  const cancelDelete = () => {
    setDeletePopup(false);
    setImageToDelete(null);
  };

  // טוען את התמונות בכל פעם ש־functionId משתנה
  useEffect(() => {
    getImagesData();
  }, [functionId]);

  
  return (
    <div className={classes.gallery_container}>
      {/* כותרת + כפתור להוספת תמונה */}
      <div className={classes.bloglist_header}>
        <div>Gallery</div>
        <div>
          <IoAddCircle onClick={() => setIsAdding(true)} />
        </div>
      </div>

      {/* תצוגת גריד של תמונות */}
      <div className={classes.gallery_grid}>
        {images.map((img, index) => (
          <div key={index} className={classes.gallery_item}>
            <img
              src={img.src}
              alt={img.alt || `Image ${index + 1}`}
              onClick={() => {
                setCurrentIndex(index);
                setOpen(true); // פתיחת lightbox
              }}
            />
            {/* כפתור מחיקה לכל תמונה */}
            <button
              className={classes.delete_button}
              onClick={() => confirmDelete(img.id)}
            >
              ❌
            </button>
          </div>
        ))}
      </div>

      {/* חלון Lightbox להצגת תמונות במסך מלא */}
      {open && (
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={images.map((img) => ({ src: img.src }))}
          index={currentIndex}
          controller={{ closeOnBackdropClick: true }}
        />
      )}

      {/* פופאפ למחיקת תמונה */}
      {deletePopup && (
        <div className={classes.popup_overlay}>
          <div className={classes.popup}>
            <p>Are you sure you want to delete this picture?</p>
            <button onClick={handleDelete} className={classes.confirm_button}>
              Yes
            </button>
            <button onClick={cancelDelete} className={classes.cancel_button}>
              No
            </button>
          </div>
        </div>
      )}

      {/* פופאפ להוספת תמונה חדשה */}
      {isAdding && (
        <div className={classes.popup_overlay}>
          <div className={classes.popup}>
            <h3>Upload Picture</h3>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />

            {error && <p style={{ color: "red" }}>{error}</p>}

            <div style={{ marginTop: "10px" }}>
              <button
                className={classes.confirm_button}
                onClick={uploadPicture}
              >
                Upload
              </button>
              <button
                className={classes.cancel_button}
                onClick={() => {
                  setIsAdding(false);
                  setError(null);
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
