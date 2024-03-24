// src/components/ItemList.tsx

import React, { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import StatForm from './forms/StatForm';
import StatToAbilityForm from './forms/StatToAbility';
import SpeedChart, { SpeedData } from './rechart_test';
// src/components/ItemList.tsx


const ItemList: React.FC = () => {
  const [telData, setTelData] = useState<SpeedData[]>([]);
  const [lapNumber, setLapNumber] = useState<string>(''); // Use string to easily manage the form input

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:8000/telemetry/car-telemetry/lap/${lapNumber}/`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      setTelData(jsonData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="lapNumber">Enter Lap Number: </label>
        <input
          id="lapNumber"
          type="number"
          value={lapNumber}
          onChange={(e) => setLapNumber(e.target.value)}
          placeholder="Lap Number"
        />
        <button type="submit">Fetch Data</button>
      </form>

      <div>
        <h2>Speed Data Chart</h2>
        {telData.length > 0 && <SpeedChart data={telData} />}
      </div>
    </div>
  );
};

export default ItemList;
