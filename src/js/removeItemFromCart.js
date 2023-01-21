import { setLocalStorage, getLocalStorage } from './utils.mjs';
import { reRenderCartContents } from './cart';

const addRemoveEvent = () => {
  // remove listener to Add to Cart button
  const removeButtons = document.querySelectorAll('.removeFromCart');

  removeButtons.forEach((button) => {
    button.addEventListener('click', removeCartHandler);
  });
};

// add to cart button event handler
async function removeCartHandler(e) {
  const itemId = e.target.getAttribute('data-id');

  const items = getLocalStorage('so-cart');

  if (!items) {
    return;
  }

  const newItems = items.filter((item) => item.Id !== itemId);

  setLocalStorage('so-cart', newItems);

  reRenderCartContents();

  addRemoveEvent();
}

addRemoveEvent();
// Clicking the X buton will remove all tents of the same id, which looks wierd on the page, but they probably shouldn't have been added in the first place.