// global imports
import "./src/toggleSidebar.js";
import "./src/cart/toggleCart.js";
import "./src/cart/setupCart.js";

import "./src/utils.js";
import fetchProducts from "./src/fetchProducts.js";
import { setupStore, store } from "./src/store.js";
import { getElement } from "./src/utils.js";
import display from "./src/displayProducts.js";

const init = async () => {
  const products = await fetchProducts();

  if (products) {
    setupStore(products);
    const featured = store.filter((product) => product.featured === true);
    display(featured, getElement(".featured-center"));
  }
};

window.addEventListener("DOMContentLoaded", init);
