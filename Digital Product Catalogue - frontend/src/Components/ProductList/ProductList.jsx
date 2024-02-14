import React, { useEffect, useState } from "react";
import {
  useAddWishlistItemMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
  useGetWishlistProductsQuery,
} from "../../utils/apiSlice";
import Product from "../Product/Product";
import ProductModel from "../ProductModel/ProductModel";
import { useSelector } from "react-redux";
import EditModel from "../EditModel/EditModel";
const ProductList = () => {
  const [clickedProduct, setClickedProduct] = useState(null);
  const { data: products, isLoading } = useGetProductsQuery();
  const { data: wishlistProducts } = useGetWishlistProductsQuery();
  const [addToWishlist] = useAddWishlistItemMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [isOpen, setIsOpen] = useState(false);
  const sortingType = useSelector((store) => store.filter.sortBy);
  const productTags = useSelector((store) => store.filter.filterTags);
  const searchText = useSelector((store) => store.filter.searchText);
  const priceRangeValues = useSelector(
    (store) => store?.state?.priceRangeValues
  );
  const [productsData, setProductsData] = useState([]);
  // if (!products) return;

  const setProductDataBasedOnPriceRange = () => {
    // console.log(priceRangeValues.min);
    // let timer;

    const filteredProducts = products.filter((product) => {
      return (
        product.price >= priceRangeValues.min &&
        product.price <= priceRangeValues.max
      );
    });

    setTimeout(() => {
      setProductsData(filteredProducts);
    }, 500);

    // clearTimeout(timer);
  };

  const searchProductDatabasedOnSearchText = () => {
    if (!products) return;
    if (searchText.length === 0) {
      setProductsData(products);
      // sortingProductData(products);
    } else {
      const searchProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setProductsData(searchProducts);
      // sortingProductData(searchProducts);
    }
  };

  const filteringProductDataBasedOnTags = () => {
    // if (productTags.length === 0) return;

    // console.log(productTags);
    const tempData = [...products];

    const filteredProductsBasedOnTags = tempData.filter((product) => {
      return product.tags.some((tag) => productTags.includes(tag.tagName));
    });

    if (filteredProductsBasedOnTags.length === 0) {
      setProductsData(products);
      return;
    }
    setProductsData(filteredProductsBasedOnTags);
  };

  const sortingProductData = (data) => {
    if (data.length === 0) return;

    const tempData = [...data];
    if (sortingType === "Latest") {
      setProductsData(tempData.reverse());
    } else if (sortingType === "Price") {
      const sortedProducts = tempData.sort((a, b) => a.price - b.price);
      console.log(sortedProducts);
      setProductsData(sortedProducts);
    } else {
      // sortingType === "Oldest"
      setProductsData(tempData.reverse());
    }
  };

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

  const handelDeleteItem = (productId) => {
    // console.log(data.id);
    deleteProduct(productId);

    const newData = productsData.filter((product) => product.id !== productId);

    setProductsData(newData);
  };

  useEffect(() => {
    sortingProductData(productsData);
  }, [sortingType]);

  useEffect(() => {
    if (!products) return;

    searchProductDatabasedOnSearchText();
  }, [products, searchText]);

  useEffect(() => {
    if (!products) return;
    filteringProductDataBasedOnTags();
  }, [productTags]);

  useEffect(() => {
    if (!products) return;
    setProductDataBasedOnPriceRange();
  }, [priceRangeValues]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!productsData.length) {
    return <div>No products available.</div>;
  }

  // console.log(wishlistProducts);

  return (
    <div className="flex flex-wrap justify-start ">
      {productsData.map((product) => (
        <Product
          handleOpenModel={handleOpenModel}
          handleAddtoWishlist={handleAddtoWishlist}
          handelDeleteItem={handelDeleteItem}
          // isInWishlist={isInWishlist}
          // wishlistData={wishlistProducts}
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
