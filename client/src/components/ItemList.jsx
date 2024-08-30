import React from 'react';
import axios from 'axios';

const ItemList = ({ items, onEdit, onItemDelete }) => {
  const deleteItem = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_PUBLIC_BACKEND_URL}/items/${id}`);
      onItemDelete(); // Refresh the list after deletion
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <h2>Items</h2>
      <ul>
        {items.map(item => (
          <li key={item._id}>
            {item.name}
            <button onClick={() => onEdit(item)}>Edit</button>
            <button onClick={() => deleteItem(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
