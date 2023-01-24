// const bookSelect = document.getElementById("bookSelect"
// )
// const categorySelect = document.getElementById('categorySelect');
// const searchInput = document.getElementById('search');
// const pickButton = document.getElementById('pickButton');
// const searchButton = document.getElementById('searchBtn');
// const loading = document.getElementById('loading');
// const totalText = document.getElementById('total');

// const bookTable = document.getElementById('bookTable');
// const bookTableBody = bookTable.getElementsByTagName('tbody')[0];
// const alertContainer = document.getElementById('searchAlert');

// async function getBooksFromServer() {
    
//     const books = await  fetch('http://api-demo.rjaziz.web.id:3000/books')
//     .then((response) => response.json())
//     .then((data) => data.data)
//     .catch((err) => err);

//     books.forEach(data => {
//         const bookOpt = new Option(data.name, JSON.stringify(data), false);
//         bookSelect.add(bookOpt)

        
//     });
//     console.log(books);
// }

// getBooksFromServer()

// function pickBook() {
//     pickButton.addEventListener('click', function (ev) {
//         try {
//             const bookData = JSON.parse(bookSelect.value);
//             const book = new Book(bookData);
//             books.push(book);

//             const row = bookTableBody.insertRow();
//             book.loopData((key, index) => {
//                 let cellValue = '';
//                 const cell = row.insertCell(index);

//                 if (key === 'price') {
//                     cellValue = book.formatPrice();

//                     cell.innerHTML = cellValue;
//                     return;
//                 }

//                 cell.innerHTML = book.bookData[key];
//             });

//             const totalPrice = books.reduce((acc, curr) => {
//                 return acc += curr.price;
//             }, 0);

//             totalText.innerText = book.formatPrice(totalPrice);
//         } catch (err) {
//             console.error(err);
//         }
//     });
// }






const books = [];
const bookSelect = document.getElementById('bookSelect');
const categorySelect = document.getElementById('categorySelect');
const searchInput = document.getElementById('search');
const pickButton = document.getElementById('pickButton');
const searchButton = document.getElementById('searchBtn');
const loading = document.getElementById('loading');
const totalText = document.getElementById('total');

const bookTable = document.getElementById('bookTable');
const bookTableBody = bookTable.getElementsByTagName('tbody')[0];
const alertContainer = document.getElementById('searchAlert');

generateCategories();
getBooks()
    .then((data) => {
        data.forEach((item) => {
            const bookOpt = new Option(item.name, JSON.stringify(item), false);
            bookSelect.add(bookOpt);
        })

        setTimeout(() => {
            loading.classList.add('d-none');
        }, 1500);
    });

pickBook();
searchByCategory();

async function getBooks() {
    loading.classList.remove('d-none');

    return await fetch('http://api-demo.rjaziz.web.id:3000/books')
        .then((response) => response.json())
        .then((data) => data.data)
        .catch((err) => err);
}

function generateCategories() {
    const book = new Book({ id: null, name: null, author: null, price: 0 });

    book.getKeys().forEach((item) => {
        const categoryOpt = new Option(item.toUpperCase(), item, false);
        categorySelect.add(categoryOpt);
    })
}

function pickBook() {
    pickButton.addEventListener('click', function (ev) {
        try {
            const bookData = JSON.parse(bookSelect.value);
            const book = new Book(bookData);
            books.push(book);

            const row = bookTableBody.insertRow();
            book.loopData((key, index) => {
                let cellValue = '';
                const cell = row.insertCell(index);

                if (key === 'price') {
                    cellValue = book.formatPrice();

                    cell.innerHTML = cellValue;
                    return;
                }

                cell.innerHTML = book.bookData[key];
            });

            const totalPrice = books.reduce((acc, curr) => {
                return acc += curr.price;
            }, 0);

            totalText.innerText = book.formatPrice(totalPrice);
        } catch (err) {
            console.error(err);
        }
    });
}

function searchByCategory() {
    searchButton.addEventListener('click', function (ev) {
        const searchValue = searchInput.value;
        const categoryValue = categorySelect.value;

        const isExist = books.length > 0
            ? books.some((item) => item[categoryValue]
                .toString()
                .toLowerCase()
                .includes(searchValue.toLowerCase())
            )
            : false;
        showAlert(isExist)

        setTimeout(() => {
            hideAlert();
        }, 3000);
    });
}

function showAlert(isExist) {
    alertContainer.classList.remove('d-none');
    alertContainer.classList.add('d-block');

    if (isExist) {
        alertContainer.classList.remove('alert-danger');
        alertContainer.classList.add('alert-success');
        alertContainer.innerText = 'Buku yg anda cari sudah tersedia!'
        return;
    }

    alertContainer.classList.remove('alert-success');
    alertContainer.classList.add('alert-danger');
    alertContainer.innerText = 'Buku yg anda cari belum tersedia!'
}

function hideAlert() {
    alertContainer.classList.remove('d-block');
    alertContainer.classList.add('d-none');
}