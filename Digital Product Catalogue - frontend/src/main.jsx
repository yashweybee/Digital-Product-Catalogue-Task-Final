import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./Pages/LoginPage/LoginPage.jsx";
import ProductAddPage from "./Pages/ProductAddPage/ProductAddPage.jsx";
import ProductListingPage from "./Pages/ProductListingPage/ProductListingPage.jsx";
import AdminProductListingPage from "./Pages/AdminProductListing/AdminProductListingPage.jsx";
import WishlistPage from "./Pages/WishlistPage/WishlistPage.jsx";
import AppChild from "./Components/AppChild/AppChild.jsx";

const token = localStorage.getItem("token");
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppChild />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/admin",
        // element: <>{token ? <ProductAddPage /> : <>Please login</>}</>,
        element: <ProductAddPage />,
      },
      {
        path: "/admin/products",
        element: <>{token ? <AdminProductListingPage /> : <>Please login</>}</>,
      },
      {
        path: "/products",
        // element: <>{token ? <ProductListingPage /> : <>Please login</>}</>,
        element: <ProductListingPage />,
      },
      {
        path: "/wishlist",
        element: <>{token ? <WishlistPage /> : <>Please login</>}</>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <RouterProvider router={appRouter} />
);
