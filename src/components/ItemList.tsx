// src/components/ItemList.tsx

import React, { useEffect, useState, useRef } from 'react';
import DropdownMenu, { DropdownMenuHandles } from './basic/dropdown';
import SpeedChart, { SpeedData } from './rechart_test';
// src/components/ItemList.tsx


const ItemList: React.FC = () => {
  const [telData, setTelData] = useState<SpeedData[]>([]);
  const [sessionUIDs, setSessionUIDs] = useState<string[]>([]);
  const dropdownRef = useRef<DropdownMenuHandles>(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.3.14:8000/telemetry/unique-sessionUIDs/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setSessionUIDs(jsonData);
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
      const selectedUID = dropdownRef.current?.getSelectedUID();
      console.log(selectedUID);
      const response = await fetch(`http://192.168.3.14:8000/telemetry/car-telemetry/${selectedUID}/`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log(response)
      const jsonData = await response.json();
      setTelData(jsonData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  return (
    <div>
      <DropdownMenu ref={dropdownRef} sessionUIDs={sessionUIDs} />
      <form onSubmit={handleSubmit}>
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
