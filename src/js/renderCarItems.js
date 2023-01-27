import { getLocalStorage } from './utils.mjs';

const cart = document.querySelector('#cart-items');

const cartItems = getLocalStorage('so-cart');

if (cartItems) {
  cart.textContent = cartItems.length;
}
