import { allProductUrl } from "./utils.js";

const fetchProducts = async () => {
  const response = await fetch(allProductUrl).catch((err) => console.log(err));
  if (response) {
    return response.json();
  }
  return response;
};

export default fetchProducts;
