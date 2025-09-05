import React, { useEffect, useState } from "react";
import classes from "./list.module.css";
import { MdEdit, MdDelete } from "react-icons/md";
import axios from "axios";

const List = ({ listId, title, initialItems, getListsData }) => {
  const [items, setItems] = useState(initialItems || []);
  const [newItem, setNewItem] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [showEmptyWarning, setShowEmptyWarning] = useState(false);
  useEffect(() => {
    setItems(initialItems || []);
  }, [initialItems]);

  function removeItem(listItemId) {
    axios
      .delete(`/lists/itemDelete/${listItemId}`)
      .then(() => {
        getListsData();
      })
      .catch((error) => console.error("Error in /lists/itemDelete:", error));
  }
  const addItem = () => {
    if (!newItem.trim()) {
      setShowEmptyWarning(true);
      return;
    }

    axios
      .post("/lists/itemAddition", { listId, text: newItem })
      .then(() => {
        setNewItem("");
        console.log("before refresh");
        getListsData();
      })
      .catch((error) => console.error("Error in /lists/itemAddition:", error));
  };
  function handleDeleteList(listIdToDelete) {
    axios
      .delete(`/lists/delete/${listIdToDelete}`)
      .then((res) => {
        getListsData();
        console.log(res.data);
      })
      .catch((error) => console.error("Error in /lists:", error));
  }

  return (
    <div className={classes.list_container}>
      <h2>
        {title}
        <MdDelete onClick={() => setShowConfirm(true)} />
      </h2>

      <div className={classes.input_section}>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Enter new Item"
        />
        <button onClick={addItem}>Add</button>
      </div>
      <ul>
        {items.map((item, index) => (
          <li key={item.listItemId} className={classes.item}>
            <span>{item.text}</span>
            <button onClick={() => removeItem(item.listItemId)}>Delete</button>
          </li>
        ))}
      </ul>

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
      {/* פופאפ להוספת פריט ריק */}
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
