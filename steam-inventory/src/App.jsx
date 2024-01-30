import React from 'react';
import SearchBar from './components/SearchBar';
import PieChart from './components/PieChart';
import LineGraph from './components/LineChart';
import ScrollableList from './components/ScrollableList';


function App() {
  const items = [{ name: 'Item 1' }, { name: 'Item 2' }, { name: 'Item 3'}, { name: 'Item 4' }, { name: 'Item 5' }, { name: 'Item 6'}];
  const handleSearch = (query) => {
    console.log('Searching for:', query);
    // Add your search logic here
  };


  return (
      <div className="p-4 bg-gray-900 min-h-screen">
        <h1 className="text-gray-100 text-4xl font-bold text-center pb-4">CS2 Inventory Value Dashboard</h1>
        <div className="flex items-center">
          <SearchBar onSearch={handleSearch} />
          <label class="switch ml-6">
            <input type="checkbox"/>
            <span class="slider"></span>
          </label>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-6 w-full'>
          <div className='row-span-1 col-span-1 bg-gray-800 rounded-3xl p-2 w-full h-full'>
            <h1 className='text-gray-100 text-2xl font-bold text-center'>Total Inventory Value:</h1>
            <h1 className='text-gray-100 text-3xl font-bold text-center'>$64.32</h1>
          </div>
          <div className='row-span-1 col-span-1 bg-gray-800 rounded-3xl p-2 w-full h-full'>
            <h1 className='text-gray-100 text-2xl font-bold text-center'>Total Inventory Value:</h1>
            <h1 className='text-gray-100 text-3xl font-bold text-center'>$64.32</h1>
          </div>
          <div className='row-span-2 col-span-2 bg-gray-800 rounded-3xl p-2'>
            <h1 className='text-gray-100 text-2xl font-bold text-center'>Inventory Value Percentages</h1>
            <PieChart />
          </div>
          <div className='col-span-2 bg-gray-800 rounded-3xl p-2'>
            <h1 className='text-gray-100 text-2xl font-bold text-center'>Inventory Value History</h1>
            <LineGraph />
          </div>
          <div className='row-span-1 bg-gray-800 rounded-3xl p-2'>
            <h1 className='text-gray-100 text-2xl font-bold text-center'>Inventory List</h1>
            <ScrollableList items={items} />
          </div> 
        </div>
 
      </div>  
  );
}

export default App;
