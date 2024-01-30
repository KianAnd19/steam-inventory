import React from "react";

function ScrollableList({ items }) {
    return (
      <div className="max-h-64 overflow-y-auto">
        {items.map((item, index) => (
          <div key={index} className="p-2 border-b border-gray-700 text-white">
            <div className="text-sm flex">
            <div className='mr-1'>{index + 1}.</div>
                <img src={item.image} alt="Profile Picture" className="inline-block w-6 h-6 mr-2 rounded-sm"/>
                <div className='flex-grow truncate'>{item.name}</div>
                <div className='flex-none'>${item.value}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  export default ScrollableList;