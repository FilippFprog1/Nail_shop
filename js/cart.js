var cart = {};
function loadCart() {
    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
        showCart();
    }
    else {
        $('.main-cart').html('Корзина пуста');
    }
}

function showCart() {
    $.getJSON('goods.json', function (data) {
        var goods = data;
        var out = '';
        for (var id in cart) {
            out += `<button data-id=${id} class="del-goods">-</button>`
            out += `<img src="images/${goods[id].img}">`;
            out += `${goods[id].name}`;
            out += `${cart[id]}`;
            out +=`<div class="cost">${goods[id].cost}</div>`;
            out +=`<br>`;
        }
        $('.main-cart').html(out);
        $('.del-goods').on('click', delGoods);
    });
}

function delGoods() {
    var id = $(this).attr('data-id');
    delete cart[id];
    saveCart();
    showCart();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

$(document).ready(function () {
    loadCart();
});