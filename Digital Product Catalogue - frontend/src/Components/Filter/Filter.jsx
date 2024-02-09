import React, { useState } from "react";
import { useGetProductTagsQuery } from "../../utils/apiSlice";
import { useDispatch } from "react-redux";
import { setFilterTags } from "../../utils/filterSlice";
// import MultirangeSlider from "../MultirangeSlider/MultirangeSlider";

import MultiRangeSlider from "multi-range-slider-react";

const Filter = () => {
  const { data: productTags } = useGetProductTagsQuery();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const [filteringTags, setFilteringTags] = useState([]);
  if (!productTags) return;

  const handleCheckBox = (e) => {
    const tempTags = filteringTags;
    if (filteringTags.includes(e.target.id)) {
      const index = tempTags.indexOf(e.target.id);
      if (index > -1) {
        // only splice array when item is found
        tempTags.splice(index, 1); // 2nd parameter means remove one item only
      }
      setFilteringTags(tempTags);
    } else {
      // const tempTags = filteringTags;
      tempTags.push(e.target.id);
      setFilteringTags(tempTags);
    }
    dispatch(setFilterTags(filteringTags));

    // console.log(filteringTags);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // console.log(filteringTags);
  // if (filteringTags.length === 0) return;

  return (
    <div className="w-full mt-5 pr-2 lg:w-2/12 lg:block ">
      <div className="p-4 mb-5 bg-white border border-gray-200 text-black rounded">
        <h2
          onClick={handleToggle}
          className="text-2xl font-bold text-black cursor-pointer "
        >
          Categories
        </h2>
        <div className="w-16 pb-2 mb-6 border-b border-rose-600 dark:border-gray-400"></div>
        {isOpen && (
          <ul className="transition-all">
            {productTags.map((tag) => (
              <li key={tag} className="mb-4">
                <label htmlFor={tag} className="flex items-center text-black  ">
                  <input
                    id={tag}
                    type="checkbox"
                    onClick={handleCheckBox}
                    className="w-4 h-4 mr-2"
                  />
                  <span className="text-lg">{tag}</span>
                </label>
              </li>
            ))}
          </ul>
        )}
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
            onChange={() => {}}
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
        {/* <MultirangeSlider
          min={0}
          max={1000}
          onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
        /> */}
        {/* 
        <MultiRangeSlider
          min={0}
          max={100}
          step={5}
          minValue={0}
          maxValue={100}
          ruler={false}
          preventWheel={true}
          onInput={(e) => {
            // handleInput(e);
            set_minValue(e.minValue);
            set_maxValue(e.maxValue);
            // console.log();
          }}
        /> */}
      </div>
    </div>
  );
};

export default Filter;
