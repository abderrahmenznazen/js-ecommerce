 /*var modalcard = document.querySelector('.modal-lien');
 var modalbg = document.querySelector('.modalbg');

 modalcard.addEventListener('click',function () {
     modalbg.classList.add('.bg-active');
 });
({$('.card').hover(function){
     if($(this).hasClass("active")){
         $('.card .option').slideUp(function){
             $('.card').removeClass("active");
         });
     }else{
         $('.card')addClass("active");
         $('.card .option').stop().slideDown;
     }
 }));*/
let cart = document.querySelectorAll('.button');
let products = [
    {
        name: 'Pasto Matto',
        tag: 'pexels-maria-bortolotto-6241118',
        price: 25,
        inCArt: 0
    },
]
 for(let i=0 ; i < cart.length; i++){
     cart[i].addEventListener('click',()=>{
         total(products[i]);
        })
 }
 function cardNumbers(product, event){
    let productNumber = localStorage.getItem('cardNumbers')
    ProductNumber = parseInt(productNumber)
    
    let cartItems = localStorage.getItem('productsInCard')
    cartItems = JSON.parse(cartItems) 

    if(event){
        localStorage.setItem('cardNumbers', ProductNumber -1)
        document.querySelector('#cartt').innerHTML = ProductNumber -1
    }else if(ProductNumber){
        localStorage.setItem('cardNumbers', ProductNumber +1)
        document.querySelector('#cartt').innerHTML = ProductNumber +1
    }else{
        localStorage.setItem('cardNumbers', 1)
        document.querySelector('#cartt').innerHTML = 1
    }
    setItemsToStorage(product)
}
//==============================================
function onLoadShoppingCart(){
    let productNumber = localStorage.getItem('cardNumbers')
    if(productNumber){
        document.querySelector('#cartt').innerHTML = productNumber;
    }   
}

//=====================================================

function setItemsToStorage(product){
    let productNumber = localStorage.getItem('cardNumbers')
    ProductNumber = parseInt(productNumber)
    
    let cartItems = localStorage.getItem('productsInCard')
    cartItems = JSON.parse(cartItems)  
    
    if(cartItems){
        //============================= 
        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].incard = cartItems[product.tag].incard + 1
    } else {
    product.incard = 1; 
    cartItems = {
        [product.tag]: product
    }
}
localStorage.setItem('productsInCard', JSON.stringify(cartItems))
}

//==============================================================================
function total(product, event){
   let cartPrice = localStorage.getItem("total");
   
   if(event){
    cartPrice = parseInt(cartPrice)
    localStorage.setItem("total", cartPrice -  product.price)
   
   }else if(cartPrice){
    cartPrice = parseInt(cartPrice)
    localStorage.setItem("total", cartPrice +  product.price)
  
   }else{
    localStorage.setItem("total", product.price)
   }
}

//==================================================================


function displayCart(){
    let cartItems = localStorage.getItem("productsInCard")
    cartItems = JSON.parse(cartItems)
    
    let cartPrice = localStorage.getItem("total")
    cartPrice = parseInt(cartPrice)

    let productContainer = document.querySelector(".products")
    let cartCost = localStorage.getItem('total')
   
    if(cartItems && productContainer){  
        productContainer.innerHTML = ''
        Object.values(cartItems).map((item,index) => {
            productContainer.innerHTML += `
            <div class="product">  
              <img src="../images/${item.tag}.jpg">
              <span>${item.name}</span>
            </div>
            <div class="price">$${item.price},00</div>
            
            <div class="quantity">
                <ion-icon class="minus" name="remove-outline"></ion-icon>
                <span>${item.incard}</span>
                <ion-icon class="plus" name="add-outline"></ion-icon>
            </div>
            
            <div class="total">
            $${item.incard * item.price},00
            </div>
            <div class="remove">
            <ion-icon class="removed" name="close-outline"></ion-icon>
            </div>
            `
        })

        productContainer.innerHTML += `
            <div class="totalContainer">
               <h4 class="totalTiltle">
               Total </h4>
               <h4 class="shopTotal">$${cartCost},00</h4>
            </div> `;
        
       deleteProduct()
        incrementation()    
    } 
}


onLoadShoppingCart();
displayCart()