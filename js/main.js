const products = [
    {id: 1, title: 'Notebook', price: 2000},
    {id: 2, title: 'Mouse', price: 30},
    {id: 3, title: 'Keyboard', price: 55},
    {id: 4, title: 'Gamepad', price: 75},
];

const renderProduct = (title, price) => {
    return `<div class="product-item">
                <h3>${title}</h3>
                <p>${price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
};


  // чтобы сократить функцию, избавимся от необходимости создавать переменную, которую сразу же присваиваем
  // теперь функция выполняет лишь одну операцию, можно избавиться от фигурных скобок

const renderPage = list => document.querySelector('.products').innerHTML = list.map(item => renderProduct(item.title, item.price)).join('');
  // list.map - возвращает новый массив, в котором элементы будут разделены запятой, дабы избежать этого
  // следует сменить разъединитель элементов на пустую строку при помощи метода join()

renderPage(products);