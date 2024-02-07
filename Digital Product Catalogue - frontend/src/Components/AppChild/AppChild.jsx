import React from "react";
import ProductList from "../ProductList/ProductList";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import ProductAddPage from "../../Pages/ProductAddPage/ProductAddPage";
import { Outlet } from "react-router";

const AppChild = () => {
  return (
    <div>
      <Provider store={appStore}>
        <Outlet />
      </Provider>
    </div>
  );
};

export default AppChild;
