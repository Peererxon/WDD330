import {setLocalStorage, getLocalStorage, showCartQuantity, alertMessage} from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
      this.productId = productId;
      this.product = {};
      this.dataSource = dataSource;
      this.url = document.URL;
    }

    async init() {
      //get details for current product
      this.product = await this.dataSource.findProductById(this.productId)
    
      //render HTML with product details
      this.renderProductDetails();
    //add listener to cart button
      document.getElementById("addToCart") // Why is this so complicated? The product information is already in this.product.
      .addEventListener("click", this.addToCartHandler.bind(this));
      document.querySelector("#addToWishlist")
      .addEventListener('click', (e)=>{
        this.addToWishList(this.product);
      });

    //Code for breadcrumbs (href tags)
    const breadcrumb_element = document.getElementById("product_page_breadcrumb");
    breadcrumb_element.href = this.url;
    const product_category = this.product.Category;
    document.getElementById("list_page_breadcrumb").href = `../product-listing/index.html?category=${product_category}`;
    }

    addProductToCart(product, location='so-cart') {
      debugger;
      let cart = getLocalStorage(location);
      if (cart === null) {
        cart = [];
      }
      // adding functionality for quantity
      let item = this.handleQuantity(product, cart);
      // pushing item to cart
      if(item["newItem"]){
        cart.push(product);
      } else {
        let Id = product.Id;
        let originalItemAdded = cart.findIndex(item => item.Id === Id);
        cart[originalItemAdded].Quantity = item["newQuantity"];
      }
      setLocalStorage(location, cart);
      if (location == 'so-cart'){
        alertMessage("The item was added to your cart successfully.")
      }else{
        alertMessage(`The item was added to the ${location} successfully.`)
      }
      
    }

    handleQuantity(product, cart){
      let newItem = true;
      let newQuantity = {"Quantity": 0};
      for(let i in cart) {
        if(cart[i].Id === product.Id){
          cart[i].Quantity = parseInt(cart[i].Quantity) + 1;
          newQuantity = cart[i].Quantity;
          newItem = false;
          break;
        }
      }
      if(newItem) {
        product.Quantity = 1;
      }
      return {"newItem" : newItem, "newQuantity" : newQuantity};
    }

    async addToCartHandler(e) {
      // Color the button
      document.querySelector("#addToCart").classList.add("button-clicked");
  
      //animate icon
      this.play();
      //get product
      const product = await this.dataSource.findProductById(e.target.dataset.id);
      //add product to cart
      this.addProductToCart(product);
      //update icon superscript
      showCartQuantity();
    }

    async addToWishList(product){
      document.querySelector("#addToWishlist").classList.add("button-clicked");
      this.play('wishlist');
      this.addProductToCart(product, 'wishlist');
      showCartQuantity();
    }
    
    async removeFromCartHandler(e, location='so-cart') {
      const product = await this.dataSource.findProductById(e.target.dataset.id);
      removeProductFromCart(product, location);
      showCartQuantity();
    }

    renderProductDetails(){
      //get discount to insert into product string literal
      let discount = Math.trunc(this.calc_discount());
      //create product string literal
      let product_string =`<section class="product-detail">
      <h3>${this.product.Brand.Name}</h3>
      <h2 class="divider">${this.product.NameWithoutBrand}</h2>
      <img class="divider product_img"
        src="${this.product.Images.PrimaryMedium}"
        alt="${this.product.Name}"/>`;
        // Why add another suggestedRetailPrice? A variable that did this already existed. Mabey it was in the downloaded JSON.
      if (this.product.SuggestedRetailPrice != this.product.finalPrice){
        product_string += `<p class="discount">Sale: ${discount}% Off. You save $${Math.round(this.product.SuggestedRetailPrice - this.product.FinalPrice)} dollars!</p>
        <p class="product-card__price">Was: <span class="productListPrice">$${this.product.SuggestedRetailPrice}</span>
         Now: <span class="productFinalPrice">$${this.product.FinalPrice}</span></p>`;
      }else{
        product_string += `<p class="product-card__price">$${this.product.FinalPrice}</p>`;
      }
      product_string += ` <p class="product__color">${this.product.Colors[0].ColorName}</p>
      <p class="product__description">${this.product.DescriptionHtmlSimple}</p>
      <div class="product-detail__add">
      <button id="addToCart" data-id="${this.productId}">Add to Cart</button>
      <button id="addToWishlist" data-id="${this.productId}">Add to Wishlist</button>
      </div>
      </section>`
      
      document.getElementById("product_details").innerHTML = product_string;
    }

    //Code to calculate discounts for products

    calc_discount() {
      return 100 - this.product.ListPrice / this.product.SuggestedRetailPrice*100;
    }

    //Code for animation for cart icon
    
    play(location='so-cart') {
      let cart;
      if (location == 'so-cart'){
        cart = document.querySelector('.cart');
      }else if(location == 'wishlist'){
        cart = document.querySelector('.wish-list');
      }
      
      cart.classList.add('cart-animate');
      this.stop(location);
    }
    stop(location='so-cart') {
      let cart;
      if (location == 'so-cart'){
        cart = document.querySelector('.cart');
      }else if(location == 'wishlist'){
        cart = document.querySelector('.wish-list');
      }
      cart.addEventListener('animationend', function(){cart.classList.remove('cart-animate');});
    }
}
    




