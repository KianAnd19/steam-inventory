import React from 'react';
import SearchBar from './components/SearchBar';
import PieChart from './components/PieChart';


function App() {
  const handleSearch = (query) => {
    console.log('Searching for:', query);
    // Add your search logic here
  };


  return (
      <div className="p-4 bg-gray-900 h-screen">
        <h1 className="text-gray-100 text-4xl font-bold text-center pb-4">CS2 Inventory Value Dashboard</h1>
        <div className="flex items-center">
          <SearchBar onSearch={handleSearch} />
          <label class="switch ml-6">
            <input type="checkbox"/>
            <span class="slider"></span>
          </label>
        </div>
        <div className='bg-gray-800 rounded-3xl max-w-sm mt-6 p-2'>
          <h1 className='text-gray-100 text-2xl font-bold text-center'>Total Inventory Value:</h1>
          <h1 className='text-gray-100 text-3xl font-bold text-center'>$64.32</h1>
        </div>
        <div className='bg-gray-800 rounded-3xl max-w-sm mt-6 p-2'>
          <h1 className='text-gray-100 text-2xl font-bold text-center'>Inventory Value Percentages</h1> {/* Could have a better Title tbh */}
          <PieChart />
        </div>
        {/* Other components or content */}
      </div>  
  );
}

export default App;
