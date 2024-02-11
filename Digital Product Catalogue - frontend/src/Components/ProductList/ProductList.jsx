import React, { useEffect, useState } from "react";
import {
  useAddWishlistItemMutation,
  useGetProductsQuery,
} from "../../utils/apiSlice";
import Product from "../Product/Product";
import ProductModel from "../ProductModel/ProductModel";
import { useSelector } from "react-redux";
const ProductList = () => {
  const [clickedProduct, setClickedProduct] = useState(null);
  const { data: products, isLoading } = useGetProductsQuery();
  const [addToWishlist] = useAddWishlistItemMutation();
  const [isOpen, setIsOpen] = useState(false);
  const sortingType = useSelector((store) => store.filter.sortBy);
  const productTags = useSelector((store) => store.filter.filterTags);
  const searchText = useSelector((store) => store.filter.searchText);
  const [productsData, setProductsData] = useState([]);
  // if (!products) return;

  const setTodoDataOnStateChange = () => {
    console.log(products);
    // const currentProductData = products;

    // sortingProductData();
    filteringProductDataBasedOnTags();
    searchProductDatabasedOnSearchText();
  };

  const searchProductDatabasedOnSearchText = () => {
    if (searchText.length === 0) {
      setProductsData(products);
    } else {
      const searchProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setProductsData(searchProducts);
    }
  };

  const filteringProductDataBasedOnTags = () => {
    // console.log(products);
    const tempData = [...products];
    const filteredProductsBasedOnTags = tempData.filter((product) => {
      return product.tags.some((tag) => productTags.includes(tag.tagName));
    });
    console.log(filteredProductsBasedOnTags.length);
    // console.log(products);
    if (filteredProductsBasedOnTags.length === 0) {
      setProductsData(products);
      return;
    }
    setProductsData(filteredProductsBasedOnTags);
  };

  const sortingProductData = () => {
    if (productsData.length === 0) return;
    console.log(productsData);
    const tempData = [...productsData];
    console.log(tempData);
    if (sortingType === "Latest") {
      setProductsData(tempData);
    } else if (sortingType === "Price") {
      const sortedProducts = tempData.sort((a, b) => a.price - b.price);
      console.log(sortedProducts);
      setProductsData(sortedProducts);
    } else {
      // sortingType === "Oldest"
      setProductsData(tempData.reverse());
    }

    // console.log(productsData);
    // filteringProductDataBasedOnTags(tempData);
  };

  useEffect(() => {
    if (!products) return;

    setTodoDataOnStateChange();
  }, [products, sortingType, productTags, searchText]);

  const handleCloseModel = () => {
    setIsOpen(false);
    setClickedProduct(null);
  };

  const handleOpenModel = (modelId) => {
    const modelData = products.find((p) => p.id === modelId);
    setIsOpen(true);
    setClickedProduct(modelData);
  };

  const handleAddtoWishlist = (productId) => {
    const wishlistItem = {
      userId: localStorage.getItem("userId"),
      productId: productId,
    };
    // console.log(localStorage.getItem("userId"));
    addToWishlist(wishlistItem);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!productsData.length) {
    return <div>No products available.</div>;
  }

  return (
    <div className="flex flex-wrap justify-start ">
      {productsData.map((product) => (
        <Product
          handleOpenModel={handleOpenModel}
          handleAddtoWishlist={handleAddtoWishlist}
          data={product}
          key={product.id}
        />
      ))}

      {clickedProduct && (
        <ProductModel
          handleAddtoWishlist={handleAddtoWishlist}
          data={clickedProduct}
          handleCloseModel={handleCloseModel}
        />
      )}
    </div>
  );
};

export default ProductList;
