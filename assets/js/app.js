// soleve this problem used OOP
let form = document.querySelector('#book-form');
class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
class ShowBook {
    constructor(){

    }
    AddToBookList(book){
        let bookList = document.querySelector('#book-list');
        let row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a class="delete" href="#">X</a></td>
        `
        bookList.appendChild(row);
    }
    clearInput(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value ='';
        document.querySelector('#isbn').value ='';
    }
}
form.addEventListener('submit', newBook);
function newBook(e){
    title = document.querySelector('#title').value,
    author = document.querySelector('#author').value,
    isbn = document.querySelector('#isbn').value;
    let book = new Book(title, author, isbn);
    let showBookList = new ShowBook();
    showBookList.AddToBookList(book);
    showBookList.clearInput()
    e.preventDefault();
}
