import React from "react";

function ScrollableList({ items }) {
    return (
      <div className="max-h-64 overflow-y-auto">
        {items.map((item, index) => (
          <div key={index} className="p-2 border-b border-gray-700 text-white">
            <div className="text-sm flex">
            <div className='mr-1 font-bold'>{index + 1}.</div>
                <img src={item.itemURL} alt="Profile Picture" className="inline-block w-10 h-10 mr-2 rounded-sm border-[#CC6633] border-2"/>
                <div className='flex-grow'>
                  <div className='flex-none truncate font-bold'>{item.itemName}</div>
                  <div className='flex-none'>{item.itemKills} confirmed kills</div>
                </div>
                
                <img src={item.profileURL} alt="Profile Picture" className="inline-block w-8 h-8 mr-2 rounded-sm ml-1"/>
                <div className='flex-grow'>{item.steamName}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  export default ScrollableList;