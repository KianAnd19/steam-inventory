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
          {item.markethashname} {/* Use the appropriate field from the item */}
        </div>
      ))}
    </div>
  );
}

export default ScrollableList;
  