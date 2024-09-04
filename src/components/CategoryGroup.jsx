import React, { useContext, useEffect, useState } from "react";
import Container from "./Container";

import Category from "./Category";
import { api } from "../api/axios";
import { DataContext } from "../context/DataContext";

const CategoryGroup = () => {
  const { isloading, setIsloading } = useContext(DataContext);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategory = async () => {
      setIsloading(true);
      const res = await api.get("products/categories");

      setCategories(res.data);
      setIsloading(false);
    };

    fetchCategory();
  }, []);

  return (
    <section className="category-list mb-10 py-3">
      <Container>
        <p className="font-heading mb-2">Select Categories</p>
        <div
          id="categoryList"
          className="flex gap-3 select-none lg:overflow-hidden overflow-auto"
        >
          <Category catName="All" />
          {!isloading ? (
            categories.map((c, key) => <Category key={key} catName={c} />)
          ) : (
            <div className="flex gap-3 animate-pulse ">
              <button className="border border-neutral-200 px-4 py-1 flex items-center rounded-lg">
                <span className="inline-block bg-neutral-200 w-24 h-4" />
              </button>
              <button className="border border-neutral-200 px-4 py-1 flex items-center rounded-lg">
                <span className="inline-block bg-neutral-200 w-24 h-4" />
              </button>
              <button className="border border-neutral-200 px-4 py-1 flex items-center rounded-lg">
                <span className="inline-block bg-neutral-200 w-24 h-4" />
              </button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default CategoryGroup;
