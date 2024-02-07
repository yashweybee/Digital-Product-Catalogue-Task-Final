import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./Pages/LoginPage/LoginPage.jsx";
import ProductAddPage from "./Pages/ProductAddPage/ProductAddPage.jsx";
import ProductListingPage from "./Pages/ProductListingPage/ProductListingPage.jsx";
import AdminProductListingPage from "./Pages/AdminProductListing/AdminProductListingPage.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/admin",
        element: <ProductAddPage />,
      },
      {
        path: "/admin/products",
        element: <AdminProductListingPage />,
      },
      {
        path: "/products",
        element: <ProductListingPage />,
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
