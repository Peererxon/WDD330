import auth from './admin.mjs';

function handleSubmit() {
  let form = document.querySelector('#admin-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    auth.login();
  });
}

function addForm() {
  let main = document.querySelector('main');
  main.innerHTML = auth.buildLogin();
}

addForm();

handleSubmit();
