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

let products = [
    new Products(1, 'Tôi tài giỏi, bạn cũng thế', 'img/toiTaiGioi.jpg', 250000, 25, '01/01/2021'),
    new Products(2, 'Óc sáng suốt', 'img/id_2.jpg', 130000, 20, '01/01/2021'),
    new Products(3, 'Tôi tự học', 'img/id_3.jpg', 50000, 25, '01/01/2021'),
    new Products(4, 'Cái dũng của thánh nhân', 'img/id_4.jpg', 150000, 5, '01/01/2021'),
    new Products(5, 'Thuật xử thế của người xưa', 'img/id_5.jpg', 55000, 45, '01/01/2021'),
    new Products(6, 'Sức mạnh của thói quen', 'img/id_6.jpg', 150000, 35, '01/01/2021'),
    new Products(7, 'Mỗi ngày tiết kiệm một giờ', 'img/id_7.jpg', 150000, 55, '01/01/2021'),
    new Products(8, 'Ngừng viện cớ', 'img/id_8.jpg', 150000, 25, '01/01/2021'),
    new Products(9, 'Lối sống tối giản của người Nhật', 'img/id_9.jpg', 150000, 65, '01/01/2021'),
    new Products(10, 'Ngay bây giờ hoặc không bao giờ', 'img/id_10.jpg', 150000, 40, '01/01/2021'),
    new Products(11, 'Chiến thắng con quỷ trong bạn', 'img/id_11.jpg', 100000, 15, '01/01/2021'),
    new Products(12, '7 thói quen hiệu quả', 'img/bayThoiQuenHieuQua.jpg', 75000, 50, '01/01/2021')
]



function showBook(data) {
    let bookTable = '';
    let size = data.length;
    isSort(data)
    for (let index = 0; index < size; index++) {
        bookTable += `<tr id='tr_${data[index].id}'>
                <td><input type='checkbox' data='${data[index].id}'></td>
                <td class="text-center">${data[index].id}</td>
                <td class="text-left">${data[index].name}</td>
                <td class="text-center"><img class='img-circle' src='${data[index].photo}' alt=''></td>
                <td class="text-center">${data[index].price}</td>
                <td class="text-center">${data[index].quantity}</td>
                <td class="text-center">${data[index].date}</td>
                <td ><button class="btn btn-warning" onclick='editBook(${data[index].id})'>Edit</button></td>
                <td><button class="btn btn-danger" onclick='remove(${data[index].id})'>Remove</button></td>
                </tr>`
    }
    document.querySelector('#tbBook').innerHTML = bookTable
}

function findId() {
    return products[0].id;
}

function isSort(data) {
    return data.sort(function (n1, n2) {
        return n2.id - n1.id
    })
}

function findIndexById(id) {
    return products.findIndex(function (product) {
        return product.id == id;
    })
}

function search(keywork) {
    keywork = document.querySelector('#searchBook').value
    let resultSearch = products.filter(function (book, index) {
        return book.name.toLowerCase().indexOf(keywork.toLowerCase()) != -1;
    })
    return showBook(resultSearch);
}

function save() {
    let name = document.querySelector('#bookname').value;
    let photo = document.querySelector('#photo').value;
    let price = document.querySelector('#price').value;
    let quantity = document.querySelector('#quantity').value;
    let date = document.querySelector('#dateBook').value;
    if (name == '' || photo == '' || price == '' || quantity == '' || date == '') {
        alert('Điền thông tin vào');
        return
    }
    let id = findId() + 1;
    let newBook = new Products(id, name, photo, price, quantity, date);
    products.unshift(newBook);
    localStorage.setItem('books', JSON.stringify(products));
    JSON.parse(window.localStorage.getItem('books'))
    showBook(products);
    clearForm()
}

function remove(id) {
    findIndexById(id);
    if (findIndexById(id) == -1) {
        return;
    }
    let confirmed = confirm('Bạn có chắc muốn xóa không?')
    if (confirmed) {
        products.splice(findIndexById(id), 1);
        localStorage.setItem('books', JSON.stringify(products));
        JSON.parse(window.localStorage.getItem('books'));
        showBook(products)
    }
}

function clearForm() {
    document.querySelector('#bookname').value = '';
    document.querySelector('#photo').value = '';
    document.querySelector('#price').value = '';
    document.querySelector('#quantity').value = '';
    document.querySelector('#dateBook').value = '';
}

function editBook(id) {
    document.querySelector('#bookname').value = products[findIndexById(id)].name;
    document.querySelector('#photo').value = products[findIndexById(id)].photo;
    document.querySelector('#price').value = products[findIndexById(id)].price;
    document.querySelector('#quantity').value = products[findIndexById(id)].quantity;
    document.querySelector('#dateBook').value = products[findIndexById(id)].date;
    document.querySelector('#idBook').value = products[findIndexById(id)].id;
    let actionButton = document.querySelector(`#buttoncontrol_1`);
    actionButton.children[1].classList.add('d-none');
    actionButton.children[2].classList.remove('d-none');
    actionButton.children[3].classList.remove('d-none');
}

function updateBook() {
    let name = document.querySelector('#bookname').value;
    let photo = document.querySelector('#photo').value;
    let price = document.querySelector('#price').value;
    let quantity = document.querySelector('#quantity').value;
    let date = document.querySelector('#dateBook').value;
    let id = document.querySelector('#idBook').value;
    let updateBook = new Products(id, name, photo, price, quantity, date);
    if (name == '' || photo == '' || price == '' || quantity == '' || date == '') {
        alert('Điền thông tin vào');
        return
    }
    products.splice(findIndexById(id), 1, updateBook);
    let actionButton = document.querySelector(`#buttoncontrol_1`);
    actionButton.children[1].classList.remove('d-none');
    actionButton.children[2].classList.add('d-none');
    actionButton.children[3].classList.add('d-none');
    localStorage.setItem('books', JSON.stringify(products));
    JSON.parse(window.localStorage.getItem('books'));
    showBook(products);
    clearForm();
}

function deleteAll() {
    let checkboxList = document.querySelectorAll(`#tbBook input[type='checkbox']:checked `);
    for (let checkbox of checkboxList) {
        let id = Number(checkbox.getAttribute('data'));
        findIndexById(id);
        products.splice(findIndexById(id), 1)
    }
    localStorage.setItem('books', JSON.stringify(products));
    JSON.parse(window.localStorage.getItem('books'));
    showBook(products)
}

(function () {
    showBook(products);
    localStorage.setItem('books', JSON.stringify(products));
    JSON.parse(window.localStorage.getItem('books'))
})()