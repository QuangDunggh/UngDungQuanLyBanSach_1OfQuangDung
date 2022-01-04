let cartNumber = 0;
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
let cartbook = JSON.parse(window.localStorage.getItem('books'));
let cartCustomer = [];

function showBook(data) {
    let tableShow = '';
    let size = data.length;
    for (let index = 0; index < size; index++) {
        tableShow += ` <div class="product">
        <div><img src="${data[index].photo}" alt="" id='photo${data[index].id}'></div>
        <div style='display:none'>#ID: <input type='number' value='${data[index].id}' disabled id='id${data[index].id}'></div>
        <div><button onclick='getBook(${data[index].id})' >Get</button></div>
        <div>Tên sách:<input type='text' value='${data[index].name}' id='name${data[index].id}' disabled></div>
        <div>Giá: ${data[index].price} vnd</div>
        <div style='display:none'><input type='number' id='price${data[index].id}' value='${data[index].price}'></div>
        <div>Số lượng: ${data[index].quantity}</div>
        <div style='display:none'><input type='number' id='quantity${data[index].id}' value='${data[index].quantity}'></div>
        <div><input type='number' required min =0 id='number${data[index].id}'></div>
    </div>`
    }
    document.querySelector('#tbBook').innerHTML = tableShow;
}

function search(keywork) {
    keywork = document.querySelector('#searchBook').value
    let resultSearch = cartbook.filter(function (book, index) {
        return book.name.toLowerCase().indexOf(keywork.toLowerCase()) != -1;
    })
    return showBook(resultSearch);
}

function findIndexById(id) {
    return cartbook.findIndex(function (book, index) {
        return book.id == id;
    })
}

function getBook(id) {
    findIndexById(id);
    let name = document.querySelector(`#name${id}`).value;
    let photo = document.querySelector(`#photo${id}`).src;
    let price = document.querySelector(`#price${id}`).value;
    let quantity = document.querySelector(`#quantity${id}`).value;
    let idBook = document.querySelector(`#id${id}`).value;
    let quantityIsGet = document.querySelector(`#number${id}`).value;
    if (quantityIsGet == 0 || quantityIsGet == '' || quantityIsGet < 0) {
        alert('Vui lòng chọn số lượng sách bạn muốn mua!!!');
        document.querySelector(`#number${id}`).value = ''
        return;
    }
    document.querySelector('#numberBooks').innerHTML = `<a target="blank" href='index.html'>Cart(${cartNumber+=1})</a>`;
    document.querySelector(`#number${id}`).value = ''
    let isbookGet = new ProductsCustomer(idBook, name, photo, price, quantity, quantityIsGet);
    cartCustomer.push(isbookGet);
    localStorage.setItem('cartCustomer', JSON.stringify(cartCustomer));
}
(function () {
    showBook(cartbook)
})()