import React from 'react';
import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import PieChart from './components/PieChart';
import LineGraph from './components/LineChart';
import ScrollableInventory from './components/ScrollableInventory';
import Loader from './components/Loader';
import Leaderboard from './components/Leaderboard';
import LeaderboardST from './components/LeaderboardST';

function App() {
  const URL = 'http://localhost:3000';
  const [isLoading, setIsLoading] = useState(false);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [leaderboardItems, setLeaderboardItems] = useState([]);
  const [statTrackItems, setStatTrackItems] = useState([]);
  const [inventoryValue, setInventoryValue] = useState(0);
  const [profileData, setProfileData] = useState({ "profileName": "Unkown User", "profilePictureUrl": "./unknown_user.png" });

  const [categoryTotals, setCategoryTotals] = useState({ "Weapon": 20, "Sticker": 19, "Container": 3, "Graffiti": 5, "Music Kit": 2 });

  const fetchLeaderboard = async () => {
    const url = `${URL}/inventory/leaderboard`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setLeaderboardItems(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const fetchProfile = async (steamId) => {
    const url = `${URL}/profile?steamId=${steamId}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setProfileData(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const fetchStatTrack = async () => {
    const url = `${URL}/stattrack/leaderboard`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setStatTrackItems(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };


  const fetchInventory = async (steamId) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const url = `${URL}/inventory?steamId=${steamId}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setInventoryItems(data); // Assuming 'data' is the array of items

      // Calculate total inventory value
      const total = data.reduce((sum, item) => sum + item.pricelatest, 0).toFixed(2);
      setInventoryValue(total);

      const categoryTotals = categorizeAndSummarize(data);
      console.log(categoryTotals);

    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const fetchInventoryStatic = async (steamId) => {
    try {
      const filename = `${steamId}.json`
      const response = await fetch(filename);  // Fetching from the local file
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
    }
  };

  const categorizeAndSummarize = (items) => {
    const newTotals = { "Weapon": 0, "Sticker": 0, "Container": 0, "Graffiti": 0, "Music Kit": 0 };

    items.forEach(item => {
      const category = item.tags[0].localized_tag_name;
      if (category in newTotals) {
        newTotals[category] += item.pricelatest;
      } else {
        newTotals["Weapon"] += item.pricelatest;  // Default to 'Weapon' if category not found
      }
    });

    setCategoryTotals(newTotals);
  };

  //Handle search
  const handleSearch = async (steamId) => {
    console.log('Searching for:', steamId);
    setIsLoading(true);
    setInventoryItems([]); // Clear the inventory items
    setInventoryValue(0); // Clear the inventory value
  
    try {
      // Fetch profile information first
      await fetchProfile(steamId);
      console.log('Profile data:', profileData);
  
      // Assuming fetchInventory also needs to complete before fetching the leaderboard
      // Note: Adjust according to your actual dependencies
      if (steamId === 'Kian' || steamId === 'Todd') {
        await fetchInventoryStatic(steamId);
      } else {
        await fetchInventory(steamId);
      }
  
      // Post inventory after fetching it
      // Ensure this operation is necessary before fetching the leaderboard
      await postInventory(steamId);
  
      // Fetch stat track information if independent from leaderboard
      await fetchStatTrack();
  
      // Fetch leaderboard last
      await fetchLeaderboard();
  
    } catch (error) {
      console.error("Error in handleSearch: ", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  const postInventory = async (steamId) => {
    const url = `${URL}/inventory/add`;
    const data = { "steamId": steamId, steamName: profileData.profileName, inventoryValue: inventoryValue, profileURL: profileData.profilePictureUrl };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
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
      <h1 className="text-gray-100 text-4xl font-bold text-center pb-4 text-wrap">CS2 Inventory Value Dashboard</h1>
      <div className="flex items-center">
        <SearchBar onSearch={handleSearch} />
        <div className=''>
          <img src="https://cdn-wp.thesportsrush.com/2023/09/8a83edd8-cs2.jpg?w=3840&q=60" alt="CSGO Logo" className="max-h-12 rounded-md ml-6 ring-2 ring-gray-300" />
        </div>
        <label className="switch ml-4">
          <input type="checkbox" />
          <span className="slider"></span>
        </label>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-4 mt-6 w-full grid-flow-row-dense'>
        <div className='flex row-span-1 col-span-1 bg-gray-800 rounded-3xl p-2 w-full h-full justify-center'>
          <div className='flex flex-col p-2 justify-center'>
            <img src={profileData.profilePictureUrl} alt="User Profile Picture" className="rounded-2xl bg-gray-800 p-1 mb-2 transition duration-200 ease-in-out w-full ring-2 ring-[#219ebc] hover:ring-4 hover:bg-gray-700" />
            <h1 className='text-gray-100 text-xl font-bold text-center'>Inventory Value:</h1>
            <h1 className='text-gray-100 text-2xl font-bold text-center'>${inventoryValue}</h1>
          </div>
        </div>
        <div className='row-span-1 col-span-1 bg-gray-800 rounded-3xl p-2'>
          <h1 className='text-gray-100 text-2xl font-bold text-center'>Leaderboard</h1>
          <Leaderboard items={leaderboardItems} />
        </div>
        <div className='row-span-2 col-span-2 bg-gray-800 rounded-3xl p-2 items-center'>
          <div className='flex'>
            <h1 className='text-gray-100 text-2xl font-bold text-center mb-2 flex-grow'>Inventory Value Percentages</h1>
            <div className="tooltip mr-2 mt-1">
              <div className="icon">i</div>
              <div className="tooltiptext">Click the legends to hide that section!</div>
            </div>
          </div>
          <PieChart chartData={categoryTotals} />
        </div>
        <div className='row-span-1 col-span-2 bg-gray-800 rounded-3xl p-2'>
          <h1 className='text-gray-100 text-2xl font-bold text-center'>Inventory List</h1>
          <ScrollableInventory items={inventoryItems} />
        </div>
        <div className='col-span-2 bg-gray-800 rounded-3xl p-2'>
          <h1 className='text-gray-100 text-2xl font-bold text-center'>Inventory Value History</h1>
          <LineGraph />
        </div>
        <div className='col-span-2 bg-gray-800 rounded-3xl p-2'>
          <h1 className='text-gray-100 text-2xl font-bold text-center'>StatTrack Leaderboard</h1>
          <LeaderboardST items={statTrackItems} />
        </div>
      </div>
      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
          <Loader />
        </div>
      )}

      {/* Still need to add more stuff to the footer */}
      <footer className="text-gray-100 text-center text-xs mt-4">
        <p>Created by <a href="https://github.com/KianAnd19" className="underline">Kian Anderson</a></p>
      </footer>
    </div>
  );
}

export default App;
