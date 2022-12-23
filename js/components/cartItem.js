export const CartItem = ({ nome, valor, codigo, imagem, quantity }) => {
  const cartItemElement = document.createElement("li");

  cartItemElement.classList.add("cart__list__item");
  cartItemElement.setAttribute("data-id", codigo);

  cartItemElement.innerHTML = `
        <img src="${imagem}" alt="${nome}"/>
        <div>
            <p>${nome}</p>
            <h3>${quantity} x R$ ${valor.toFixed(2)}</h3>
            <button type="button">remover</button>
        </div>
    `;

  return cartItemElement;
};
