import React from 'react';
import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import PieChart from './components/PieChart';
import LineGraph from './components/LineChart';
import ScrollableInventory from './components/ScrollableInventory';
import Loader from './components/Loader';
import Leaderboard from './components/Leaderboard';


function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [inventoryValue, setInventoryValue] = useState(0);

  const items = [{ name: 'Item 1' }, { name: 'Item 2' }, { name: 'Item 3'}, { name: 'Item 4' }, { name: 'Item 5' }, { name: 'Item 6'}, { name: 'Item 7' }, { name: 'Item 8' }, { name: 'Item 9'}];

  // const fetchInventory = async (steamId) => {
  //   const apiKey = import.meta.env.VITE_API_KEY;
  //   const url = `https://www.steamwebapi.com/steam/api/inventory?key=${apiKey}&steam_id=${steamId}`;

  //   try {
  //     setIsLoading(true);
  //     const response = await fetch(url);
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
  //     const data = await response.json();
  //     setInventoryItems(data); // Assuming 'data' is the array of items
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.error("Error fetching data: ", error);
  //     setIsLoading(false);
  //   }
  // };

  const fetchInventory = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/test.json');  // Fetching from the local file
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setInventoryItems(data);  // Assuming 'data' is the array of items

      // Calculate total inventory value
      const total = data.reduce((sum, item) => sum + item.pricelatest, 0).toFixed(2);
      setInventoryValue(total);

      const categoryTotals = categorizeAndSummarize(data);
      console.log(categoryTotals);


      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setIsLoading(false);
    }
  };

  const categorizeAndSummarize = (items) => {
    const totalsByCategory = {};
  
    items.forEach(item => {
      const category = item.tags[1].category;  // Adjust this to match your item's category field
      if (!totalsByCategory[category]) {
        totalsByCategory[category] = 0;
      }
      totalsByCategory[category] += item.pricelatest;  // Or use another field for value
    });
  
    return totalsByCategory;
  };
  
  
  

  //Handle search
  const handleSearch = async (steamId) => {
    console.log('Searching for:', steamId);
    // Add your search logic here
    setIsLoading(true);
    const inventoryData = await fetchInventory(steamId);
    console.log(inventoryData);
    setIsLoading(false);
  };

  //Disable scrolling when loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden'; // Disable scrolling
    } else {
      document.body.style.overflow = 'auto'; // Enable scrolling
    }
    // Optional: Reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isLoading]);

  return (
      <div className="p-4 bg-gray-900 min-h-screen">
        <h1 className="text-gray-100 text-4xl font-bold text-center pb-4">CS2 Inventory Value Dashboard</h1>
        <div className="flex items-center">
          <SearchBar onSearch={handleSearch} />
          <div className=''>
            <img src="https://cdn-wp.thesportsrush.com/2023/09/8a83edd8-cs2.jpg?w=3840&q=60" alt="CSGO Logo" className="max-h-12 rounded-md ml-6"/>
          </div>
          <label className="switch ml-4">
            <input type="checkbox"/>
            <span className="slider"></span>
          </label>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-4 mt-6 w-full grid-flow-row-dense'>
          <div className='flex row-span-1 col-span-1 bg-gray-800 rounded-3xl p-2 w-full h-full items-center'>
            <h1 className='text-gray-100 text-2xl font-bold text-center'>Total Inventory Value:<br/>${inventoryValue}</h1>
          </div>
          <div className='row-span-1 col-span-1 bg-gray-800 rounded-3xl p-2'>
            <h1 className='text-gray-100 text-2xl font-bold text-center'>Leaderboard</h1>
            <Leaderboard items={items} />
          </div>
          <div className='row-span-2 col-span-2 bg-gray-800 rounded-3xl p-2 items-center'>
            <h1 className='text-gray-100 text-2xl font-bold text-center mb-2'>Inventory Value Percentages</h1>
            <PieChart />
          </div>
          <div className='row-span-1 col-span-2 bg-gray-800 rounded-3xl p-2'>
            <h1 className='text-gray-100 text-2xl font-bold text-center'>Inventory List</h1>
            <ScrollableInventory items={inventoryItems} />
          </div>
          <div className='col-span-2 bg-gray-800 rounded-3xl p-2'>
            <h1 className='text-gray-100 text-2xl font-bold text-center'>Inventory Value History</h1>
            <LineGraph />
          </div>
        </div>
        {isLoading && (
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
            <Loader />
          </div>
        )}
      </div>  
  );
}

export default App;
