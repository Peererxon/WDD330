import { renderListWithTemplate } from "./utils.mjs";

export function productCardTemplate(product) {
    //Use destructoring to enable readable code and pull specific properties from our object
    const {Id, Images, Name, ListPrice, NameWithoutBrand} = product;
    return `<li class="product-card">
    <a href="/product_pages/index.html?product=${Id}">
      <img
        src="${Images.PrimarySmall}"
        alt="Image of ${NameWithoutBrand}"
      />
      <h3 class="card__brand">${Name}</h3>
      <h2 class="card__name">${NameWithoutBrand}</h2>
      <p class="product-card__price">$${ListPrice}</p></a>
  </li>`
}

export default class productList {
// class to generate list of product card in HTML from an array.
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
        this.url = document.URL;
    }

    async init(options = {}) {
      // See filterProductList for a specification of the options object
        let productList = await this.dataSource.getData(this.category);
        productList = this.filterProductList(productList, options);
        this.renderList(productList);
        document.querySelector(".title").innerHTML = this.category[0].toUpperCase() + this.category.substring(1)
        
        //Code for breadcrumbs (product quantity in the list)

        const product_quantity = productList.length;
        const quantity_element = document.getElementById("quantity");
        quantity_element.innerHTML = `Product Category > ${product_quantity} items`;
        quantity_element.href = this.url;
      }


    renderList(productList) {
        renderListWithTemplate(productCardTemplate, this.listElement, productList)
    }

    filterProductList(list, options) {
      /* All options are whitelist style, that is everything is excluded but the options with property, if property exists
      options:
      {
        Brand: BrandID. any product whose Brand whose .Id matches this.
        Color: ColorCode. any product whose has a color whose ColorCode is an exact match to this
        PriceMinimum: float. any product whose price is greater than or equal to PriceMinimum
        PriceMaximum: float. any product whose price is less than or equal to PriceMaximum
        IsClearance: boolean. any product whose IsClearance matches IsClearance
        IsNew: boolean. any product whose IsNew matches IsNew
        IsFamousBrand: boolean. any product whose IsFamousBrand matches IsFamousBrand
      }
      This will not filter items if that property doesn't exist
       */
      if (options.Brand != null){
        list.filter((item)=>{
          item.Brand.Id == options.Brand;
        })
      }
      if (options.Color != null){
        list.filter((item)=>{
          for (let color of item.Colors){
            if (color.ColorCode == options.Color){
              return true;
            }
          }
          return false;
        })
      }
      if (options.PriceMinimum != null){
        list.filter((item)=>{
          item.FinalPrice >= options.PriceMinimum
        })
      }
      if (options.PriceMaximum != null){
        list.filter((item)=>{
          item.FinalPrice <= options.PriceMaximum
        })
      }
      if (options.IsClearance != null){
        list.filter((item)=>{
          item.IsClearance == options.IsClearance
        })
      }
      if (options.IsNew != null){
        list.filter((item)=>{
          item.IsNew == options.IsNew
        })
      }
      if (options.FamousBrand != null){
        list.filter((item)=>{
          item.IsFamousBrand == options.IsFamousBrand
        })
      }
      return list;
    }
}

