import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";

const Category = ({ catName }) => {
  const { handleCategory } = useContext(DataContext);

  return (
    <button
      onClick={() => handleCategory(catName)}
      className=" whitespace-nowrap border border-neutral-600 hover:bg-neutral-200 px-4 py-1 rounded-lg"
    >
      {catName}
    </button>
  );
};

export default Category;
