let shop = document.getElementById('shop');
console.log(shop);

let basket= JSON.parse(localStorage.getItem("data")) || [];


let generateShope =()=>{
    return (shop.innerHTML= shopitemsdata.map((x)=>{
        let{id, name, price, img,src}=x;
        let search= basket.find((x)=> x.id === id)||[] ;
        return `  
        <div id=product-id${id} class="item">
        <span class="discount">-10%</span>
        <img wid="220" height="219"src="${img}" alt="">
        <div class="detail">
          <h3>${name}</h3>
          <div class="price">
             <h2>${price} SR</h2>
             <div class="incdec">
                <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                <div id=${id} class="quan">${search.item===undefined? 0: search.item}</div>
                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
             </div>
          </div>
        </div>
        <div class="butto">
        <a href="${src}" class=" cart-btn " style="color:white;">Learn More..</a>
        </div>
        </div>`;
    }).join(""));
};

generateShope();

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
localStorage.setItem("data",JSON.stringify(basket));
};
let update = (id) =>{
    let search = basket.find((x)=>x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calc();
};
let calc =()=>{
    let cartIcon = document.getElementById("cartamount");
    cartIcon.innerHTML = basket.map((x)=>x.item).reduce((x, y) => x + y, 0);  
};
calc();