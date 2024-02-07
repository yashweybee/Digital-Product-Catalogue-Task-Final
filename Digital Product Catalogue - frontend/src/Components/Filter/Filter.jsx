import React, { useState } from "react";

const Filter = () => {
  const [showPannel, setShowPannel] = useState(false);

  const handleFilterPannel = () => {
    setShowPannel(!showPannel);
  };

  return (
    <>
      <div
        onClick={handleFilterPannel}
        className="bg-gray-400 flex justify-between cursor-pointer"
      >
        <p>Filters</p>
        <span>🔽</span>
      </div>
      {showPannel && (
        <div className="transition-all">
          <form className="product-form flex flex-col px-10 py-5">
            <label htmlFor="name" className="my-5">
              Name
              <input
                required
                type="text"
                placeholder="Product name"
                name="name"
                id="name"
                // value={name}
                // onChange={(e) => setName(e.target.value)}
                className="mt-2 p-1 pl-2 w-full border border-gray-400  rounded"
              />
            </label>

            <label htmlFor="price" className="my-5">
              Price
              <input
                type="number"
                placeholder="Product price"
                name="product-price"
                id="price"
                // value={price}
                // onChange={(e) => setPrice(e.target.value)}
                className="mt-2 p-1 pl-2 w-full border border-gray-400  rounded"
              />
            </label>

            <div className="my-5">
              <label htmlFor="tags">
                Add product tags
                <input
                  type="text"
                  name="tags"
                  id="tags"
                  //   value={tagText}
                  //   onChange={(e) => setTagText(e.target.value)}
                  //   onKeyDown={handleTags}
                  placeholder="Tag name"
                  className="mt-2 p-1 pl-2 w-full border border-gray-400  rounded"
                />
                <ul className="flex flex-wrap mt-2">
                  {/* {tags.map((tag) => (
                <li
                  key={tag}
                  className="p-2 m-2 w-max  bg-gray-700 text-white rounded-xl"
                >
                  {tag}
                </li>
              ))} */}
                </ul>
              </label>
            </div>

            <div className="flex ">
              <button
                type="button"
                // onClick={handleSubmitBtn}
                className="m-2 bg-gray-800 p-3 text-white hover:bg-gray-700 rounded"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Filter;
