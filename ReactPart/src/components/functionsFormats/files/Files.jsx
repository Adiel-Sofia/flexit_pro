
// import React, { useEffect, useState } from "react";
// import classes from "./files.module.css";
// import axios from "axios";
// import { IoAddCircle } from "react-icons/io5";

// export default function Files({ functionId }) {
//   const [allFiles, setAllFiles] = useState([]);
//   const [isAdding, setIsAdding] = useState(false);
//   const [error, setError] = useState(null);
//   const [file, setFile] = useState(null);
//   const [deletePopup, setDeletePopup] = useState(false);
//   const [fileToDelete, setFileToDelete] = useState(null);

//   useEffect(() => {
//     getFilesData();
//   }, [functionId]);

//   function confirmDelete(fileId) {
//     setFileToDelete(fileId);
//     setDeletePopup(true);
//   }

//   const cancelDelete = () => {
//     setDeletePopup(false);
//     setFileToDelete(null);
//   };

//   function handleDelete() {
//     if (!fileToDelete) return;
//     axios
//       .delete(`/files/delete/${fileToDelete}`)
//       .then(() => {
//         getFilesData();
//         setDeletePopup(false);
//         setFileToDelete(null);
//       })
//       .catch((error) => {
//         console.error("Error deleting file:", error);
//         setDeletePopup(false);
//         setFileToDelete(null);
//       });
//   }

//   function getFilesData() {
//     axios
//       .post("/files", { functionId })
//       .then((res) => {
//         const filesIds = res.data.map((obj) => obj.fileId);
//         if (filesIds.length > 0) {
//           axios
//             .post("/files/data", { filesIds })
//             .then((result) => {
//               const filesFromDB = result.data.map((file, index) => ({
//                 id: file.fileId,
//                 src: `/uploads/files/${file.fileName}`, // שם טכני לגישה לקובץ
//                 name: file.originalName, // שם להצגה למשתמש
//                 alt: `File ${index + 1}`,
//               }));
//               setAllFiles(filesFromDB);
//             })
//             .catch((error) => console.error("Error in /files/data:", error));
//         } else {
//           setAllFiles([]);
//         }
//       })
//       .catch((error) => console.error("Error in /files:", error));
//   }

//   function uploadFile() {
//     if (!file) {
//       setError("Please select a file first");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("functionId", functionId);
//     formData.append("originalName", file.name); // שולחים גם את השם המקורי

//     axios
//       .post("/files/uploads", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       })
//       .then((res) => {
//         if (res.data === true) {
//           setIsAdding(false);
//           setFile(null);
//           setError(null);
//           getFilesData();
//         } else {
//           setError("Failed to upload file");
//         }
//       })
//       .catch((err) => {
//         console.error("Upload error:", err);
//         setError("Error uploading file");
//       });
//   }

//   return (
//     <div>
//       <div className={classes.bloglist_header}>
//         <div>Files</div>
//         <div>
//           <IoAddCircle onClick={() => setIsAdding(true)} />
//         </div>
//       </div>

//       {isAdding && (
//         <div className={classes.popup_overlay}>
//           <div className={classes.popup}>
//             <h3>Upload File</h3>
//             <input type="file" onChange={(e) => setFile(e.target.files[0])} />
//             {error && <p style={{ color: "red" }}>{error}</p>}
//             <div style={{ marginTop: "10px" }}>
//               <button className={classes.confirm_button} onClick={uploadFile}>
//                 Upload
//               </button>
//               <button
//                 className={classes.cancel_button}
//                 onClick={() => {
//                   setIsAdding(false);
//                   setError(null);
//                 }}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className={classes.file_viewer}>
//         {allFiles.map((file) => (
//           <div key={file.id} className={classes.file_row}>
//             <a
//               href={file.src}
//               download={file.name}
//               className={classes.file_item}
//             >
//               <div className={classes.file_icon}>📄</div>
//               <div className={classes.file_name}>{file.name}</div>
//             </a>
//             <button
//               className={classes.delete_button}
//               onClick={() => confirmDelete(file.id)}
//             >
//               ❌
//             </button>
//           </div>
//         ))}
//       </div>

//       {deletePopup && (
//         <div className={classes.popup_overlay}>
//           <div className={classes.popup}>
//             <p>Are you sure you want to delete this file?</p>
//             <button onClick={handleDelete} className={classes.confirm_button}>
//               Yes
//             </button>
//             <button onClick={cancelDelete} className={classes.cancel_button}>
//               No
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import classes from "./files.module.css";
import axios from "axios";
import { IoAddCircle } from "react-icons/io5";

export default function Files({ functionId }) {
  const [allFiles, setAllFiles] = useState([]); // רשימת כל הקבצים הקיימים
  const [isAdding, setIsAdding] = useState(false); // האם חלון הוספת קובץ פתוח
  const [error, setError] = useState(null); // הודעת שגיאה במידה ויש
  const [file, setFile] = useState(null); // הקובץ שנבחר להעלאה
  const [deletePopup, setDeletePopup] = useState(false); // האם חלון מחיקה פתוח
  const [fileToDelete, setFileToDelete] = useState(null); // הקובץ שמיועד למחיקה

  useEffect(() => {
    getFilesData(); // טעינת רשימת הקבצים בכל פעם ש־functionId משתנה
  }, [functionId]);

  function confirmDelete(fileId) {
    setFileToDelete(fileId); // שמירת ה־id של הקובץ למחיקה
    setDeletePopup(true); // פתיחת חלון אישור מחיקה
  }

  const cancelDelete = () => {
    setDeletePopup(false); // סגירת חלון המחיקה
    setFileToDelete(null); // ניקוי הבחירה
  };

  function handleDelete() {
    if (!fileToDelete) return;
    axios
      .delete(`/files/delete/${fileToDelete}`) // בקשת מחיקה לשרת
      .then(() => {
        getFilesData(); // רענון רשימת הקבצים
        setDeletePopup(false);
        setFileToDelete(null);
      })
      .catch((error) => {
        console.error("Error deleting file:", error);
        setDeletePopup(false);
        setFileToDelete(null);
      });
  }

  function getFilesData() {
    axios
      .post("/files", { functionId }) // בקשה לקבלת כל ה־ids של הקבצים
      .then((res) => {
        const filesIds = res.data.map((obj) => obj.fileId);
        if (filesIds.length > 0) {
          axios
            .post("/files/data", { filesIds }) // בקשה לקבלת פרטים על הקבצים לפי ה־ids
            .then((result) => {
              const filesFromDB = result.data.map((file, index) => ({
                id: file.fileId,
                src: `/uploads/files/${file.fileName}`, // קישור לקובץ בשרת
                name: file.originalName, // שם מקורי להצגה למשתמש
                alt: `File ${index + 1}`,
              }));
              setAllFiles(filesFromDB);
            })
            .catch((error) => console.error("Error in /files/data:", error));
        } else {
          setAllFiles([]); // אין קבצים
        }
      })
      .catch((error) => console.error("Error in /files:", error));
  }

  function uploadFile() {
    if (!file) {
      setError("Please select a file first"); // אם לא נבחר קובץ
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("functionId", functionId);
    formData.append("originalName", file.name); // שליחת השם המקורי לשרת

    axios
      .post("/files/uploads", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        if (res.data === true) {
          setIsAdding(false); // סגירת חלון ההעלאה
          setFile(null);
          setError(null);
          getFilesData(); // רענון הקבצים לאחר העלאה מוצלחת
        } else {
          setError("Failed to upload file");
        }
      })
      .catch((err) => {
        console.error("Upload error:", err);
        setError("Error uploading file");
      });
  }

  return (
    <div>
      {/* כותרת + כפתור הוספת קובץ */}
      <div className={classes.bloglist_header}>
        <div>Files</div>
        <div>
          <IoAddCircle onClick={() => setIsAdding(true)} />
        </div>
      </div>

      {/* חלון הוספת קובץ חדש */}
      {isAdding && (
        <div className={classes.popup_overlay}>
          <div className={classes.popup}>
            <h3>Upload File</h3>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div style={{ marginTop: "10px" }}>
              <button className={classes.confirm_button} onClick={uploadFile}>
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

      {/* רשימת הקבצים להצגה + אפשרות להורדה ומחיקה */}
      <div className={classes.file_viewer}>
        {allFiles.map((file) => (
          <div key={file.id} className={classes.file_row}>
            <a
              href={file.src}
              download={file.name}
              className={classes.file_item}
            >
              <div className={classes.file_icon}>📄</div>
              <div className={classes.file_name}>{file.name}</div>
            </a>
            <button
              className={classes.delete_button}
              onClick={() => confirmDelete(file.id)}
            >
              ❌
            </button>
          </div>
        ))}
      </div>

      {/* חלון אישור מחיקת קובץ */}
      {deletePopup && (
        <div className={classes.popup_overlay}>
          <div className={classes.popup}>
            <p>Are you sure you want to delete this file?</p>
            <button onClick={handleDelete} className={classes.confirm_button}>
              Yes
            </button>
            <button onClick={cancelDelete} className={classes.cancel_button}>
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
