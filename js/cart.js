var cart = {};

function sendEmail() {
  if (!isEmpty(cart)) {
    alert("Корзина пуста!");
    return;
  }

  var ename = $('#ename').val().trim();
  var email = $('#email').val().trim();
  var ephone = $('#ephone').val().trim();
  

  if (!ename || !email || !ephone) {
    alert("Заполните все поля!");
    return;
  }

  var templateParams = {
    ename: ename,
    email: email,
    ephone: ephone,
    order_id: '1'
  };

  emailjs.send("service_zi09q8f", "template_w5r2dds", templateParams)
    .then(function(response) {
      console.log("SUCCESS!", response.status, response.text);
      $('#result').html("✅ Заказ успешно отправлен!");
      localStorage.removeItem('cart');
      cart = {};
      showCart();
      alert("Успешно сформирован!");
    }, function(error) {
      console.error("FAILED...", error);
      alert("Ошибка при формировании запроса!");
      $('#result').html("❌ Ошибка при отправке заказа");
    });
}



function loadCart() {
  if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
    if (!isEmpty(cart)) {
      $('.main-cart').html('<p class="text-gray-500">Корзина пуста</p>');
    } else {
      showCart();
    }
  } else {
    $('.main-cart').html('<p class="text-gray-500">Корзина пуста</p>');
  }
}

function showCart() {
  if (!isEmpty(cart)) {
    $('.main-cart').html('<p class="text-gray-500">Корзина пуста</p>');
    return;
  }
  $.getJSON('goods.json', function (data) {
    var out = '<div class="space-y-4">';
    var totalSum = 0;
    for (var id in cart) {
      var g = data[id];
      var qty = cart[id];
      var lineSum = qty * g.cost;
      totalSum += lineSum;
      out += `
        <div class="flex items-center gap-4 p-3 border rounded shadow-sm bg-white shadow-amber-950">
          <img src="images/${g.img}" class="w-20 h-20 object-cover rounded" alt="${escapeHtml(g.name)}">
          <div class="flex-1">
            <div class="font-medium">${escapeHtml(g.name)}</div>
            <div class="text-sm text-gray-500">${escapeHtml(g.description)}</div>
          </div>
          <div class="flex flex-col items-end gap-2">
            <div class="text-sm text-gray-700">${g.cost} ₽</div>
            <div class="flex items-center gap-2">
              <button data-id="${id}" class="minus-goods bg-gray-100 hover:bg-gray-200 rounded px-2">−</button>
              <span class="px-2">${qty}</span>
              <button data-id="${id}" class="plus-goods bg-gray-100 hover:bg-gray-200 rounded px-2">+</button>
            </div>
            <div class="text-sm font-semibold">${lineSum} ₽</div>
            <button data-id="${id}" class="del-goods text-red-600 text-xs mt-2">Удалить</button>
          </div>
        </div>
      `;
    }
    out += `</div>`;
    out += `<div class="mt-4 p-3 border rounded bg-gray-50 flex justify-between items-center">
              <div class="font-semibold">Итого</div>
              <div class="font-bold text-lg">${totalSum} ₽</div>
            </div>`;
    $('.main-cart').html(out);

    $('.del-goods').on('click', delGoods);
    $('.plus-goods').on('click', plusGoods);
    $('.minus-goods').on('click', minusGoods);
  }).fail(function(){ console.error('Не удалось загрузить goods.json'); });
}

function delGoods() {
  var id = $(this).data('id');
  delete cart[id];
  saveCart();
  showCart();
}

function plusGoods() {
  var id = $(this).data('id');
  cart[id] = (cart[id] || 0) + 1;
  saveCart();
  showCart();
}

function minusGoods() {
  var id = $(this).data('id');
  if (!cart[id]) return;
  if (cart[id] == 1) delete cart[id]; else cart[id]--;
  saveCart();
  showCart();
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function isEmpty(object) {
  for (var key in object) if (object.hasOwnProperty(key)) return true;
  return false;
}

function escapeHtml(str) {
  if (str === undefined || str === null) return '';
  return String(str).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/'/g,'&#39;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

$(document).ready(function () {
  loadCart();
  $('.send-email').on('click', sendEmail);
});
