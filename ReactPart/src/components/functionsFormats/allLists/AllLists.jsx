

import React, { useEffect, useState } from "react";
import classes from "./allLists.module.css";
import axios from "axios";
import List from "../List/List";
import { IoAddCircle } from "react-icons/io5";

const AllList = ({ functionId }) => {
  const [lists, setLists] = useState([]);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [newListName, setNewListName] = useState("");

  useEffect(() => {
    getListsData();
  }, [functionId]);

  function getListsData() {
    const functionToSend = { functionId };
    axios
      .post("/lists", functionToSend)
      .then((res) => {
        setLists(res.data);
      })
      .catch((error) => console.error("Error in /lists:", error));
  }

  function handleAddList() {
    if (!newListName.trim()) return;

    axios
      .post("/lists/add", { functionId, listName: newListName })
      .then(() => {
        setNewListName("");
        setShowAddPopup(false);
        getListsData();
      })
      .catch((error) => console.error("Error in /lists/add:", error));
  }

  const allListsToShow = lists.map((el) => (
    <List
      key={el.listId}
      listId={el.listId}
      title={el.title}
      initialItems={el.items}
      getListsData={getListsData}
    />
  ));

  return (
    <div>
      <div className={classes.bloglist_header}>
        <div>Lists</div>
        <div>
          <IoAddCircle onClick={() => setShowAddPopup(true)} />
        </div>
      </div>

      <div className={classes.list_container}>{allListsToShow}</div>

      {showAddPopup && (
        <div className={classes.modal_overlay}>
          <div className={classes.modal}>
            <h3>Addin a new List</h3>
            <input
              type="text"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              placeholder="List Name"
            />
            <div className={classes.modal_actions}>
              <button
                className={classes.cancel_btn}
                onClick={() => setShowAddPopup(false)}
              >
                Cancel
              </button>
              <button className={classes.add_btn} onClick={handleAddList}>
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllList;
