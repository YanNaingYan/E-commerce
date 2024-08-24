import React, { useContext, useRef } from "react";
import { DataContext } from "../context/DataContext";
import Cart from "./Cart";

const CartDrawer = () => {
  const { toggleCartDrawer, selectedProducts, handleOrder } =
    useContext(DataContext);
  return (
    <section
      className="cart-box flex flex-col overflow-x-hidden border-s-2 border-neutral-600  fixed w-96 h-screen bg-white top-0 right-0 z-50 duration-300"
      id="cartBox"
    >
      <div className="cart-header px-3 border-b-2 border-neutral-600">
        <div className="flex justify-between items-center py-3">
          <div>
            <h1 className="font-heading font-bold text-2xl">Your Items</h1>
            <p className="text-neutral-500">
              Product in Cart &nbsp;
              <span
                id="cartBodyCount"
                className="text-xs w-4 h-4 bg-red-500 inline-flex justify-center items-center text-white"
              >
                {selectedProducts.length}
              </span>
            </p>
          </div>
          <div className="control-btn flex gap-2">
            <button
              onClick={toggleCartDrawer}
              className="border duration-100 active:scale-90 border-neutral-600 h-12 w-12 flex justify-center items-center"
              id="cartCloseBtn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="cart-body flex-grow flex flex-col overflow-y-scroll p-5">
        {selectedProducts.length === 0 && (
          <div className=" m-auto text-center w-3/4">
            <img src="https://mms-cart.netlify.app/assets/empty-cart-587700a3.svg" />
            <p className="font-heading">There is no item in cart</p>
          </div>
        )}
        {selectedProducts.length > 0 &&
          selectedProducts.map((cart) => <Cart key={cart.id} cart={cart} />)}
      </div>
      <div className="cart-footer px-3 border-t-2 border-neutral-600">
        <div className="flex flex-col justify-start py-3">
          <div className="text-end">
            <p className="text-neutral-500">Total Cost</p>
            <h1 className="font-heading font-bold text-2xl">
              ${" "}
              <span id="cartCostTotal">
                {selectedProducts
                  .reduce((pv, cv) => pv + cv.cost, 0)
                  .toFixed(2)}
              </span>
            </h1>
          </div>
          <button
            onClick={handleOrder}
            className="border border-neutral-600 bg-neutral-600 text-white font-heading h-12 w-full flex justify-center items-center"
            id="cartCloseBtn"
          >
            Order Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default CartDrawer;
