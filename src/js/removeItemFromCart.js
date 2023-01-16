import { setLocalStorage, getLocalStorage } from './utils.mjs';

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
  console.log(
    '🚀 ~ file: removeItemFromCart.js:20 ~ removeCartHandler ~ newItems',
    newItems
  );
  // const newItems = [...items, product];
  // console.log(newItems);

  // setLocalStorage('so-cart', newItems);
}

// remove listener to Add to Cart button
const removeButtons = document.querySelectorAll('.removeFromCart');

removeButtons.forEach((button) => {
  button.addEventListener('click', removeCartHandler);
});
