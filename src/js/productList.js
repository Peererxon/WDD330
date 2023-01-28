export default class ProductListing {
  constructor(numCards, category, dataSource, listElement) {
    // We passed in this information to make our class as reusable as possible.
    // Being able to define these things when we use the class will make it very flexible
    this.numCards = numCards;
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
  async init() {
    // our dataSource will return a Promise...so we can use await to resolve it.
    const list = await this.dataSource.getData();
    // render the list
    this.addCards(list);
  }

  async productCardTemplate(product) {
    return `<li class="product-card">
      <a href="product_pages/index.html?product=${product.Id}&category=tents">
      <img
        src="/tents/${product.Image}"
        alt="Image of ${product.Name}"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.Name}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p></a>
    </li>`;
  }

  async addCards(list) {
    let container = document.querySelector('.product-list');

    for (let index = 0; index < this.numCards; index++) {
      const card = await this.productCardTemplate(list[index]);
      container.insertAdjacentHTML('beforeEnd', card);
    }
  }
}
