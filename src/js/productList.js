
async function createCard(data, category){
    let newCard = document.createElement("li");
    let cardLink = document.createElement("a");
    // Put in code here for the link
    cardLink.href = `../product_pages/index.html?product=${data['Id']}&category=${category}`;
    let cardImage = document.createElement("img");
    let response = await fetch(data["Image"]);
    if (!response.ok){
        throw "Bad image url!";
        // This will be caught in addCards, will also throw an error if some other data is missing
    }
    let blobber = await response.blob();
    cardImage.src = URL.createObjectURL(blobber);
    cardImage.alt = data["Name"];
    cardLink.appendChild(cardImage);

    let cardBrand = document.createElement("h3");
    cardBrand.classList.add("card__brand");
    cardBrand.textContent = data["Brand"]["Name"];
    cardLink.appendChild(cardBrand);

    let cardName = document.createElement("h2");
    cardName.classList.add("card__name");
    cardName.textContent = data["Name"];
    cardLink.appendChild(cardName);

    let cardPrice = document.createElement("p");
    if (data["ListPrice"] != data["FinalPrice"]){
        let span1 = document.createElement("span");
        let span2 = document.createElement("span");
        let span3 = document.createElement("span");
        span1.textContent = data["ListPrice"];
        span1.classList.add("productListPrice");
        span2.textContent = data["FinalPrice"];
        span2.classList.add("productFinalPrice");
        let percentoff = Math.round((1- (data["FinalPrice"] / data["ListPrice"]))*100);
        span3.textContent = ` ${percentoff}% off!`
        cardPrice.appendChild(span1);
        cardPrice.appendChild(span2);
        cardPrice.appendChild(span3);
    }else{
        cardPrice.textContent = data["FinalPrice"];
    }
    cardPrice.classList.add("product-card__price");
    cardLink.appendChild(cardPrice);

    newCard.appendChild(cardLink);
    newCard.classList.add("product-card");
    return newCard;
}

async function addCards(numCards, type){
    let container = document.querySelector(".product-list");
    let cardsFinished = 0;
    let response = await fetch("../json/"+type+".json")
    var cards = [];
        if (response.ok){
            let result = await response.json();
            // I would use a forEach here but the callback screws with the async/await
             for (let i = 0; i < result.length; i+= 1){
                try{
                    cards.push(await createCard(result[i], type));
                }catch{
                    // Don't need to do anything
                }
            }
            // Can sort the cards if you like, would need sales statistics or something like that
            /*cards.sort((card) =>{
                return -1 for the item to be first, and 1 to be last. 
            })*/
            for (let i = 0; i < cards.length && cardsFinished < numCards; i++){
            
                container.appendChild(cards[i]);
                cardsFinished += 1;
            }
        }
        
}

let NUMCARDS = 4;
let PRODUCT_TYPE = "tents";
// Change these parameters to get different types of products, or different cards.
// Product type should be the name of the file, minus the file extension. (Needs to be a .json!)
addCards(NUMCARDS, PRODUCT_TYPE);