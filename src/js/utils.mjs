import Alert from './alert.mjs';

// wrapper for querySelector...returns matching element

export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// retrieve data from localstorage

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click

export function setClick(selector, callback) {
  qs(selector).addEventListener('touchend', (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener('click', callback);
}

export function getParams(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = 'afterbegin',
  clear = false
) {
  const ListArrayHtml = list.map(templateFn);
  if (clear) {
    parentElement.innerHTML = '';
  } else {
    parentElement.insertAdjacentHTML(position, ListArrayHtml.join(''));
  }
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.insertAdjacentHTML('afterbegin', template);
  if (callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  let response = await fetch(path);
  if (response.ok) {
    let text = await response.text();
    return text;
  } else {
    throw new Error('Failed to load path.');
  }
}

export async function loadHeaderFooter() {
  let headerContent = await loadTemplate('/partials/header.html');
  let footerContent = await loadTemplate('/partials/footer.html');
  let headerElement = document.querySelector('header');
  let footerElement = document.querySelector('footer');
  renderWithTemplate(headerContent, headerElement);
  renderWithTemplate(footerContent, footerElement);
  showCartQuantity();
}

// function to Add a superscript number of items
// in the cart to the backpack icon.

export function showCartQuantity() {
  let new_cart = getLocalStorage('so-cart');

  // select the div element I (prince) added to the all the html docs.

  let cartQuantityElement = document.querySelector('#cart-items-number');

  // Set the superscript to the number of items in the cart 'IF'there is an item in the cart.

  if (new_cart) {
    let quantity = 0;
    for (let i in new_cart) {
      quantity += new_cart[i].Quantity;
    }
    cartQuantityElement.textContent = quantity;
    cartQuantityElement.style.display = 'block';
  } else {
    cartQuantityElement.style.display = 'none';
  }
}

//Alert classes and functions.
export function alertMessage(message, scroll = true) {
  // Wrapper for createOneAlert from the Alert class
  let options = {};
  options.scroll = scroll;
  Alert.createOneAlert(message, options);
}
