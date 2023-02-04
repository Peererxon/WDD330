import { setLocalStorage, getLocalStorage } from './utils.mjs';
import cartItem from './cart';

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

  let items = cartItem.getItemsFromLocalStorage();

  if (!items) {
    return;
  }

  let newItems = [];
  for (let i = 0; i < items.length; i++){
    if (items[i].data == itemId){
      newItems.push(items[i].data)
    }
  }

  setLocalStorage('so-cart', newItems);
  let cards = cartItem.getItemsFromLocalStorage();
  cartItem.reRenderCartContents(cards);
  addRemoveEvent();
}

addRemoveEvent();
