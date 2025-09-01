import React, { useState } from "react";
import classes from "./list.module.css";

const List = ({ title, initialItems }) => {
  const [items, setItems] = useState(initialItems || []);
  const [newItem, setNewItem] = useState("");

  const addItem = () => {
    if (newItem.trim() === "") return;
    setItems([...items, { text: newItem, completed: false }]);
    setNewItem("");
  };

  const toggleComplete = (index) => {
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item
    );
    setItems(updatedItems);
  };

  const removeItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  return (
    <div className={classes.list_container}>
      <h2>{title}</h2>
      <div className={classes.input_section}>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Enter new Item"
        />
        <button onClick={addItem}>הוסף</button>
      </div>
      <ul>
        {items.map((item, index) => (
          <li key={index} className={item.completed ? "completed" : ""}>
            <span onClick={() => toggleComplete(index)}>{item.text}</span>
            <button onClick={() => removeItem(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
