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
            out += `<div class = "cart-out">`;
            out += `<button data-id=${id} class="del-goods">(-)</button>`;
            out += `<img src="images/${goods[id].img}">`;
            out += `\n${goods[id].name}`;
            out += `<button data-id=${id} class="minus-goods">-</button>`;
            out += `\n${cart[id]}`;
            out += `<button data-id=${id} class="plus-goods">+</button>`;
            out += `\n${cart[id]*goods[id].cost}`;
            out +=`<br>`;
            out += `</div>`;
        }
        $('.main-cart').html(out);
        $('.del-goods').on('click', delGoods);
        $('.plus-goods').on('click', plusGoods);
        $('.minus-goods').on('click', minusGoods);
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

function plusGoods() {
    //добавляем товар в корзину
    var id = $(this).attr('data-id');
    cart[id]++;
    saveCart();
    showCart();
}

function minusGoods() {
    //удаляем товар из корзины по штучно
    var id = $(this).attr('data-id');
    if (cart[id] == 1) {
        delete cart[id];
        saveCart();
        showCart();
    }
    else {
        cart[id]--;
        saveCart();
        showCart();
    }
    
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

function sendEmail() {
    var ename = $('#ename').val();
    var email = $('#email').val();
    var ephone = $('#ephone').val();
    if (ename!='' && email!='' && ephone!='') {
        if (isEmpty(cart)) {
            $.post(
                "core/mail.php",
                {
                    "ename": ename,
                    "email": email,
                    "ephone": ephone,
                    "cart": cart
                },
                function(data){
                    console.log(data);
                }
            );
        }
        else {
            alert("Корзина пуста!");
        }
    }
    else {
        alert("Заполните поля");
    }
}

$(document).ready(function () {
    loadCart();
    $('.send-email').on('click', sendEmail); //отправить письмо с заказом

});