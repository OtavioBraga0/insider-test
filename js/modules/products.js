import { ProductItem } from "../components/productItem.js";
import { addProductOnCart } from "./cart.js";

export function renderProducts(products) {
  const productsElement = document.querySelector(".products");

  products.forEach((product) => {
    const productItem = ProductItem(product);
    productsElement.appendChild(productItem);
    productItem
      .querySelector("button")
      .addEventListener("click", addProductOnCart);
  });
}
