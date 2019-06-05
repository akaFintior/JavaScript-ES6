class Cart {
  constructor(container = '.cart'){
    this.container = container;   // контейнер, где будет отображаться корзина на странице(по умолчанию: cart)
    this.products = [];           // продукты, которые будут в корзине
    this.price = 0;               // общая цена всех продуктов
  }
  countCartTotal() {}   // посчитать сумму всех продуктов в корзине
  render(){}            // корзину надо будет отобразить  на странице
}


class ItemInCart {
  constructor(product, quantity){
    this.title = product.title;     // название продукта в корзине 
    this.price = product.price;     // цена продукта в корзине
    this.quantity = quantity;       // количество одних и тех же продуктов в корзине
  }
  render(){}            // продукт в корзине так же надо отобразить
}


class ProductsList {
  constructor(container = '.products'){
      this.container = container;
      this.data = [];
      this.allProducts = [];
      this.init();
      this.countProductsListTotal();
  }
  init(){
      this._fetchProducts();
      this._render();
  }
  countProductsListTotal(){
      this.priceTotal = 0;
      for (let item of this.allProducts){
          this.priceTotal += item.price;
      }
      console.log(this.priceTotal);
  }
  _fetchProducts(){
      this.data = [
          {id: 1, title: 'Notebook', price: 2000},
          {id: 2, title: 'Mouse', price: 30},
          {id: 3, title: 'Keyboard', price: 55},
          {id: 4, title: 'Gamepad', price: 65},
      ];
  }
  _render(){
      const block = document.querySelector(this.container);
      for (let item of this.data){
          const product = new ProductItem(item);
          this.allProducts.push(product);
          block.insertAdjacentHTML('beforeend', product.render());
      }
  }
}

class ProductItem {
  constructor(product, img = `https://placehold.it/200x150`){
      this.id = product.id;
      this.title = product.title;
      this.price = product.price;
      this.img = img;
  }
  render(){
      return `<div class="product-item">
               <img src="${this.img}" alt="${this.title}">
               <div class="desc">
                   <h3>${this.title}</h3>
                   <p>${this.price}</p>
                   <button class="buy-btn">Купить</button>
               </div>
           </div>`
  }
}

const products = new ProductsList();