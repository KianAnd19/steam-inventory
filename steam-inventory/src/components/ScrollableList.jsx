import React from 'react';

function ScrollableList({ items }) {
    return (
      <div className="overflow-y-auto max-h-64">
        {items.map((item, index) => (
          <div key={index} className="p-4 border-b border-gray-400 text-white">
            {item.name} {/* Replace with how you want to display each item */}
          </div>
        ))}
      </div>
    );
  }

export default ScrollableList;
  