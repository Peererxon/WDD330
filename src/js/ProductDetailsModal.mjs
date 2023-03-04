import { initCarousel } from './utils.mjs';

export default class ProductDetailsModal {
  constructor(product) {
    this.product = product;
  }

  renderProductDetails() {
    let product_string;

    const extraImageLenght = this.product.Images.ExtraImages.length;

    if ('ExtraImages' in this.product.Images && extraImageLenght > 0) {
      product_string = `<section class="product-detail">
      <h3>${this.product.Brand.Name}</h3>
      <h2 class="divider">${this.product.NameWithoutBrand}</h2>
      <!-- slider container -->
      <div class="slider">
        <div class="slide">
           <img
            src="${this.product.Images.PrimaryMedium}"
            alt="${this.product.Name}"/>
        </div>`;

      // This loop adds the HTML to render the extra images into the image carousel
      for (let index = 0; index < extraImageLenght; index++) {
        product_string += `<div class="slide">
                              <img
                                src="${this.product.Images.ExtraImages[index].Src}"
                                alt="${this.product.Images.ExtraImages[index].Title}"
                              />
                            </div>`;
      }
      product_string += `<!-- Control buttons -->
      <button class="btn btn-next">></button>
      <button class="btn btn-prev"><</button>
    </div>`;
    } else {
      product_string = `<section class="product-detail">
      <h3>${this.product.Brand.Name}</h3>
      <h2 class="divider">${this.product.NameWithoutBrand}</h2>
      <img class="divider product_img"
        src="${this.product.Images.PrimaryMedium}"
        alt="${this.product.Name}"/>`;
    }

    //get discount to insert into product string literal
    let discount = Math.trunc(this.calc_discount());
    //create product string literal

    // Why add another suggestedRetailPrice? A variable that did this already existed. Mabey it was in the downloaded JSON.
    if (this.product.SuggestedRetailPrice != this.product.finalPrice) {
      product_string += `<p class="discount">Sale: ${discount}% Off</p>
        <p class="product-card__price">Was: <span class="productListPrice">$${this.product.SuggestedRetailPrice}</span>
         Now: <span class="productFinalPrice">$${this.product.FinalPrice}</span></p>`;
    } else {
      product_string += `<p class="product-card__price">$${this.product.FinalPrice}</p>`;
    }
    product_string += ` <p class="product__color">${this.product.Colors[0].ColorName}</p>
      <p class="product__description">${this.product.DescriptionHtmlSimple}</p>
      <div class="product-detail__add">
      <button id="addToCart" data-id="${this.productId}">Add to Cart</button>
      </div>
      </section>`;

    document.getElementById('quick-modal-product-details').innerHTML =
      product_string;

    initCarousel();
  }

  //Code to calculate discounts for products

  calc_discount() {
    return (
      100 - (this.product.ListPrice / this.product.SuggestedRetailPrice) * 100
    );
  }
}
