import { getLocalStorage } from './utils.mjs';

const cart = document.querySelector('#cart-items');

const cartItems = getLocalStorage('so-cart');

const cartItemsCounter = cartItems.length;

cart.textContent = cartItemsCounter;
