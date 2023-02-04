// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

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

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.insertAdjacentHTML('afterbegin', template);
  //if there is a callback...call it and pass data
  if (callback) {
    callback(data);
  }
}

async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

// function to dynamically load the header and footer into a page
export async function loadHeaderFooter() {
  //select container
  const headerElement = document.querySelector('#main-header');
  const footerElement = document.querySelector('#main-footer');

  // loading html and parsing it from html to text
  const headerTemplate = await loadTemplate('../partials/header.html');
  const footerTemplate = await loadTemplate('../partials/footer.html');
  // inserting the text into the container
  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}
