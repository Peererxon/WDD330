import { setLocalStorage, getLocalStorage } from './utils.mjs';
import { reRenderCartContents } from './cart';
// add to cart button event handler
async function removeCartHandler(e) {
  const itemId = e.target.getAttribute('data-id');

  const items = getLocalStorage('so-cart');

  // if (!items) {
  //   const item = [];

  //   item.push(product);

  //   setLocalStorage('so-cart', item);

  //   return;
  // }

  const newItems = items.filter((item) => item.Id !== itemId);

  setLocalStorage('so-cart', newItems);

  reRenderCartContents();
}

// remove listener to Add to Cart button
const removeButtons = document.querySelectorAll('.removeFromCart');

removeButtons.forEach((button) => {
  button.addEventListener('click', removeCartHandler);
});
