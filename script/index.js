class Products {
    constructor(id, name, photo, price, quantity, date) {
        this.id = id;
        this.name = name;
        this.photo = photo;
        this.price = price;
        this.quantity = quantity;
        this.date = date;
    }
}
class ProductsCustomer {
    constructor(id, name, photo, price, quantity, isquantityGet) {
        this.id = id;
        this.name = name;
        this.photo = photo;
        this.price = price;
        this.quantity = quantity;
        this.isquantityGet = isquantityGet;
    }
}
let cartBook = JSON.parse(window.localStorage.getItem('cartCustomer'));
let products = JSON.parse(window.localStorage.getItem('books'));
let payCart = [];

function cartCustomer(data) {
    let cart = '';
    let size = data.length;
    for (let index = 0; index < size; index++) {
        cart += `<div class="product">
        <div><img src="${data[index].photo}" alt=""></div>
        <div style='display: none'><input type='number' value="${data[index].id}" id='id_${data[index].id}'></div>
        <div>TÊN SẢN PHẨM:</div>
        <div> ${data[index].name}</div>
        <div style='display: none'><input type='text' value='${data[index].name}'id='name${data[index].id}'> </div>
        <div>GIÁ: ${data[index].price} vnd</div>
        <div style='display: none'><input type='number' value='${data[index].price}'id='price${data[index].id}'> </div>
        <div>SỐ LƯỢNG: ${data[index].isquantityGet}</div>
        <div style='display: none'><input type='number' value='${data[index].isquantityGet}'id='isquantityGet${data[index].id}'> </div>
        <div style='display: none'><input type='number' value='${data[index].quantity}'id='quantity${data[index].id}'> </div>
        <div>THÀNH TIỀN: ${data[index].price * data[index].isquantityGet} vnd</div>
        <div><button onclick='pay(${data[index].id})'>Pay</button>
        <button onclick='remove(${data[index].id})'>Remove</button>
        </div>
    </div>`
    }
    document.querySelector('#cartBook').innerHTML = cart;
}

function clearCart() {
    document.querySelector('#cartBook').innerHTML = '';
}

function findIndexById(id) {
    return cartBook.findIndex(function(book, index) {
        return book.id == id
    })
}

function payProduct() {
    let confirmed = confirm('Bạn chắc chắn muốn mua tất cả sản phẩm này không?');
    if (confirmed) {
        alert('Cảm ơn bạn đã mua Sách, bạn đã thanh toán thành công!!!');
        localStorage.removeItem('cartCustomer');
        clearCart()
    }
    
}
function pay(id) {
    let confirmed = confirm('Bạn chắc chắn muốn mua sản phẩm này không?');
    if (confirmed) {
        alert('Cảm ơn bạn đã mua Sách, bạn đã thanh toán thành công!!!');
        let quantity = document.querySelector(`#quantity${id}`).value;
        let isquantityGet = document.querySelector(`#isquantityGet${id}`).value;
        products[findIndexById(id)].quantity = quantity - isquantityGet;
        cartBook.splice(findIndexById(id), 1);
        cartCustomer(cartBook);
        JSON.parse(window.localStorage.setItem('books', products));
        JSON.stringify(products);
    }
    
}
function remove(id) {
    let confirmed = confirm('Bạn chắc chắn muốn xóa sản phẩm này ra khỏi giỏ hàng hay không không?');
    if (confirmed) {
        cartBook.splice(findIndexById(id), 1);
        cartCustomer(cartBook)
    }
}
        
    


(function () {
    cartCustomer(cartBook)
})()