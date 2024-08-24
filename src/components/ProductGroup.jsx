import React, { useContext, useEffect, useState } from "react";
import Container from "./Container";

import ProductLoader from "./ProductLoader";
import Product from "./Product";
import { DataContext } from "../context/DataContext";
import { api } from "../api/axios";

const ProductGroup = () => {
  const {
    isloading,
    setIsloading,
    products,
    setProducts,
    selected,
    selectedCategory,
  } = useContext(DataContext);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsloading(true);
      const res = await api.get("products");
      setProducts(res.data);
      setIsloading(false);
    };
    fetchProduct();
  }, []);

  return (
    <section className="product-list mb-10">
      <Container>
        <div
          id="productList"
          className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 "
        >
          {isloading ? (
            <>
              <ProductLoader />
              <ProductLoader />
              <ProductLoader />
              <ProductLoader />
              <ProductLoader />
              <ProductLoader />
            </>
          ) : selected ? (
            products.map((p) => <Product key={p.id} product={p} />)
          ) : (
            selectedCategory.map((p) => <Product key={p.id} product={p} />)
          )}
        </div>
      </Container>
    </section>
  );
};

export default ProductGroup;
