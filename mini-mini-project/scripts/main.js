//Logic for majority of the site should be here
//(死にたい、助けてくれー！)

console.log("LOADED main.js");
let username = sessionStorage.getItem("username")
let currentUserIndex;
const users = JSON.parse(localStorage.getItem("users")) || []
//initialise the userindex, so we can use it to change stuff later
currentUserIndex = users.findIndex(user=> user.username === username)

console.log("logged in as ", username)

document.addEventListener('DOMContentLoaded', ()=>{
    displayBooks();
    displayBorrowedBooks();
})

//Log out functionality
const logoutButton = document.getElementById("logout-button");
logoutButton.addEventListener('click', function(event){
    //Override the logged in session username
    sessionStorage.setItem("username", null);
    window.location = "./login.html"

})


//borrowed books by a user


function getAllBorrowedBooks(){
    const users = JSON.parse(localStorage.getItem("users"));
    const currentUser = users[currentUserIndex];
    const borrowed = currentUser.borrowed;
    return borrowed;
}

function displayBorrowedBooks(){
    const borrowedBooksContainer = document.getElementById("user-books");
    borrowedBooksContainer.innerHTML = "";

    let borrowedBooks = getAllBorrowedBooks();

    borrowedBooks.forEach(function(book, index){
        //This creates a div
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book-item')
        //This puts the following html INTO the div created before
        const bookInfo = `
            <div class="user-item-div">
                <h3>${book.name}</h3>
                <p><strong>By ${book.author}</p></strong>   
            <div/>  
        `;

        //Add the ABOVE defined html code, INTO the bookDiv
        bookDiv.innerHTML = bookInfo

        //Append this div into the broader parent container that contains the list of all books
        borrowedBooksContainer.appendChild(bookDiv)
    })
}

//library database of books
function getAllBooks(){
    const books = JSON.parse(localStorage.getItem('books')) || [];
    return books;
}

function displayBooks(query = ""){
    console.log("Display books called");
    const booksContainer = document.getElementById('books-container');
    //Clear any existing html that is present (to kinda refresh)
    booksContainer.innerHTML = "";

    let books = getAllBooks();

    const filteredBooks = filterBooks(query, books)


    //Setup each book div and shove it into the container
    filteredBooks.forEach(function(book, index) {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book-item')
        const bookInfo = `
         <div class="item-div">
            <h3>${book.name}</h3>
            <p><strong>By ${book.author}</p></strong>
            <p><strong>Quantity: ${book.quantity}</p>
            <button class="add-book" data-book-index="${index}">Borrow</button>
         <div/>
            
        `;

        //Add the ABOVE defined html code, INTO the bookDiv
        bookDiv.innerHTML = bookInfo

        //Append this component into the broader parent container that contains the list of all books
        booksContainer.appendChild(bookDiv)

    });



    //Get all the remove buttons, and then attach a listener to them that can delete the books
    const borrowButtons = document.querySelectorAll('.add-book');
    borrowButtons.forEach(button => {
    button.addEventListener('click', function(event){
        const button = event.currentTarget;
        // Get the index of the button that was clicked
        const bookIndex = parseInt(button.dataset.bookIndex);
        const book = books[bookIndex]
        
        if(book.quantity > 0){

            
            const hasBook = users[currentUserIndex].borrowed.some(
                borrowedBook => {
                    return borrowedBook.name === book.name && borrowedBook.author === book.author
                }
            )

            if(!hasBook){
                books[bookIndex].quantity -= 1;
                users[currentUserIndex].borrowed.push(book);
                localStorage.setItem("users", JSON.stringify(users))
                localStorage.setItem("books", JSON.stringify(books))
                displayBorrowedBooks()
            }else{
                alert("You have already borrowed this book!")
            }
            // users[userIndex].borrowed.push(book)
        }else{
            alert("We do not have any more of these available at the moment")
        }
        displayBooks()

        // removeBook(bookIndex)
    })
})

}

function filterBooks(searchTerm, books){
    
    const filteredBooks = searchTerm ? books.filter(book =>
        book.name.toLowerCase().includes(searchTerm) || book.author.toLowerCase().includes(searchTerm)
    ) : books;

    return filteredBooks;
}

const searchInput = document.getElementById('search-input')
searchInput.addEventListener('keyup', function(event){
    const query = event.target.value.toLowerCase()
    displayBooks(query)
})

 


