import React, { useEffect, useState } from "react";
import ProductList from "../../Components/ProductList/ProductList";
import Header from "../../Components/Header/Header";
import Filter from "../../Components/Filter/Filter";
import Sorting from "../../Components/Sorting/Sorting";
import Footer from "../../Components/Footer/Footer";
import WishList from "../../Components/WishList/WishList";
import { useNavigate } from "react-router";

const ProductListingPage = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userName") === "Admin") {
      setIsAdmin(true);
    }
    if (!localStorage.getItem("userName")) {
      navigate("/login");
    }
  }, []);
  return (
    <div>
      <Header />
      <section className="">
        <div className="mt-5">
          <div className="flex flex-wrap mb-24 ">
            {!isAdmin && <Filter />}
            <div className="w-full px-3 lg:w-3/4 overflow-y-auto flex-1">
              {!isAdmin && <Sorting />}
              <ProductList />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductListingPage;
