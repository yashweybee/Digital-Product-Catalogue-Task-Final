import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchText } from "../../utils/filterSlice";
import { CrossSearchSvg, SearchSvg } from "../../utils/svgs";

const Search = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleCrossBtn = (e) => {
    e.preventDefault();
    setText("");
    dispatch(setSearchText(""));
  };

  const handeSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchText(text));
  };

  return (
    <div className="">
      <form className="search-form " onSubmit={handeSubmit}>
        <span className="absolute top-7 ml-2">
          <SearchSvg />
        </span>
        <input
          className="mt-2 p-1 pl-9 border border-gray-400 rounded bg-transparent"
          placeholder="Search.."
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {text !== "" && (
          <button
            className="relative top-2 -left-7"
            type="button"
            onClick={handleCrossBtn}
          >
            <CrossSearchSvg />
          </button>
        )}
      </form>
    </div>
  );
};

export default Search;
