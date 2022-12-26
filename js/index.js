import { baseURL } from "./constants.js";
import { renderProducts } from "./modules/products.js";

async function initialLoad() {
  try {
    const fetchedProducts = await (await fetch(`${baseURL}/products`)).json();

    renderProducts(fetchedProducts);
  } catch (error) {
    console.error(error.message);
  }
}

window.onload = () => {
  initialLoad();
};
