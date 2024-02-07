import React from "react";
import { Link } from "react-router-dom";
import Search from "../Search/Search";

const Header = () => {
  return (
    <nav className="p-2 flex gap-10 items-center shadow-md rounded">
      <div className="">
        <h1 className="text-xl font-bold">Shooping.com</h1>
      </div>
      <div className="">
        <Search />
      </div>
      <div>
        <ul className="flex justify-between">
          <li className="mx-2">
            <Link to="/">Home</Link>
          </li>
          <li className="mx-2">
            <Link to="/">Wishlist</Link>
          </li>
        </ul>
      </div>

      <div>
        <button className="m-2 bg-gray-800 p-2 text-white hover:bg-gray-700 rounded">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Header;
