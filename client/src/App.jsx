import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';

function App() {
  const [items, setItems] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(null);

  const fetchItems = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_PUBLIC_BACKEND_URL}/items`);
      setItems(res.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleEdit = (item) => {
    setItemToEdit(item);
  };

  const handleSave = () => {
    setItemToEdit(null);
    fetchItems(); // Fetch updated items after saving
  };

  const handleAddItem = (newItem) => {
    setItems([...items, newItem]); // Add new item to the list
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="App">
      <h1>CRUD App</h1>
      <ItemForm itemToEdit={itemToEdit} onSave={handleSave} onAddItem={handleAddItem} />
      <ItemList items={items} onEdit={handleEdit} onItemDelete={fetchItems} />
    </div>
  );
}

export default App;
