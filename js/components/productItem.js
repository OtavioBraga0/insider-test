export const ProductItem = ({ imagem, nome, valor, codigo }) => {
  const productElement = document.createElement("div");

  productElement.classList.add("products__item");
  productElement.setAttribute("data-id", codigo);

  productElement.innerHTML = `
    <img src="${imagem}" alt="${nome}" />
    <h3>${nome}</h3>
    <h2>R$ ${valor.toFixed(2).replace(".", ",")}</h2>
    <button type="button"> adicionar </button>
  `;

  return productElement;
};
