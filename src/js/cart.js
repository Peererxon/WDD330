import { getLocalStorage } from './utils.mjs';

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart');

  if (cartItems) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));

    document.querySelector('.product-list').innerHTML = htmlItems;

    setTotalCart(cartItems);
  }
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

function setTotalCart(items) {
  const cartFooter = document.querySelector('#cart-footer');

  if (!items || items.length === 0) {
    cartFooter.classList.add('hide');
    return;
  }

  const totalPrice = items.reduce(
    (accumulator, currentValue) => accumulator + currentValue.ListPrice,
    0
  );

  const totalPriceCart = document.querySelector('#cart-total');

  cartFooter.classList.remove('hide');

  totalPriceCart.textContent = `Total: $${totalPrice}`;
}
renderCartContents();
