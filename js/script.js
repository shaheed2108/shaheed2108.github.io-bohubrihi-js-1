
let cartInput = document.querySelectorAll(".cartBtn");

let addList = document.querySelector("#cart-list")






// event Listener

cartInput.forEach(function (cart) {
    cart.addEventListener("click", addCart)
});


addList.addEventListener("click", removeListItem);



// class Product

class Product {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
}

// UI class

class UI {

    static cartList(item) {
        let row = document.createElement("tr");

        row.innerHTML = `
    <td>${item.title}</td>
    <td>${item.price}</td>
    
    <td><a href="#" class="delete"> remove </a></td>`;

        addList.appendChild(row);
    }

    static deleteList(target) {
        if (target.hasAttribute("href")) {
            target.parentElement.parentElement.remove();
            Store.removeCartItem(target.parentElement.previousElementSibling.previousElementSibling.textContent.trim());

        }
    }

    }


//Local Storage class

class Store {
    static getProduct() {
        let products;
        if (localStorage.getItem("products") === null) {
            products = [];
        } else {
            products = JSON.parse(localStorage.getItem("products"));
        }
        return products;
    }

    static addProduct(product) {
        let products = Store.getProduct();
        products.push(product);

        localStorage.setItem("products", JSON.stringify(products));
    }

    static displayProduct() {
        let products = Store.getProduct();

        products.forEach(product => {
            UI.cartList(product);
        });
    }

    static removeCartItem(title) {
        let products = Store.getProduct();

        products.forEach((product, index) => {
            if (product.title === title) {
                products.splice(index, 1)
            }
        })
        localStorage.setItem("products", JSON.stringify(products));
    }



}    

document.addEventListener("DOMContentLoaded", Store.displayProduct());


// Function

function addCart(e) {
    let title = e.target.parentElement.parentElement.previousElementSibling.textContent;

    //    console.log(title);


    let price = e.target.parentElement.nextElementSibling.textContent;

    // console.log(price);

    let items = new Product(title, price);

    UI.cartList(items);

    Store.addProduct(items);

   
}

function removeListItem(e) {
    UI.deleteList(e.target);
}