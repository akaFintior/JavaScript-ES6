class Hamburger {
    constructor(size, stuffing) {
        this.size = size;
        this.stuffing = stuffing;
        if (this.size === 'small') {
            this.calories = 20;
            this.price = 50;
        } else {
            this.calories = 40;
            this.price = 100;
        }
        switch (this.stuffing) {
            case 'cheese':
                this.calories += 20;
                this.price += 10;
                break;
            case 'salat':
                this.calories += 5;
                this.price += 20;
                break;
            case 'chips':
                this.calories += 10;
                this.price += 15;
                break;
        }
        this.toppings = [];
    }
    addTopping(topping){
        this.toppings.push(topping);
        if (topping === 'mayo') {
            this.calories += 5;
            this.price += 20;
        } else this.price += 15;
    }
    removeTopping(topping){
        if (this.toppings.includes(topping)) {
            this.toppings.splice(this.toppings.indexOf(topping), 1);
            if (topping === 'mayo') {
                this.calories -= 5;
                this.price -= 20;
            } else this.price -= 15;
        }
    }
    getToppings(){
        console.log(`'mayo' - calories:5, price:20;
        'species' - calories:0, price:15`);
    }
    getSize(){
        console.log(`'small' - calories:20, price:50
        'large' - calories:40, price: 100`);
    }
    getStuffing(){
        console.log(`'cheese' - calories:20, price:10
        'salat' - calories:5, price:20
        'chips' - calories:10, price:15`);
    }
    calculatePrice(){
        console.log(this.price);
    }
    calculateCalories(){
        console.log(this.calories);
    }

}