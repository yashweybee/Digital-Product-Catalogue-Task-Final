import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Search from "../Search/Search";
import { useDispatch, useSelector } from "react-redux";
import { setShowWishlistModel } from "../../utils/stateSlice";
import { useGetWishlistProductsQuery } from "../../utils/apiSlice";

const Header = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { data: wishlistProducts } = useGetWishlistProductsQuery();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!products) return;
  //   console.log(products);
  //   setNumbersOfWishlistItems(products.length);
  // }, [products, refetchWishlistData]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  return (
    <>
      {showPopup && (
        <div
          id="deleteModal"
          tabIndex="-1"
          aria-hidden="true"
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full"
        >
          <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
          <div className="absolute left-[50%] -translate-x-[50%] p-4 w-full max-w-md h-full md:h-auto">
            <div className="relative p-4 text-center bg-white rounded-lg shadow  sm:p-5">
              <button
                onClick={() => setShowPopup(!showPopup)}
                type="button"
                className="text-black absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-black rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-white dark:hover:text-black"
                data-modal-toggle="deleteModal"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>

              <svg
                className="text-black dark:text-black w-11 h-11 mb-3.5 mx-auto"
                fill="#000000"
                height="60px"
                width="60px"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 512 512"
                xmlSpace="preserve"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <g>
                    <g>
                      <g>
                        <path d="M256,0C114.617,0,0,114.617,0,256s114.617,256,256,256s256-114.617,256-256S397.383,0,256,0z M256,494.933 C124.043,494.933,17.067,387.957,17.067,256S124.043,17.067,256,17.067S494.933,124.043,494.933,256S387.957,494.933,256,494.933 z"></path>{" "}
                        <path d="M162.133,256c20.46,0,34.133-27.346,34.133-59.733c0-32.388-13.673-59.733-34.133-59.733 c-20.461,0-34.133,27.346-34.133,59.733C128,228.654,141.673,256,162.133,256z M162.133,153.6 c7.819,0,17.067,18.495,17.067,42.667s-9.248,42.667-17.067,42.667c-7.819,0-17.067-18.495-17.067-42.667 S154.314,153.6,162.133,153.6z"></path>{" "}
                        <path d="M349.867,136.533c-20.461,0-34.133,27.346-34.133,59.733c0,32.388,13.673,59.733,34.133,59.733 c20.46,0,34.133-27.346,34.133-59.733C384,163.879,370.327,136.533,349.867,136.533z M349.867,238.933 c-7.819,0-17.067-18.495-17.067-42.667s9.248-42.667,17.067-42.667s17.067,18.495,17.067,42.667S357.686,238.933,349.867,238.933 z"></path>{" "}
                        <path d="M392.533,119.467c-18.873,0-34.133-15.26-34.133-34.133c0-4.713-3.82-8.533-8.533-8.533s-8.533,3.82-8.533,8.533 c0,28.299,22.901,51.2,51.2,51.2c4.713,0,8.533-3.82,8.533-8.533S397.246,119.467,392.533,119.467z"></path>{" "}
                        <path d="M170.667,85.333c0-4.713-3.82-8.533-8.533-8.533s-8.533,3.82-8.533,8.533c0,18.873-15.26,34.133-34.133,34.133 c-4.713,0-8.533,3.82-8.533,8.533s3.82,8.533,8.533,8.533C147.766,136.533,170.667,113.632,170.667,85.333z"></path>{" "}
                        <path d="M256,298.667c-45.975,0-86.916,24.514-109.784,63.989c-2.362,4.078-0.971,9.299,3.107,11.661 c4.078,2.362,9.299,0.971,11.661-3.107c19.868-34.298,55.241-55.477,95.016-55.477s75.148,21.179,95.016,55.477 c2.362,4.078,7.583,5.469,11.661,3.107c4.078-2.362,5.469-7.583,3.107-11.661C342.916,323.18,301.975,298.667,256,298.667z"></path>{" "}
                      </g>{" "}
                    </g>{" "}
                  </g>{" "}
                </g>
              </svg>

              {/* <svg
                className="text-black dark:text-black w-11 h-11 mb-3.5 mx-auto"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg> */}
              <p className="mb-4 text-black dark:text-black">
                Are you sure you want to logout?
              </p>
              <div className="flex justify-center items-center space-x-4">
                <button
                  onClick={() => setShowPopup(!showPopup)}
                  data-modal-toggle="deleteModal"
                  type="button"
                  className="py-2 px-3 text-sm font-medium text-white bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-black focus:z-10 dark:bg-gray-700 dark:text-white dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  No, cancel
                </button>
                <button
                  onClick={handleLogout}
                  type="submit"
                  className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                >
                  Yes, I'm sure
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* <nav className="p-2 flex gap-10 items-center shadow-md rounded">
        <div className="">
          <h1 className="text-xl font-bold">Trendsetter.com</h1>
        </div>
        <div className="">
          <Search />
        </div>
        <div>
          <ul className="flex justify-between">
            <li className="mx-2">
              <Link to="/products">Home</Link>
            </li>
            <li className="mx-2">
              <Link to="/wishlist">WishList</Link>
            </li>
          </ul>
        </div>

        <div>
          <button
            onClick={() => setShowPopup(!showPopup)}
            className="m-2 bg-gray-800 p-2 text-white hover:bg-gray-700 rounded"
          >
            Logout
          </button>
        </div>
      </nav> */}

      <header>
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 ">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <Link to="/products" className="flex items-center">
              <span className="self-center text-xl font-semibold whitespace-nowrap">
                {/* <h1 className="text-3xl">Shopping.com</h1> */}
                Trendsetter
              </span>
            </Link>

            <div className="flex gap-4 items-center lg:order-2">
              <Search />
              <button
                onClick={() => {
                  if (localStorage.getItem("token")) {
                    setShowPopup(!showPopup);
                  } else {
                    navigate("/login");
                  }
                }}
                className="text-white bg-gray-800  hover:bg-black focus:ring-4  font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2  focus:outline-none"
              >
                {localStorage.getItem("token") ? "Logout" : "Login"}
              </button>
              {/* <a
                href="#"
                className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
                Get started
              </a> */}
              <button
                data-collapse-toggle="mobile-menu-2"
                type="button"
                className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="mobile-menu-2"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  className="hidden w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>

            <div
              className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
              id="mobile-menu-2"
            >
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li>
                  <Link
                    to="/products"
                    className="block py-2 pr-4 pl-3 text-gray-800 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 "
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products"
                    className="block py-2 pr-4 pl-3 text-gray-800 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 "
                    aria-current="page"
                  >
                    Men
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products"
                    className="block py-2 pr-4 pl-3 text-gray-800 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 "
                    aria-current="page"
                  >
                    Women
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products"
                    className="block py-2 pr-4 pl-3 text-gray-800 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 "
                    aria-current="page"
                  >
                    Children
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products"
                    className="block py-2 pr-4 pl-3 text-gray-800 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 "
                    aria-current="page"
                  >
                    Marketplace
                  </Link>
                </li>
                <li>
                  <Link
                    to="/wishlist"
                    className="block py-2 pr-4 pl-3 text-gray-800 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 "
                    aria-current="page"
                  >
                    {/* Wishlist({wishlistProducts?.length}) */}
                    Wishlist
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
  //   Home
  // Company
  // Marketplace
  // Features
  // Team
  // Contact
};

export default Header;
