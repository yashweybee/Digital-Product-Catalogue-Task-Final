import React from "react";
import { useDispatch } from "react-redux";
import { setSortBy } from "../../utils/filterSlice";

const Sorting = () => {
  const dispatch = useDispatch();
  const handleSortSelect = (e) => {
    console.log(e.target.value);
    dispatch(setSortBy(e.target.value));
  };

  return (
    <div className="px-3 mb-0">
      <div className="items-center justify-between hidden px-3 py-2 bg-gray-100 md:flex ">
        <div className="flex items-center justify-between">
          <div className="pr-3 border-r border-gray-300">
            <select
              name=""
              id=""
              onChange={handleSortSelect}
              className="block w-40 text-base bg-gray-100 cursor-pointer text-black"
            >
              <option value="Latest">Sort by latest</option>
              <option value="Oldest">Sort by Oldest</option>
              {/* <option value="">Sort by Popularity</option> */}
              <option value="Price">Sort by Price</option>
            </select>
          </div>
          {/* <div className="flex items-center pl-3">
            <p className="text-xs text-black">Show</p>
            <div className="px-2 py-2 text-xs text-gray-500 ">
              <select
                name=""
                id=""
                className="block text-base bg-gray-100 cursor-pointer w-11 text-black "
              >
                <option value="">15</option>
                <option value="">17</option>
                <option value="">19</option>
              </select>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Sorting;
