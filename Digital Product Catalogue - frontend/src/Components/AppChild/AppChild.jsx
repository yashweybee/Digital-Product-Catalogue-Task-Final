import React from "react";
import ProductForm from "../ProductForm/ProductForm";
import ProductList from "../ProductList/ProductList";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";

const AppChild = () => {
  return (
    <div>
      <Provider store={appStore}>
        <ProductForm />
        <ProductList />
      </Provider>
    </div>
  );
};

export default AppChild;
