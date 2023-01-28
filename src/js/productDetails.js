
//fetch json
async function getProductData(id, category){
    let response = await fetch(`../json/${category}.json`);
    if (response.ok){
        let result = await response.json();
        // Same thing as array.find
        for(let i = 0; i < result.length; i++){
            if (result[i]['Id'] == id)
                return result[i];
        }
    }
    // If not found, return null
    return
}

//plug in all the values according to the json
function insertProductInfo(productInfo){
    let brandNameObject = document.querySelector('#brand-name');
    brandNameObject.textContent = productInfo['Brand']['Name'];
    
    let productNameObject = document.querySelector('#product-name');
    productNameObject.textContent = productInfo['NameWithoutBrand'];

    let productImg = document.querySelector('#product-img');
    productImg.src = productInfo['Image'];
    productImg.alt = productInfo['Name'];

    let productPrice = document.querySelector('#product-card-price');
    // There are two $ signs, one is for displaying an actual dollar sign, the other is for text formatting.
    if (productInfo['ListPrice'] > productInfo['FinalPrice']){
        productPrice.innerHTML = `<span class="productListPrice">$${productInfo['ListPrice']}</span> <span class="productFinalPrice">$${productInfo['FinalPrice']},</span>`;
    }else{
        productPrice.textContent = productInfo['FinalPrice'];
    }

    let productColorObject = document.querySelector('#product-color');
    productColorObject.textContent = productInfo['Colors']['ColorName'];

    let productDescriptionObject = document.querySelector('#product-description');
    productDescriptionObject.innerHTML = productInfo['DescriptionHtmlSimple'];

    let buttonCartObject = document.querySelector('#addToCart');
    // Use setAttribute because of the minus symbol in data-id
    buttonCartObject.setAttribute('data-id', productInfo['Id']);
    buttonCartObject.addEventListener('click', (e)=>{
        document.querySelector(".cart svg").classList.add("cart-animate");
        setTimeout(()=>{
            document.querySelector(".cart svg").classList.remove("cart-animate");
        }, 2000)
        buttonCartObject.classList.add("button-clicked");
    })
}
async function init(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const productId = urlParams.get('product');
    let productCategory = urlParams.get('category');
    let productData = await getProductData(productId, productCategory);

    insertProductInfo(productData);
}
init();
