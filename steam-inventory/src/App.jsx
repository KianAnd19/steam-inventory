import React from 'react';
import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import PieChart from './components/PieChart';
import LineGraph from './components/LineChart';
import ScrollableList from './components/ScrollableList';
import Loader from './components/Loader';


function App() {
  const [isLoading, setIsLoading] = useState(false);
  const items = [{ name: 'Item 1' }, { name: 'Item 2' }, { name: 'Item 3'}, { name: 'Item 4' }, { name: 'Item 5' }, { name: 'Item 6'}, { name: 'Item 7' }, { name: 'Item 8' }, { name: 'Item 9'}];

  //Handle search
  const handleSearch = (query) => {
    console.log('Searching for:', query);
    // Add your search logic here
    setIsLoading(true);

    setTimeout(() => {
      // Your search logic here
      console.log('Searching for:', query);
      setIsLoading(false); // Stop loading after search is done
    }, 10000); // Simulated delay of 2 seconds
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

        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4   lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-6 w-full grid-flow-row-dense'>
          <div className='flex row-span-1 col-span-1 bg-gray-800 rounded-3xl p-2 w-full h-full items-center'>
            <h1 className='text-gray-100 text-2xl font-bold text-center'>Total Inventory Value:<br/>$64.32</h1>
          </div>
          <div className='row-span-1 col-span-1 bg-gray-800 rounded-3xl p-2'>
            <h1 className='text-gray-100 text-2xl font-bold text-center'>Leaderboard</h1>
            <ScrollableList items={items} />
          </div>
          <div className='row-span-2 col-span-2 bg-gray-800 rounded-3xl p-2 items-center'>
            <h1 className='text-gray-100 text-2xl font-bold text-center mb-2'>Inventory Value Percentages</h1>
            <PieChart />
          </div>
          <div className='col-span-2 bg-gray-800 rounded-3xl p-2'>
            <h1 className='text-gray-100 text-2xl font-bold text-center'>Inventory Value History</h1>
            <LineGraph />
          </div>
          <div className='row-span-1 col-span-1 bg-gray-800 rounded-3xl p-2'>
            <h1 className='text-gray-100 text-2xl font-bold text-center'>Inventory List</h1>
            <ScrollableList items={items} />
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
