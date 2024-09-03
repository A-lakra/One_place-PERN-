import React, { useState ,useEffect } from "react";
import ToDoItem from "./ToDoItem";
import InputArea from "./InputArea";
import { fetchItems, addItem, deleteItem, deleteAllItems } from '../api';  // Import your API functions


function ToDo() {
  const [items, setItems] = useState([]);

// Fetch to-do items when the component mounts
useEffect(() => {
  const loadItems = async () => {
    try {
      const itemsFromServer = await fetchItems();
      setItems(itemsFromServer);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  }; 
   loadItems();
}, []);

// Function to add a new item
async function handleAddItem(inputText) {
  try {
    const newItem = await addItem(inputText);
    setItems((prevItems) => [...prevItems, newItem]);
  } catch (error) {
    console.error('Error adding item:', error);
  }
}

  // Function to delete an item
  async function handleDeleteItem(id) {
    try {
      await deleteItem(id);
      setItems((prevItems) => prevItems.filter((item, index) => index !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  }

 // Function to delete all items
 async function handleDeleteAllItems() {
  try {
    await deleteAllItems();
    setItems([]); // Clear the entire list
  } catch (error) {
    console.error('Error deleting all items:', error);
  }
}

return (
  <div className="container">
    <div className="heading">
      <h1>To-Do List</h1>
    </div>
    <InputArea onAdd={handleAddItem} />
    <div>
      <ul>
        {items.map((todoItem, index) => (
          <ToDoItem
            key={index}
            id={index}
            text={todoItem.text}  // Use todoItem.text since it's the text of the to-do item
            onChecked={handleDeleteItem}
          />
        ))}
      </ul>
    </div>
    <button className="footer" onClick={handleDeleteAllItems}>
      <span>Delete All</span>
    </button>
  </div>
);
}

export default ToDo;
