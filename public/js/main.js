var cart = {};

function init() {
    //вывод товаров на гл. стр.
    $.getJSON("goods.json", goodsOut);
}

function goodsOut(data) {
    //вывод на страницу
    var out = '';
    for (var key in data) {
        out +=`<div class="cart">`;
        out +=`<p class="name">${data[key].name}</p>`;
        out +=`<img src="images/${data[key].img}" alt=""></img>`;
        out +=`<p class="descript">${data[key].description}</p>`;
        out +=`<div class="cost">${data[key].cost}</div>`;
        out +=`<button class="add-to-cart" data-id="${key}">Купить</button>`;
        out +=`</div>`;
    }
    $('.goods-out').html(out);
    $('.add-to-cart').on('click', addToCart);
}

function addToCart() {
    var id = $(this).attr('data-id');
    console.log(id);
    if (cart[id] == undefined) {
        cart[id] = 1;
    }
    else {
        cart[id]++;
    }
    showMiniCart();
    saveCart();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function showMiniCart() {
    //показываем мини корзину
    var out="";
    for (var key in cart) {
        out += key +' --- '+ cart[key]+'<br>';
    }
    $('.mini-cart').html(out);
}

function loadCart() {
    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
        showMiniCart();
    }
}

$(document).ready(function () {
    init();
    loadCart()
});