let label =document.getElementById('label');
let shoppingcart =document.getElementById('shoppingcart');

let basket= JSON.parse(localStorage.getItem("data")) || [];



let calc =()=>{
    let cartIcon = document.getElementById("cartamount");
    cartIcon.innerHTML = basket.map((x)=>x.item).reduce((x, y) => x + y, 0);  
};
calc();

let generatecartitems =()=>{
    //cas1 ; if we have items in cart...
    if(basket.length !== 0){
        return (shoppingcart.innerHTML = basket.map((x) => {
        
            let {id, item} = x;
            let search =shopitemsdata.find((y) => y.id === id) ||[];
            let {img,name,price}=search;
            return `
            <div class="cart-item">
            <img width="100" src="${img}" alt="">
            <div class="details">

            <div class="title-price-x">
            <h4 class="title-price">
            <p>${name}</p>
            <p class="cart-item-price">${price}SR</p>
            </h4>
              <i onclick="removeitem(${id})" class="bi bi-x-lg"></i>
            </div>
              <div class="incdec">
                <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                <div id=${id} class="quan">${item}</div>
                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
              </div>

            <h3 class="pr">${item*price}SR</h3>
            
            </div>
            </div>
            `;
        }).join(""));
    }
    else{
        shoppingcart.innerHTML= ``;
        label.innerHTML =`
        <h1>Cart is Empty</h1>
        <a href="htmlcode.html">
        <button class="homebtn">Back to Home</button>
        </a> `;
    }
    //case2 ; if we dont have items in cart...
};
generatecartitems();

let increment = (id) => {
    let selecteditem=id;
    let search = basket.find((x) => x.id === selecteditem.id)
if(search === undefined){
     basket.push({
        id:selecteditem.id,
        item: 1,
     });
}
else{
    search.item += 1;
} 
localStorage.setItem("data",JSON.stringify(basket));
generatecartitems();
    update(selecteditem.id);
};
let decrement = (id) => {
    let selecteditem=id;
    let search = basket.find((x) => x.id === selecteditem.id)
    if(search=== undefined)return;
    else if(search.item === 0)return;
    else{
    search.item -= 1;
} 
update(selecteditem.id);
basket = basket.filter((x)=>x.item !==0);
generatecartitems();
localStorage.setItem("data",JSON.stringify(basket));
};
let update = (id) =>{
    let search = basket.find((x)=>x.id === id);
    //console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calc();
    totalamount();
}; 
let removeitem =(id)=>{
 let selecteditem =id;
 //console.log(selecteditem.id);
 basket= basket.filter((x) => x.id !== selecteditem.id);
 generatecartitems();
 totalamount();
 calc();
 localStorage.setItem("data",JSON.stringify(basket));
};
let clearcart=()=>{
basket =[]
generatecartitems();
calc();
localStorage.setItem("data",JSON.stringify(basket));
};
let totalamount = ()=>{
    if(basket.length!==0){
        let amount =basket.map((x) => {
            let {item,id}=x;
            let search =shopitemsdata.find((y) => y.id === id) ||[];
            return item*search.price;
        })
        .reduce((x,y)=>x+y,0);
        label.innerHTML = `
         <h2>Total bill : ${amount}SR</h2>
         <button class="checkout">Checkout</button>
         <button onclick="clearcart()" class="removeall">Clear Cart</button> `;
    } else return;
};
totalamount();
