import React from "react";

const page = () => {
  return (
    <div>
      <div className="min-h-[400px] p-4 grid grid-cols-3 grid-rows-2 gap-4">
        <div className="bg-gray-800 border border-gray-700 rounded-md aspect-square transition-all duration-200 hover:opacity-80">
          Grid Item 1
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-md aspect-square transition-all duration-200 hover:opacity-80">
          Grid Item 2
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-md aspect-square transition-all duration-200 hover:opacity-80">
          Grid Item 3
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-md aspect-square transition-all duration-200 hover:opacity-80">
          Grid Item 4
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-md aspect-square transition-all duration-200 hover:opacity-80">
          Grid Item 5
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-md aspect-square transition-all duration-200 hover:opacity-80">
          Grid Item 6
        </div>
      </div>
    </div>
  );
};

export default page;
