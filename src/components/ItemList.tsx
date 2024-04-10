// src/components/ItemList.tsx

import React, { useEffect, useState } from 'react';
import DropdownMenu from './basic/dropdown';
import SpeedChart, { SpeedData } from './rechart_test';
// src/components/ItemList.tsx


const ItemList: React.FC = () => {
  const [telData, setTelData] = useState<SpeedData[]>([]);
  const [lapNumber, setLapNumber] = useState<string>(''); // Use string to easily manage the form input
  const [sessionUIDs, setSessionUIDs] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.3.14:8000/telemetry/unique-sessionUIDs/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setSessionUIDs(jsonData);
        console.log(jsonData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    }
    fetchData();
  }
    , []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://192.168.3.14:8000/telemetry/car-telemetry/lap/${lapNumber}/`);
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
      <DropdownMenu sessionUIDs={sessionUIDs} />
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
