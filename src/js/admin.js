import auth from './admin.mjs';
function fixButton() {
  let button = document.querySelector('#submit');
  button.addEventListener('submit', (e) => {
    e.preventDefault();
    auth.login();
  });
}
function addForm() {
  let main = document.querySelector('main');
  main.innerHTML = auth.showLogin();
}
addForm();
fixButton();
