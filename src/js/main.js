import {
  loadHeaderFooter,
  getLocalStorage,
  setLocalStorage,
  renderListWithTemplate,
} from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import { productCardTemplate } from "./productList.mjs";
import Alert from './alert.mjs';


loadHeaderFooter().then(() => {
  document.forms[0].addEventListener("submit", () => {
    let searchString = document.querySelector(".search-input").value;
    setLocalStorage("search-string", searchString.trim());
  });

  // check if page redirected correctly.

  if (window.location.href.includes("/product-listing/products-search.html")) {
    renderProductSearchResult();
  }
});

async function renderProductSearchResult() {
  let searchString = getLocalStorage("search-string").toLowerCase();
  const dataSource = new ExternalServices();
  const listUl = document.querySelector(".product-list");
  const titleHtml = document.querySelector(".title");

  // Get all products matching search string from database.

  let allProducts = await dataSource.findProductBySearchString(searchString);

  // render the search results.
  
  renderListWithTemplate(productCardTemplate, listUl, allProducts);
  titleHtml.innerHTML = `Showing ${allProducts.length} results for "${searchString}"`;
}

// Load the alerts
let alertList = new Alert();
alertList.create('../json/alert.json');
loadCallToAction();

function loadCallToAction(){
  // Alternatively could use the so-cart to put the alert up if they have never put anything in their cart
  let visited = getLocalStorage("visited");
  if (visited == null || visited == false){
    setLocalStorage("visited", true);
    Alert.createOneAlert("Register with us today! If you do you'll be entered into a giveway to win a free Marmot Ajax tent!")
  }
}