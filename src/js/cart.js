import { getLocalStorage } from './utils.mjs';

export default class cartItem{
  constructor(){
    this.valid = false;
  }
  init(item){
    this.valid = true;
    this.Image = item.Image;
    this.Name = item.Name;
    this.Colors = item.Colors;
    this.Id = item.Id;
    this.FinalPrice = item.FinalPrice;
    this.data = item;
  }
  renderThisItem(){
    if (!this.valid){
      return;
    }
    let card = document.createElement("li");
    card.classList.add("cart-card");
    card.innerHTML = this.cartItemTemplate();
    document.querySelector('.product-list').appendChild(card);
  }
  cartItemTemplate() {
    if (!this.valid){
      return;
    }
    const newItem = `<a href="#" class="cart-card__image">
      <img
        src="${this.Image}"
        alt="${this.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${this.Name}</h2>
    </a>
    <p class="cart-card__color">${this.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${this.FinalPrice}</p>
    <span data-id="${this.Id}" class="removeFromCart">X</span>`;
  
    return newItem;
  }
  static getItemsFromLocalStorage(){
    const storage = getLocalStorage('so-cart');
    let cartItems = [];
    for (let i = 0; i < storage.length; i++){
      let item = new cartItem();
      item.init(storage[i]);
      cartItems.push(item);
    }
    return cartItems;
  }
  static reRenderCartContents(items) {
    const cartCards = document.querySelectorAll('.cart-card');
  
    cartCards.forEach((card) => {
      card.remove();
    });
  
    items.forEach(renderThisItem);
  }

}
let items = cartItem.getItemsFromLocalStorage();
for (let i = 0; i < items.length; i++){
  items[i].renderThisItem();
}
