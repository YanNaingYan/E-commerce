import React, { useContext, useEffect } from "react";

import Layout from "./components/Layout";
import Header from "./components/Header";
import Spacer from "./components/Spacer";
import CategoryGroup from "./components/CategoryGroup";
import ProductGroup from "./components/ProductGroup";
import Footer from "./components/Footer";
import { DataContext } from "./context/DataContext";
import CartDrawer from "./components/CartDrawer";

const App = () => {
  const { cartDrawer } = useContext(DataContext);
  return (
    <div>
      <Layout>
        <Header />
        <Spacer size={100} />
        <CategoryGroup />
        <ProductGroup />
        <Footer />
        {cartDrawer && <CartDrawer />}
      </Layout>
    </div>
  );
};

export default App;
