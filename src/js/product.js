import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  if(getLocalStorage("so-cart")){
    let storage = getLocalStorage("so-cart");
    storage.push(product);
    setLocalStorage("so-cart", storage);
  }else{
    setLocalStorage("so-cart", [product]);
  }
  
  
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
