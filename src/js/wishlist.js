import ShoppingCart from "./shoppingCart.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductDetails from "./ProductDetails.mjs";

const cart = new ShoppingCart("so-cart", ".product-list");
cart.renderCartContents('wishlist');

document.querySelector("#check-out").addEventListener("click", ()=>{
    debugger;
    if (document.querySelector(".product-list").children.length == 0){
        alert("You cannot add nothing to the cart!");
    }else{
        let details = new ProductDetails("", "");
        let wishlist = getLocalStorage('wishlist');
        wishlist.forEach((item)=>{
            details.addProductToCart(item, 'so-cart')
        })
    }

    setLocalStorage('wishlist',[])
    document.querySelector("#check-out-link").href = "index.html";
})