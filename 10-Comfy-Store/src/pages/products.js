// global imports
import "../toggleSidebar.js";
import "../cart/setupCart.js";
import "../cart/toggleCart.js";

import display from "../displayProducts.js";
import fetchProducts from "../fetchProducts.js";
import setupCompanies from "../filters/companies.js";
import setupPrice from "../filters/price.js";
import setupSearch from "../filters/search.js";
import { setupStore, store } from "../store.js";
import { getElement } from "../utils.js";

const init = async () => {
  const loading = getElement(".page-loading");
  if (store.length < 1) {
    const products = await fetchProducts();
    setupStore(products);
  }
  display(store, getElement(".products-container"));

  loading.style.display = "none";

  setupSearch(store);
  setupCompanies(store);
  setupPrice(store);
};

init();
