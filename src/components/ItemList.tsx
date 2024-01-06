// src/components/ItemList.tsx

import React from 'react';
import useFetch from '../hooks/useFetch'; 

interface Item {
  items: string[];
}

const ItemList: React.FC = () => {
  const { data, loading, error } = useFetch<Item>('http://localhost:8000/auth/items/');

  // Since the custom hook manages loading and error states, you can use them directly in your component
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data</div>;

  return (
    <div>
      <h2>Item List</h2>
      <ul>
        {data.items.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
