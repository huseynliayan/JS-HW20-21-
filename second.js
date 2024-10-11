
let urlParams = new URLSearchParams(window.location.search);
let fromPrice = parseInt(urlParams.get('from')) || 0;  // Значение "от" (минимальная цена)
let toPrice = parseInt(urlParams.get('to')) || Infinity;  // Значение "до" (максимальная цена)

// Функция для фильтрации товаров по цене
function filterGoodsByPrice(goods, from, to) {
    return goods.filter(item => item.product_price >= from && item.product_price <= to);
}

// Фильтруем товары на основе URL-параметров
let filteredGoods = filterGoodsByPrice(goods, fromPrice, toPrice);

// Функция для отображения товаров
function displayGoods(goods) {
    const productList = document.getElementById('productList');
    productList.innerHTML = ''; // Очистка списка перед отображением

    goods.forEach(item => {
        let productElement = document.createElement('div');
        productElement.innerHTML = `
            <h3>${item.product_name}</h3>
            <p>${item.product_description}</p>
            <p>Цена: ${item.product_price} AZN</p>
            <p>Магазин: ${item.store_name}</p>
            <p>Адрес: ${item.store_address}</p>
            <hr>
        `;
        productList.appendChild(productElement);
    });
}

// Отображаем отфильтрованные товары при загрузке страницы
displayGoods(filteredGoods);

// Обработчик события для кнопки фильтрации
document.getElementById('filterBtn').addEventListener('click', () => {
    let from = document.getElementById('fromPrice').value || 0;  // Получаем значение начальной цены
    let to = document.getElementById('toPrice').value || Infinity;  // Получаем значение конечной цены

    // Обновляем URL с новыми параметрами фильтра
    const newUrl = `${window.location.pathname}?from=${from}&to=${to}`;
    window.history.pushState({ path: newUrl }, '', newUrl);

    // Перезагружаем страницу, чтобы отобразить отфильтрованные товары
    window.location.reload();
});
