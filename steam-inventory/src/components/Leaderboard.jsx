import React from "react";

function ScrollableList({ items }) {
    return (
      <div className="max-h-64 overflow-y-auto">
        {items.map((item, index) => (
          <div key={index} className="p-2 border-b border-gray-700 text-white">
            {item.name} {/* Replace with how you want to display each item */}
          </div>
        ))}
      </div>
    );
  }

  export default ScrollableList;