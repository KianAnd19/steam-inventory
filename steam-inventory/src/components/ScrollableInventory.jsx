import React from 'react';

function ScrollableList({ items }) {
  return (
    <div className="overflow-y-auto max-h-60">
      {items.map(item => (
        <div 
          key={item.id} 
          className="p-2 border-b border-gray-700"
          style={{ color: `#${item.color}` }}  // Setting the text color dynamically
        >
          <div className="text-sm flex">
            <img src={item.image} alt={item.name} className="inline-block w-12 h-12 mr-2"/>
            <div className='flex-grow'>{item.markethashname}</div>
            <div className='object-right'>${item.pricelatest}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ScrollableList;
  