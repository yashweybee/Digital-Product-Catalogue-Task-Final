import React from "react";
import ProductList from "../ProductList/ProductList";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import ProductAddPage from "../../Pages/ProductAddPage/ProductAddPage";
import { Outlet } from "react-router";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const AppChild = () => {
  return (
    <div>
      <Provider store={appStore}>
        {/* <Header /> */}
        <Outlet />
        {/* <Footer /> */}
      </Provider>
    </div>
  );
};

export default AppChild;
