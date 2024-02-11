// import React, { useCallback, useEffect, useState, useRef } from "react";
// import PropTypes from "prop-types";
// import "./MultirangeSlider.css";

// const MultirangeSlider = ({ min, max, onChange }) => {
//   const [minVal, setMinVal] = useState(min);
//   const [maxVal, setMaxVal] = useState(max);
//   const minValRef = useRef(min);
//   const maxValRef = useRef(max);
//   const range = useRef(null);

//   // Convert to percentage
//   const getPercent = useCallback(
//     (value) => Math.round(((value - min) / (max - min)) * 100),
//     [min, max]
//   );

//   // Set width of the range to decrease from the left side
//   useEffect(() => {
//     const minPercent = getPercent(minVal);
//     const maxPercent = getPercent(maxValRef.current);

//     if (range.current) {
//       range.current.style.left = `${minPercent}%`;
//       range.current.style.width = `${maxPercent - minPercent}%`;
//     }
//   }, [minVal, getPercent]);

//   // Set width of the range to decrease from the right side
//   useEffect(() => {
//     const minPercent = getPercent(minValRef.current);
//     const maxPercent = getPercent(maxVal);

//     if (range.current) {
//       range.current.style.width = `${maxPercent - minPercent}%`;
//     }
//   }, [maxVal, getPercent]);

//   // Get min and max values when their state changes
//   useEffect(() => {
//     //onChange({ min: minVal, max: maxVal });
//     console.log("min:", minVal, " max:", maxVal);
//   }, [minVal, maxVal, onChange]);

//   return (
//     <div className="container">
//       <input
//         type="range"
//         min={min}
//         max={max}
//         value={minVal}
//         onChange={(event) => {
//           const value = Math.min(Number(event.target.value), maxVal);
//           setMinVal(value);
//           minValRef.current = value;
//         }}
//         className="thumb thumb--left"
//         style={{ zIndex: minVal > max - 100 && "5" }}
//       />
//       <input
//         type="range"
//         min={min}
//         max={max}
//         value={maxVal}
//         onChange={(event) => {
//           const value = Math.max(Number(event.target.value), minVal);
//           setMaxVal(value);
//           maxValRef.current = value;
//         }}
//         className="thumb thumb--right"
//       />

//       <div className="slider">
//         <div className="slider__track" />
//         <div ref={range} className="slider__range" />
//       </div>
//       <div className="values">
//         <div className="slider__left-value">{minVal}</div>
//         <div className="slider__right-value">{maxVal}</div>
//       </div>
//     </div>
//   );
// };

// MultirangeSlider.propTypes = {
//   min: PropTypes.number.isRequired,
//   max: PropTypes.number.isRequired,
//   onChange: PropTypes.func.isRequired,
// };

// export default MultirangeSlider;

import React, { useEffect, useState } from "react";
import Slider from "react-slider";
import "../../assets/css/priceRange.css";
import { useDispatch } from "react-redux";
import { applyPriceRange } from "../../slices/productSlice";

function MultirangeSlider() {
  const dispatch = useDispatch();
  const [priceRange, setPriceRange] = useState([0, 10000]);

  const handlePriceRangeChange = (value) => {
    setPriceRange(value);

    // dispatch(applyPriceRange(value));
  };

  return (
    <div className="price-range-slider">
      <label htmlFor="priceRange">Price Range:</label>
      <Slider
        min={0}
        max={10000}
        value={priceRange}
        onChange={handlePriceRangeChange}
        className="custom-slider"
      />
      <span className="price-range-text">
        {priceRange[0]} - {priceRange[1]}
      </span>
    </div>
  );
}

export default MultirangeSlider;
