class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class BookList {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    removeBook(isbn) {
        this.books = this.books.filter(book => book.isbn !== isbn);
    }
}

class UI {
    static addToBookList(book) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X</a></td>
        `;
        document.querySelector('#book-list').appendChild(row);
    }

    static clearInput() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));

        // Get the parent element where the alert will be inserted
        const container = document.querySelector('.container');
        if (!container) {
            console.error("Container element not found in the DOM.");
            return;
        }

        // Insert the alert before the first child of the container
        container.insertBefore(div, container.firstChild);
        setTimeout(() => div.remove(), 3000);
    }
}

class Store {
    static getBooks() {
        let books;
        // Check if there are any books in localStorage
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            // Parse the stored JSON string into an array
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book) {
        let books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        let books = Store.getBooks();
        books = books.filter(book => book.isbn !== isbn);
        localStorage.setItem('books', JSON.stringify(books));
    }
}

document.querySelector('#book-form').addEventListener('submit', e => {
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    if (title === '' || author === '' || isbn === '') {
        UI.showAlert("All fields are required", "error");
    } else {
        const book = new Book(title, author, isbn);
        UI.addToBookList(book);
        UI.clearInput();
        UI.showAlert("Book added", "success");
        Store.addBook(book);
    }
});

document.querySelector('#book-list').addEventListener('click', e => {
    if (e.target.classList.contains('delete')) {
        e.target.parentElement.parentElement.remove();
        UI.showAlert("Book removed", "success");

        // Remove from local storage
        const isbn = e.target.parentElement.previousElementSibling.textContent;
        Store.removeBook(isbn);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Display books from local storage on page load
    const books = Store.getBooks();
    books.forEach(book => UI.addToBookList(book));
});
