import { CartItem } from "./components/cartItem.js";
import { Product } from "./components/product.js";

const baseURL =
  "https://us-central1-insider-integrations.cloudfunctions.net/cart-api-fullstack-test";
const cartEnvironment = {
  token: "",
};

async function removeProductFromCart(element) {
  const id = element.target.parentNode.parentNode.getAttribute("data-id");

  const response = await fetch(`${baseURL}/cart/${cartToken}/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    remderCart(await response.json());
  }
}

async function renderCart(cart) {
  const { itens_total, valor_total, products } = cart;
  if (itens_total) {
    const mountedCart = `
        <div>
            <img src="../assets/icons/bag.svg" alt="Bag Icon"/>
            <h2>sua cesta tem ${
              itens_total === 1 ? `1 item` : `${itens_total} itens`
            }</h2>
        </div>
        <ul class="cart__list">
        </ul>
        <button type="button">total: R$ ${valor_total.toFixed(2)}</button>
    `;

    document.querySelector(".cart").innerHTML = mountedCart;

    const cartListElement = document.querySelector(".cart__list");

    products.forEach((cartItem) => {
      const cartItemElement = CartItem(cartItem);

      cartItemElement
        .querySelector("button")
        .addEventListener("click", removeProductFromCart);

      cartListElement.appendChild(cartItemElement);
    });
  } else {
    const emptyCart = `
        <img src="./assets/icons/bag.svg" alt="Bag Icon" />
        <h3>
            sua cesta está vazia.<br />
            adicione um produto. :)
        </h3>
    `;

    const cartElement = document.querySelector(".cart");
    cartElement.innerHTML = emptyCart;
    cartElement.classList.add("cart--empty");
  }
}

async function addProductOnCart(element) {
  const id = element.target.parentNode.getAttribute("data-id");

  const requestBody = {
    codigo: id,
    quantidade: 1,
  };

  const response = await fetch(`${baseURL}/cart/${cartToken}`, {
    headers: { "Content-type": "application/json; charset=UTF-8" },
    method: "POST",
    body: JSON.stringify(requestBody),
  });

  if (response.ok) {
    const cartInformation = await response.json();

    cartEnvironment.token = cartInformation.token;
    document.querySelector(".cart").classList.remove("cart--empty");
    renderCart(cartInformation);
  }
}

async function initialLoad() {
  try {
    const fetchedProducts = await (await fetch(`${baseURL}/products`)).json();

    const productsElement = document.querySelector(".products");

    fetchedProducts.forEach((product) => {
      const productItem = Product(product);
      productsElement.appendChild(productItem);
      productItem
        .querySelector("button")
        .addEventListener("click", addProductOnCart);
    });
  } catch (error) {
    console.error(error.message);
  }
}

window.onload = () => {
  initialLoad();
};
