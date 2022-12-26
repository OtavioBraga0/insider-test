import { CartItem } from "../components/cartItem.js";
import { baseURL } from "../constants.js";

const cartEnvironment = {
  token: "",
};

export async function removeProductFromCart(element) {
  const id = element.target.parentNode.parentNode.getAttribute("data-id");

  const response = await fetch(
    `${baseURL}/cart/${cartEnvironment.token}/${id}`,
    {
      method: "DELETE",
    }
  );

  if (response.ok) {
    renderCart(await response.json());
  }
}

export async function renderCart(cart) {
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

export async function addProductOnCart(element) {
  const id = element.target.parentNode.getAttribute("data-id");

  const requestBody = {
    codigo: id,
    quantidade: 1,
  };

  const response = await fetch(`${baseURL}/cart/${cartEnvironment.token}`, {
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

export function toggleCart(open) {
  const cartElement = document.querySelector(".cart");
  const headerElement = document.querySelector(".header");
  if (open) {
    cartElement.classList.add("cart--opened");
    headerElement.classList.add("header--cart-opened");
  } else {
    cartElement.classList.remove("cart--opened");
    headerElement.classList.remove("header--cart-opened");
  }
}
