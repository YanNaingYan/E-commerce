import React, { useContext } from "react";
import StarRating from "./StarRating";
import { DataContext } from "../context/DataContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Product = ({
  product: {
    id,
    title,
    price,
    image,
    rating: { rate, count },
    description,
  },
}) => {
  const { setSelectedProducts, selectedProducts, added, setAdded } =
    useContext(DataContext);

  const showSwal = () => {
    withReactContent(Swal).fire({
      position: "top-end",
      icon: "success",
      title: "Product Added to Cart",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleAddToCart = (id) => {
    const newProduct = {
      id,
      price,
      image,
      title,
      quantity: 1,
      cost: price,
    };

    const isAdded = selectedProducts.find((p) => p.id === id);

    if (!isAdded) {
      setSelectedProducts([...selectedProducts, newProduct]);

      setAdded((prevAdded) => ({
        ...prevAdded,
        [id]: true,
      }));

      showSwal();
    }
  };

  const isAdded = added[id];

  return (
    <div className="product-card group select-none">
      <img
        className="product-card-img group-hover:-rotate-6 duration-300 transition-transform h-32 ms-5 -mb-16"
        src={image}
      />

      <div className="product-card-body border border-neutral-600 p-5">
        <p className="product-card-title font-heading text-xl line-clamp-1 font-bold mt-14 mb-2">
          {title}
        </p>
        <p className="product-card-description text-neutral-500 text-sm mb-4 line-clamp-2">
          {description}
        </p>
        <div className="rating border-b border-neutral-600 pb-3 mb-3 flex gap-4">
          <StarRating rate={rate} />
        </div>
        <p className="product-card-price font-heading font-bold text-xl mb-3">
          $ <span className="price">{price}</span>
        </p>
        <button
          onClick={() => handleAddToCart(id)}
          disabled={isAdded}
          className={`${
            isAdded && "bg-neutral-600 text-white"
          } duration-100 active:scale-90 border font-bold hover:bg-neutral-600 hover:text-white disabled:pointer-events-none select-none border-neutral-600 block w-full h-12 font-heading`}
        >
          {isAdded ? "Added" : "Add to cart"}
        </button>
      </div>
    </div>
  );
};

export default Product;
