import React, { Fragment, useState } from "react";

const Autocomplete = ({ suggestions = [], handleTags }) => {
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userInput, setUserInput] = useState("");

  const onChange = (e) => {
    const userInput = e.currentTarget.value;

    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = suggestions.filter(
      (suggestion) =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    setActiveSuggestion(-1);
    setShowSuggestions(true);
    setFilteredSuggestions(filteredSuggestions);
    setUserInput(e.currentTarget.value);
    // console.log("filter-s" + filteredSuggestions);
    // console.log(userInput);
  };

  const onClick = (e) => {
    setActiveSuggestion(0);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    setUserInput(e.currentTarget.innerText);
  };

  const onKeyDown = (e) => {
    // User pressed the enter key
    if (e.keyCode === 13) {
      if (!filteredSuggestions.includes(userInput)) {
        handleTags(e, userInput);
      }

      setActiveSuggestion(0);
      setShowSuggestions(false);
      setUserInput(filteredSuggestions[activeSuggestion]);
      handleTags(e, filteredSuggestions[activeSuggestion]);

      setUserInput("");
    }
    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      setActiveSuggestion(activeSuggestion - 1);
    }
    // User pressed the down arrow
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      setActiveSuggestion(activeSuggestion + 1);
    }
  };

  let suggestionsListComponent;

  if (showSuggestions && userInput) {
    if (filteredSuggestions.length) {
      suggestionsListComponent = (
        <ul className="suggestions z-20 w-96 absolute shadow-2xl rounded">
          {filteredSuggestions.map((suggestion, index) => {
            const classNameSugegst =
              index === activeSuggestion ? "suggestion-active" : "";

            return (
              <li
                className={
                  classNameSugegst
                    ? `${classNameSugegst} w-full bg-gray-600 text-white p-2`
                    : "" + "w-full bg-white p-2 border-b-2 border-gray-400 "
                }
                key={suggestion}
                onClick={onClick}
              >
                {suggestion}
              </li>
            );
          })}
        </ul>
      );
    } else {
      suggestionsListComponent = (
        <div className="no-suggestions">
          <em>No suggestions, you're on your own!</em>
        </div>
      );
    }
  }

  return (
    <>
      <Fragment>
        <input
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
          className="mt-2 p-1 pl-2 w-full border border-gray-400  rounded"
        />
        {suggestionsListComponent}
      </Fragment>
    </>
  );
};

export default Autocomplete;
