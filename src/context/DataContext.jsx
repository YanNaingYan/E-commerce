import React, { createContext, useState, useEffect } from "react";
import Swal from "sweetalert2";

export const DataContext = createContext();
const DataContextProvider = ({ children }) => {
  const [isloading, setIsloading] = useState(false);
  const [selected, setSelected] = useState(true);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [cartDrawer, setCartDrawer] = useState(false);
  const [cartBtnInfo, setCartBtnInfo] = useState({});
  const [added, setAdded] = useState({});

  useEffect(() => {
    // Initialize added state with all products set to false
    const initialAddedState = products.reduce((acc, product) => {
      acc[product.id] = false;
      return acc;
    }, {});
    setAdded(initialAddedState);
  }, [products]);

  const toggleCartDrawer = () => {
    setCartDrawer(!cartDrawer);
  };

  const handleCategory = (catName) => {
    if (catName === "All") {
      setSelected(true);
      setSelectedCategory(products); // Show all products
    } else {
      setSelected(false);
      const filteredProducts = products.filter((p) => p.category === catName);
      setSelectedCategory(filteredProducts);
    }
  };

  const changeQuantity = (id, q) => {
    setSelectedProducts(
      selectedProducts.map((p) => {
        if (p.id === id) {
          const newQuantity = p.quantity + q;
          const newCost = p.price * newQuantity;
          return { ...p, quantity: newQuantity, cost: newCost };
        } else return p;
      })
    );
  };

  const handleDelete = (id) => {
    const showSwal = () => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#525252",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          setSelectedProducts(selectedProducts.filter((p) => p.id !== id));
          setAdded((prevAdded) => {
            const newAdded = { ...prevAdded };
            delete newAdded[id];
            return newAdded;
          });
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      });
    };
    showSwal();
  };

  const handleOrder = () => {
    if (selectedProducts.length > 0) {
      const showSwal = () => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#525252",
          cancelButtonColor: "#d33",
          confirmButtonText: "Confirm",
        }).then((result) => {
          if (result.isConfirmed) {
            toggleCartDrawer();
            setSelectedProducts([]);
            setAdded(false);
            Swal.fire({
              title: "Order confirmed!",
              text: "Thanks for shoppping with us.",
              icon: "success",
              confirmButtonColor: "#525252",
              confirmButtonText: "Ok",
            });
          }
        });
      };
      showSwal();
    } else {
      Swal.fire({
        text: "There is no product in your cart",
        icon: "warning",

        confirmButtonColor: "#525252",

        confirmButtonText: "Go back",
      }).then((r) => {
        if (r.isConfirmed) {
          toggleCartDrawer();
        }
      });
    }
  };

  return (
    <DataContext.Provider
      value={{
        isloading,
        setIsloading,
        selectedCategory,
        products,
        setProducts,
        handleCategory,
        selected,
        changeQuantity,
        selectedProducts,
        cartDrawer,
        toggleCartDrawer,
        cartBtnInfo,
        setCartBtnInfo,
        setSelectedProducts,
        handleDelete,
        added,
        setAdded,
        handleOrder,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
