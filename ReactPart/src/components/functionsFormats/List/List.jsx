// import React, { useEffect, useState } from "react";
// import classes from "./list.module.css";
// import { MdEdit, MdDelete } from "react-icons/md";
// import axios from "axios";

// const List = ({ listId, title, initialItems, getListsData }) => {
//   const [items, setItems] = useState(initialItems || []);
//   const [newItem, setNewItem] = useState("");
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [showEmptyWarning, setShowEmptyWarning] = useState(false);
//   useEffect(() => {
//     setItems(initialItems || []);
//   }, [initialItems]);

//   function removeItem(listItemId) {
//     axios
//       .delete(`/lists/itemDelete/${listItemId}`)
//       .then(() => {
//         getListsData();
//       })
//       .catch((error) => console.error("Error in /lists/itemDelete:", error));
//   }
//   const addItem = () => {
//     if (!newItem.trim()) {
//       setShowEmptyWarning(true);
//       return;
//     }

//     axios
//       .post("/lists/itemAddition", { listId, text: newItem })
//       .then(() => {
//         setNewItem("");
//         console.log("before refresh");
//         getListsData();
//       })
//       .catch((error) => console.error("Error in /lists/itemAddition:", error));
//   };
//   function handleDeleteList(listIdToDelete) {
//     axios
//       .delete(`/lists/delete/${listIdToDelete}`)
//       .then((res) => {
//         getListsData();
//         console.log(res.data);
//       })
//       .catch((error) => console.error("Error in /lists:", error));
//   }

//   return (
//     <div className={classes.list_container}>
//       <h2>
//         {title}
//         <MdDelete onClick={() => setShowConfirm(true)} />
//       </h2>

//       <div className={classes.input_section}>
//         <input
//           type="text"
//           value={newItem}
//           onChange={(e) => setNewItem(e.target.value)}
//           placeholder="Enter new Item"
//         />
//         <button onClick={addItem}>Add</button>
//       </div>
//       <ul>
//         {items.map((item, index) => (
//           <li key={item.listItemId} className={classes.item}>
//             <span>{item.text}</span>
//             <button onClick={() => removeItem(item.listItemId)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//       {/* פופאפ לאישור מחיקה  */}
//       {showConfirm && (
//         <div className={classes.modal_overlay}>
//           <div className={classes.modal}>
//             <p>Are you sure you want to delete this list?</p>
//             <div className={classes.modal_actions}>
//               <button
//                 className={classes.cancel_btn}
//                 onClick={() => setShowConfirm(false)}
//               >
//                 cancel
//               </button>
//               <button
//                 className={classes.delete_btn}
//                 onClick={() => {
//                   handleDeleteList(listId);
//                   setShowConfirm(false);
//                 }}
//               >
//                 delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       {/* פופאפ להוספת פריט ריק */}
//       {showEmptyWarning && (
//         <div className={classes.modal_overlay}>
//           <div className={classes.modal}>
//             <p>Cannot add empty item</p>
//             <div className={classes.modal_actions}>
//               <button
//                 className={classes.cancel_btn}
//                 onClick={() => setShowEmptyWarning(false)}
//               >
//                 OK
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default List;
import React, { useEffect, useState } from "react";
import classes from "./list.module.css";
import { MdEdit, MdDelete } from "react-icons/md";
import axios from "axios";

// List component - מציג רשימה אחת עם אפשרות להוספת פריטים, מחיקת פריטים ומחיקת הרשימה כולה
const List = ({ listId, title, initialItems, getListsData }) => {
  const [items, setItems] = useState(initialItems || []); // state - שמירת כל הפריטים ברשימה
  const [newItem, setNewItem] = useState(""); // state - פריט חדש שמוקלד
  const [showConfirm, setShowConfirm] = useState(false); // state - פופאפ אישור למחיקת רשימה
  const [showEmptyWarning, setShowEmptyWarning] = useState(false); // state - פופאפ אזהרה כשמנסים להוסיף פריט ריק

  // עדכון ה־items כל פעם ש־initialItems משתנה
  useEffect(() => {
    setItems(initialItems || []);
  }, [initialItems]);

  // מחיקת פריט מהרשימה (בקריאה לשרת)
  function removeItem(listItemId) {
    axios
      .delete(`/lists/itemDelete/${listItemId}`)
      .then(() => {
        getListsData(); // רענון הדאטה אחרי מחיקה
      })
      .catch((error) => console.error("Error in /lists/itemDelete:", error));
  }

  // הוספת פריט חדש לרשימה
  const addItem = () => {
    if (!newItem.trim()) {
      setShowEmptyWarning(true); // אם הפריט ריק - הצגת פופאפ אזהרה
      return;
    }

    axios
      .post("/lists/itemAddition", { listId, text: newItem })
      .then(() => {
        setNewItem(""); // איפוס שדה הקלט
        console.log("before refresh");
        getListsData(); // רענון הנתונים אחרי הוספה
      })
      .catch((error) => console.error("Error in /lists/itemAddition:", error));
  };

  // מחיקת רשימה שלמה
  function handleDeleteList(listIdToDelete) {
    axios
      .delete(`/lists/delete/${listIdToDelete}`)
      .then((res) => {
        getListsData(); // רענון רשימות אחרי מחיקה
        console.log(res.data);
      })
      .catch((error) => console.error("Error in /lists:", error));
  }

  return (
    <div className={classes.list_container}>
      {/* כותרת הרשימה + כפתור מחיקה של כל הרשימה */}
      <h2>
        {title}
        <MdDelete onClick={() => setShowConfirm(true)} />
      </h2>

      {/* קלט להוספת פריט חדש */}
      <div className={classes.input_section}>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Enter new Item"
        />
        <button onClick={addItem}>Add</button>
      </div>

      {/* הצגת כל הפריטים ברשימה */}
      <ul>
        {items.map((item, index) => (
          <li key={item.listItemId} className={classes.item}>
            <span>{item.text}</span>
            <button onClick={() => removeItem(item.listItemId)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* פופאפ לאישור מחיקת רשימה */}
      {showConfirm && (
        <div className={classes.modal_overlay}>
          <div className={classes.modal}>
            <p>Are you sure you want to delete this list?</p>
            <div className={classes.modal_actions}>
              <button
                className={classes.cancel_btn}
                onClick={() => setShowConfirm(false)}
              >
                cancel
              </button>
              <button
                className={classes.delete_btn}
                onClick={() => {
                  handleDeleteList(listId);
                  setShowConfirm(false);
                }}
              >
                delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* פופאפ אזהרה על ניסיון להוספת פריט ריק */}
      {showEmptyWarning && (
        <div className={classes.modal_overlay}>
          <div className={classes.modal}>
            <p>Cannot add empty item</p>
            <div className={classes.modal_actions}>
              <button
                className={classes.cancel_btn}
                onClick={() => setShowEmptyWarning(false)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
