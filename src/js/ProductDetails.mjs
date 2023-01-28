// I can't think of a world where this class is useful, but I'm making it to satisfy the requirements. And golly bob howdy, i'm gonna make this think look good regardless.
export class Product{
    constructor(){
        this.valid = false;
    }
    init(data){
        try{
            this.data = data
            this.id = data['Id'];
            this.name = data['Name'];
            this.imagesrc = data["Image"];
            this.description = data["DescriptionHtmlSimple"];
            this.firstColor = data["Colors"][0]["ColorName"];
            this.listPrice = data["ListPrice"];
            this.finalPrice = data["FinalPrice"];
            this.link = `../product_pages?product=${this.id}`
            this.valid = true;
        }catch{
            return
        }
    }
    addProductToCart() {
        if (!this.valid)
            return
        const items = getLocalStorage('so-cart');
        if (!items) {
          const item = [];
          item.push(this.data);
          setLocalStorage('so-cart', item);
          return;
        }
        const newItems = [...items, this.data];
        setLocalStorage('so-cart', newItems); 
    }
    generateHtml(){
        if(!this.valid)
            return
        let priceHtml = "";
        if (this.listPrice != this.finalPrice){
            priceHtml = `<span class="productListPrice">$${this.listPrice}</span> <span class="productFinalPrice">$${this.finalPrice},</span>`
        }else{
            priceHtml = `$${this.finalPrice}`;
        }
        return `
        <a href="${this.link}" class="default-product-image">
          <img
            src="${this.imagesrc}"
            alt="${this.name}"
          />
        </a>
        <a href="${this.link}" class="default-product-name">
          <h2>${this.name}</h2>
        </a>
        <p class="default-product-color">${this.firstColor}</p>
        <p class="default-product-price">${priceHtml}</p>`
    }
}
export async function getProductData(id){
    const PRODUCTTYPES = ["tents", "backpacks", "sleeping-bags"]
    PRODUCTTYPES.forEach(async (category)=>{
        let response = await fetch(`../json/${category}}.json`)
        let result = await response.json();
        result.forEach((product)=>{
            if (product["Id"] == id)
                return product
        })
    })
    return null
}