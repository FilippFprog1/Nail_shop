var cart = {};
function loadCart() {
    //загрузка корзины
    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
        if (!isEmpty(cart)) {
            $('.main-cart').html('Корзина пуста');
        }
        else {
            showCart();
        }
    }
    else {
        $('.main-cart').html('Корзина пуста');
    }
}

function showCart() {
    //вывод корзины
    if (!isEmpty(cart)) {
            $('.main-cart').html('Корзина пуста');
    }
    else { 
        $.getJSON('goods.json', function (data) {
        var goods = data;
        var out = '';
        for (var id in cart) {
            out += `<button data-id=${id} class="del-goods">-</button>`
            out += `<img src="images/${goods[id].img}">`;
            out += `${goods[id].name}`;
            out += `<p>${cart[id]}</p>`;
            out +=`<div class="cost">${goods[id].cost}</div>`;
            out +=`<br>`;
        }
        $('.main-cart').html(out);
        $('.del-goods').on('click', delGoods);
        });
    }
}

function delGoods() {
    //удаляем товар из корзины
    var id = $(this).attr('data-id');
    delete cart[id];
    saveCart();
    showCart();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function isEmpty(object) {
    //проверка корзины на пустоту
    for (var key in object)
    if (object.hasOwnProperty(key)) return true;
    return false;
}

$(document).ready(function () {
    loadCart();
});