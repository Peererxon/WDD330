import { getLocalStorage } from './utils.mjs';

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart');

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));

  document.querySelector('.product-list').innerHTML = htmlItems;
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <span data-id="${item.Id}" class="removeFromCart">X</span>
</li>`;

  return newItem;
}

export function reRenderCartContents() {
  const cartCards = document.querySelectorAll('.cart-card');

  cartCards.forEach((card) => {
    card.remove();
  });

  renderCartContents();
}

renderCartContents();
