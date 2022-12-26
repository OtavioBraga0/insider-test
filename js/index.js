import { baseURL } from "./constants.js";
import { toggleCart } from "./modules/cart.js";
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

  document
    .querySelector(".header__cart--mobile")
    .addEventListener("click", () => toggleCart(true));

  document
    .querySelector(".header__back--mobile")
    .addEventListener("click", () => toggleCart(false));
};
