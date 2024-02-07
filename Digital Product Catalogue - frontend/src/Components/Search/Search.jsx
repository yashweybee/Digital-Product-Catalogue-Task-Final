import React, { useState } from "react";

const Search = () => {
  const [text, setText] = useState("");
  const handleCrossBtn = () => {
    setText("");
  };

  const handeSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="">
      <form className="search-form" onSubmit={handeSubmit}>
        {/* <span>search</span> */}
        <input
          className="mt-2 p-1 pl-2  border border-gray-400 rounded bg-transparent"
          placeholder="Search.."
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {text !== "" && (
          <button type="button" onClick={handleCrossBtn}>
            {/* <CrossSvg /> */}
          </button>
        )}
      </form>
    </div>
  );
};

export default Search;
