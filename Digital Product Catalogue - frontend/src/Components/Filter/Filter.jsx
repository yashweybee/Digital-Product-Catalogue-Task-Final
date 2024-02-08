import React, { useState } from "react";

const Filter = () => {
  const [showPannel, setShowPannel] = useState(false);

  const handleFilterPannel = () => {
    setShowPannel(!showPannel);
  };

  return (
    <div className="w-full mt-5 pr-2 lg:w-2/12 lg:block">
      <div className="p-4 mb-5 bg-white border border-gray-200 text-black">
        <h2 className="text-2xl font-bold text-black"> Categories</h2>
        <div className="w-16 pb-2 mb-6 border-b border-rose-600 dark:border-gray-400"></div>
        <ul>
          <li className="mb-4">
            <label for="" className="flex items-center text-black  ">
              <input type="checkbox" className="w-4 h-4 mr-2" />
              <span className="text-lg">Biscuits</span>
            </label>
          </li>
          <li className="mb-4">
            <label for="" className="flex items-center ">
              <input type="checkbox" className="w-4 h-4 mr-2 " />
              <span className="text-lg">Fruits</span>
            </label>
          </li>
          <li className="mb-4">
            <label for="" className="flex items-center ">
              <input type="checkbox" className="w-4 h-4 mr-2" />
              <span className="text-lg">Seafood</span>
            </label>
          </li>
          <li className="mb-4">
            <label for="" className="flex items-center ">
              <input type="checkbox" className="w-4 h-4 mr-2" />
              <span className="text-lg">Vegetables</span>
            </label>
          </li>
          <li className="mb-4">
            <label for="" className="flex items-center ">
              <input type="checkbox" className="w-4 h-4 mr-2" />
              <span className="text-lg">Frozen Foods &amp; Staples</span>
            </label>
          </li>
        </ul>
      </div>

      <div className="p-4 mb-5 bg-white border border-gray-200 ">
        <h2 className="text-2xl font-bold text-black">Price</h2>
        <div className="w-16 pb-2 mb-6 border-b border-rose-600 dark:border-gray-400"></div>
        <div>
          <input
            type="range"
            className="w-full h-1 mb-4 bg-blue-100 rounded appearance-none cursor-pointer"
            max="100"
            value="30"
          />
          <div className="flex justify-between ">
            <span className="inline-block text-lg font-bold text-blue-800 ">
              $1
            </span>
            <span className="inline-block text-lg font-bold text-blue-800 ">
              $500
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
