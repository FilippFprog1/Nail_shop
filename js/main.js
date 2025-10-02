function init() {
    //вывод товаров на гл. стр.
    $.getJSON("goods.json", goodsOut);
}

function goodsOut(data) {
    //вывод на страницу
    console.log(data);
    var out = '';
    for (var key in data) {
        out +=`<div class="cart">`;
        out +=`<p class="name">${data[key].name}</p>`;
        out +=`<img src="images/${data[key].img}" alt=""></img>`;
        out +=`<p class="descript">${data[key].description}</p>`;
        out +=`<div class="cost">${data[key].cost}</div>`;
        out +=`<button class="add-to-cart">Купить</button>`;
        out +=`</div>`;
    }
    $('.goods-out').html(out);
}

$(document).ready(function () {
    init();
});