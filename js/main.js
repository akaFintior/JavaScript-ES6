const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

let httpGet = url => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = () => {
      if (this.readyState !== 4) return;
      if (this.status == 200){
          resolve(this.response);
      } else {
          let error = new Error(this.statusText);
          error.code = this.status;
          reject(console.log(error));
      }
    }
    xhr.send();
  });
}

class Cart {
  constructor(container = '.cart'){
    this.container = container;
    this.data = [];
    this.products = [];
    this.price = 0;
    this._getProducts()
      .then(() => this._render())
  }
  _countCartTotal() {
    this.price = 0;
    for (let item of this.products){
        this.priceTotal += item.price*item.quantity;
    }
    return this.priceTotal;
  }
  _render(){
    const block = document.querySelector(this.container);
    for (let item of this.data){
        const product = new ItemInCart(item);
        this.products.push(product);
        block.insertAdjacentHTML('beforeend', product.render());
    }
  }
  _getProducts(){
    return fetch(`${API}/getBasket.json`)
        .then(result => result.json())
        .then(data => {
          this.data = [...data.contents];
          this.price = data.amount;
        })
        .catch(error => console.log(error));
  }
  _addToCart(product){}
  _removeItem(product){} 
}


class ItemInCart {
  constructor(product, img = `https://placehold.it/60x60`){
    this.product_name = product.product_name; 
    this.price = product.price;
    this.quantity = product.quantity;
    this.img = img;
  }
  render(){
    return `<div class="cart-item">
               <img src="${this.img}" alt="${this.product_name}">
               <div class="desc">
                   <h3>${this.product_name}</h3>
                   <p>${this.price}</p>
                   <p>${this.quantity}</p>
               </div>
               <div class="remove">x</div>
           </div>`
  }
}

class ProductsList {
  constructor(container = '.products'){
      this.container = container;
      this.data = [];
      this.allProducts = [];
      this._getProducts()
        .then(() => this._render());
  }
  countProductsListTotal(){
      this.priceTotal = 0;
      for (let item of this.allProducts){
          this.priceTotal += item.price;
      }
      return this.priceTotal;
  }
  _getProducts(){
      return fetch(`${API}/catalogData.json`)
        .then(result => result.json())
        .then(data => {
          this.data = [...data];
        })
        .catch(error => console.log(error));
  }
  // _fetchProducts(){
  //     this.data = [
  //         {id: 1, title: 'Notebook', price: 2000},
  //         {id: 2, title: 'Mouse', price: 30},
  //         {id: 3, title: 'Keyboard', price: 55},
  //         {id: 4, title: 'Gamepad', price: 65},
  //     ];
  // }
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
      this.id_product = product.id_product;
      this.product_name = product.product_name
      this.price = product.price;
      this.img = img;
  }
  render(){
      return `<div class="product-item">
               <img src="${this.img}" alt="${this.product_name}">
               <div class="desc">
                   <h3>${this.product_name}</h3>
                   <p>${this.price}</p>
                   <button class="buy-btn">Купить</button>
               </div>
           </div>`
  }
}

const products = new ProductsList();
const cart = new Cart();
document.querySelector('.btn-cart').addEventListener('click', () => {
  document.querySelector('.cart').toggleAttribute('hidden');
})