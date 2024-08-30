import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemForm = ({ itemToEdit, onSave, onAddItem }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (itemToEdit) {
      setName(itemToEdit.name);
    } else {
      setName(''); // Reset the input if not editing
    }
  }, [itemToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (itemToEdit) {
        await axios.put(`${import.meta.env.VITE_PUBLIC_BACKEND_URL}/items/${itemToEdit._id}`, { name });
        onSave();
      } else {
        const res = await axios.post(`${import.meta.env.VITE_PUBLIC_BACKEND_URL}/items`, { name });
        onAddItem(res.data);
      }
      setName(''); // Reset form after submission
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Item Name"
        required
      />
      <button type="submit">{itemToEdit ? 'Update' : 'Add'} Item</button>
    </form>
  );
};

export default ItemForm;
