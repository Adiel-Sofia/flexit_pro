// import React, { useEffect, useState } from "react";
// import classes from "./files.module.css";
// import axios from "axios";
// import { IoAddCircle } from "react-icons/io5";
// export default function Files({ functionId }) {
//   const handleOpen = (url) => {
//     window.open(url, "_blank");
//   };
//   const [open, setOpen] = useState(false);
//   const [allFiles, setAllFiles] = useState([]);
//   const [isAdding, setIsAdding] = useState(false);
//   const [error, setError] = useState(null);
//   const [file, setFile] = useState(null);
//   const [deletePopup, setDeletePopup] = useState(false);
//   const [fileToDelete, setFileToDelet] = useState(null);
//   useEffect(() => {
//     getFilesData();
//   }, [functionId]);

//   function confirmDelete(fileId) {
//     setFileToDelet(fileId);
//     setDeletePopup(true);
//   }
//   const cancelDelete = () => {
//     setDeletePopup(false);
//     setFileToDelet(null);
//   };
//   function handleDelete() {
//     if (!fileToDelete) return;
//     console.log(fileToDelete);
//     axios
//       .delete(`/files/delete/${fileToDelete}`)
//       .then(() => {
//         getFilesData();
//         setDeletePopup(false);
//         setFileToDelet(null);
//       })
//       .catch((error) => {
//         console.error("Error deleting image:", error);
//         setDeletePopup(false);
//         setFileToDelet(null);
//       });
//   }
//   function getFilesData() {
//     const functionToSend = { functionId };
//     console.log(functionId);
//     axios
//       .post("/files", functionToSend)
//       .then((res) => {
//         const filesIds = res.data.map((obj) => obj.fileId);
//         console.log(filesIds);
//         if (filesIds.length > 0) {
//           axios
//             .post("/files/data", { filesIds })
//             .then((result) => {
//               const filesFromDB = result.data.map((file, index) => ({
//                 id: file.fileId,
//                 src: `/uploads/files/${file.fileName}`,
//                 name: file.fileName,
//                 alt: `File ${index + 1}`,
//               }));
//               setAllFiles(filesFromDB);
//             })
//             .catch((error) => console.error("Error in /files/data:", error));
//         } else {
//           setAllFiles([]);
//         }
//       })
//       .catch((error) => console.error("Error in /pictures:", error));
//   }

//   function uploadFile() {
//     if (!file) {
//       setError("Please select a file first");
//       return;
//     }
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("functionId", functionId);
//     axios
//       .post("/files/uploads", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       })
//       .then((res) => {
//         if (res.data === true) {
//           setIsAdding(false);
//           setFile(null);
//           setError(null);
//           getFilesData();
//         } else {
//           setError("Failed to upload image");
//         }
//       })
//       .catch((err) => {
//         console.error("Upload error:", err);
//         setError("Error uploading image");
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
//             <p>Are you sure you want to delete this picture?</p>
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
  const [allFiles, setAllFiles] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [deletePopup, setDeletePopup] = useState(false);
  const [fileToDelete, setFileToDelete] = useState(null);

  useEffect(() => {
    getFilesData();
  }, [functionId]);

  function confirmDelete(fileId) {
    setFileToDelete(fileId);
    setDeletePopup(true);
  }

  const cancelDelete = () => {
    setDeletePopup(false);
    setFileToDelete(null);
  };

  function handleDelete() {
    if (!fileToDelete) return;
    axios
      .delete(`/files/delete/${fileToDelete}`)
      .then(() => {
        getFilesData();
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
      .post("/files", { functionId })
      .then((res) => {
        const filesIds = res.data.map((obj) => obj.fileId);
        if (filesIds.length > 0) {
          axios
            .post("/files/data", { filesIds })
            .then((result) => {
              const filesFromDB = result.data.map((file, index) => ({
                id: file.fileId,
                src: `/uploads/files/${file.fileName}`, // שם טכני לגישה לקובץ
                name: file.originalName, // שם להצגה למשתמש
                alt: `File ${index + 1}`,
              }));
              setAllFiles(filesFromDB);
            })
            .catch((error) => console.error("Error in /files/data:", error));
        } else {
          setAllFiles([]);
        }
      })
      .catch((error) => console.error("Error in /files:", error));
  }

  function uploadFile() {
    if (!file) {
      setError("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("functionId", functionId);
    formData.append("originalName", file.name); // שולחים גם את השם המקורי

    axios
      .post("/files/uploads", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        if (res.data === true) {
          setIsAdding(false);
          setFile(null);
          setError(null);
          getFilesData();
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
      <div className={classes.bloglist_header}>
        <div>Files</div>
        <div>
          <IoAddCircle onClick={() => setIsAdding(true)} />
        </div>
      </div>

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
