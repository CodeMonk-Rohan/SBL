console.log("Admin Page Loaded");


document.addEventListener('DOMContentLoaded', () => { displayBooks() })

var input = document.getElementById("book-qty");
var BookAddForm = document.getElementById("book-form")

var searchInput = document.getElementById("search-input");

searchInput.addEventListener('keyup', function (event) {
    const query = event.target.value.toLowerCase()
    displayBooks(query)
})

//This is for adding new books when the add button is clicked!
BookAddForm.addEventListener('submit', function (event) {

    event.preventDefault()
    const bookNameField = document.getElementById('book-name-input');
    const bookAuthorField = document.getElementById('book-author-input');
    const qtyField = document.getElementById('book-qty');

    const bookName = bookNameField.value;
    const bookAuthor = bookAuthorField.value;
    const qty = parseInt(qtyField.value);

    //Only add to database when theres a non-zero amount of books to add!
    if (qty >= 1) {
        const book = {
            name: bookName,
            author: bookAuthor,
            quantity: qty
        };

        let books = JSON.parse(localStorage.getItem('books')) || [];

        //Check if the book we are adding already exists?
        const existingBookIndices = books.findIndex(book => book.name === bookName && book.author === bookAuthor)
        if (existingBookIndices !== -1) {
            //if exists already
            books[existingBookIndices].quantity += qty
        } else {
            books.push(book);
        }

        //Push the changes to the local storage.
        localStorage.setItem('books', JSON.stringify(books));

        //Clear the form data
        bookAuthorField.value = ""
        bookNameField.value = ""
        qtyField.value = "0"

        //Refresh the book list
        displayBooks()

        //logs for debugging, remove in the final build
        console.log("Added Book!")
        console.log("Current database of books: ", getAllBooks())
        //MAYBE add a confirmation method here!

        //if we have time ; - ;

        //時間がないかもしれない

    } else {
        alert("Quantity cannot be 0!")
        return;
    }

})

//helper function to get all books currently in local storage on the browser
function getAllBooks() {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    return books;
}

//This function is a form validation that will not allow you to enter values less than 1
input.addEventListener('input', function (event) {
    var inputValue = event.target.value.replace(/[^\d]/g, '');
    // Update the input value with the cleaned numeric value
    event.target.value = inputValue;
})


function displayBooks(query = "") {
    const booksContainer = document.getElementById('books-container');
    //Clear any existing html that is present (to kinda refresh)
    booksContainer.innerHTML = "";

    const books = getAllBooks();

    const filteredBooks = filterBooks(query, books)


    //Setup each book div and shove it into the container
    filteredBooks.forEach(function (book, index) {
        const bookDiv = document.createElement('div');
        console.log(book)
        bookDiv.classList.add('book-item')
        const bookInfo = `
        <div class="item-div">
            <h3>${book.name}</h3>
            <p><strong>By ${book.author}</p></strong>
            <p><strong>Quantity: ${book.quantity}</p>
            <button class="remove-book" data-bookname="${book.name}" data-bookauthor="${book.author}">Remove</button> 
        <div/>
        `;

        //Add the ABOVE defined html code, INTO the bookDiv
        bookDiv.innerHTML = bookInfo

        //Append this component into the broader parent container that contains the list of all books
        booksContainer.appendChild(bookDiv)

    });



    //Get all the remove buttons, and then attach a listener to them that can delete the books
    const removeBookButtons = document.querySelectorAll('.remove-book');
    removeBookButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            
            const button = event.currentTarget;
            const bookName = button.dataset.bookname;
            const bookAuthor = button.dataset.bookauthor;
            console.log("heck: ", bookName, bookAuthor)
            removeBook(bookName, bookAuthor)
        })
    })

}

function filterBooks(searchTerm, books) {

    const filteredBooks = searchTerm ? books.filter(book =>
        book.name.toLowerCase().includes(searchTerm) || book.author.toLowerCase().includes(searchTerm)
    ) : books;

    return filteredBooks;
}


function removeBook(bookName, bookAuthor) {
    let books = getAllBooks();
    // Remove the book at the specified index from the array
    console.log(books)
    const index = books.findIndex(book => (book.name === bookName && book.author === bookAuthor))
    console.log("Index: ",index)
    console.log(`index: ${index}, book: ${books[index]}`)
    if (index !== -1) {
        books.splice(index, 1);
        // Update local storage with the removed book
        localStorage.setItem('books', JSON.stringify(books));
        // Refresh the displayed book list
        searchInput.value = ""
        console.log(books)
    }
    displayBooks();

}


//logout
const logoutButton = document.getElementById("logout-button");
logoutButton.addEventListener('click', function(event){
    //Override the logged in session username
    sessionStorage.setItem("username", null);
    window.location = "./login.html"

})


//about us
const aboutUsButton = document.getElementsByClassName("about-us")
console.log("About us buttons: ",aboutUsButton[0])
aboutUsButton[0].addEventListener("click", function(event){
    event.preventDefault()
    window.location = "./aboutus.html"
})



