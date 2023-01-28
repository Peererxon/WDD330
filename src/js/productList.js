const pro = {
  Id: '880RR',
  NameWithoutBrand: 'Ajax Tent - 3-Person, 3-Season',
  Name: 'Marmot Ajax Tent - 3-Person, 3-Season',
  Image:
    '../images/tents/marmot-ajax-tent-3-person-3-season-in-pale-pumpkin-terracotta~p~880rr_01~320.jpg',

  SizesAvailable: {},
  Colors: [
    {
      ColorCode: '01',
      ColorName: 'Pale Pumpkin/Terracotta'
    }
  ],
  DescriptionHtmlSimple:
    'Get out and enjoy nature with Marmot&#39;s Ajax tent, featuring a smart design with durable, waterproof construction and two doors for easy access.',
  SuggestedRetailPrice: 300.0,
  Brand: {
    Id: '1308',
    LogoSrc: '../images/logos/marmot-160x100.jpg',
    Name: 'Marmot'
  },
  ListPrice: 199.99,
  FinalPrice: 199.99
};
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
      <a href="product_pages/index.html?product=${product.Id}">
      <img
        src="/tents/${product.Image}"
        alt="Image of ${product.Name}"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.Name}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p></a>
    </li>`;
  }

  async addCards() {
    let container = document.querySelector('.product-list');

    for (let index = 0; index < this.numCards; index++) {
      const card = await this.productCardTemplate(pro);

      container.insertAdjacentHTML('beforeEnd', card);
    }
  }
}
