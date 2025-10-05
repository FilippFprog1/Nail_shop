var cart = {};

function init() {
  $.getJSON("goods.json", goodsOut).fail(function(){ console.error('Не удалось загрузить goods.json'); });
}

function goodsOut(data) {
  var out = '';
  for (var key in data) {
    if (!data.hasOwnProperty(key)) continue;
    var g = data[key];
    out += `
      <article class="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col shadow-amber-950">
        <img src="images/${g.img}" alt="${escapeHtml(g.name)}" class="h-60 w-full object-cover">
        <div class="p-4 flex-1 flex flex-col">
          <h3 class="text-lg font-semibold mb-1">${escapeHtml(g.name)}</h3>
          <p class="text-sm text-gray-500 mb-3 flex-1">${escapeHtml(g.description)}</p>
          <div class="mt-3 flex items-center justify-between">
            <div class="text-xl font-bold text-gray-900">${Number(g.cost).toLocaleString('ru-RU')} ₽</div>
            <button data-id="${key}" class="add-to-cart inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-3 rounded">
              Купить
            </button>
          </div>
        </div>
      </article>
    `;
  }
  $('.goods-out').html(out);
  $(document).off('click', '.add-to-cart').on('click', '.add-to-cart', addToCart);
}

function escapeHtml(str) {
  if (str === undefined || str === null) return '';
  return String(str).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/'/g,'&#39;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function addToCart() {
  var id = $(this).data('id');
  console.log('addToCart id=', id);
  if (id === undefined) return alert('Ошибка: id товара не найден');
  cart[id] = (Number(cart[id]) || 0) + 1;
  saveCart();
  updateCounter();
  renderMiniCartSummary();
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCounter() {
  var total = 0;
  for (var k in cart) {
    if (Object.prototype.hasOwnProperty.call(cart, k)) total += Number(cart[k]) || 0;
  }
  var $cnt = $('#mini-count');
  if ($cnt.length) $cnt.text(total);
  return total;
}

function renderMiniCartSummary() {
  var total = updateCounter();
  var $mini = $('.mini-cart');
  if (!$mini.length) return;
  if (total === 0) {
    $mini.html('<div class="bg-white rounded-lg shadow p-3 text-sm text-gray-600">Корзина пуста</div>');
    return;
  }
  var out = `
    <div class="bg-white rounded-lg shadow p-3">
      <div class="text-sm font-medium">В корзине: <span id="mini-count-inline">${total}</span> шт.</div>
      <div class="mt-2 flex gap-2">
        <a href="cart.html" class="bg-blue-600 text-white px-3 py-1 rounded text-sm">Перейти в корзину</a>
        <button id="mini-clear" class="text-sm text-red-600">Очистить</button>
      </div>
    </div>
  `;
  $mini.html(out);
  $('#mini-clear').on('click', function(){ cart = {}; saveCart(); renderMiniCartSummary(); updateCounter(); });
}

function loadCart() {
  if (localStorage.getItem('cart')) cart = JSON.parse(localStorage.getItem('cart'));
  else cart = {};
  updateCounter();
  renderMiniCartSummary();
}

function isEmpty(object) {
  for (var key in object) if (object.hasOwnProperty(key)) return true;
  return false;
}

$(document).ready(function () {
  init();
  loadCart();
});