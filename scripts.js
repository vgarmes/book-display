let myLibrary = [];
const booksGrid = document.querySelector(".book-grid-container");
const addBookButton = document.querySelector(".add-book-button");
const closeFormButton = document.querySelector(".btn.cancel")
const form = document.querySelector(".form-popup");

booksGrid.addEventListener("click", executeAction);
addBookButton.addEventListener("click", openForm);
closeFormButton.addEventListener("click", closeForm);
form.addEventListener("submit", addBook);

function Book(title, author, pages, completed) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.completed = completed;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  console.log(myLibrary);
}

function updateBooksGrid() {
  resetGrid();
  let index = 0;
  for (let book of myLibrary) {
    createBookCard(book, index);
    index++;
  }
}

function resetGrid() {
  booksGrid.innerHTML = "";
}

function createBookCard(book, index) {
  const bookCard = document.createElement("li");
  const bookTitle = document.createElement("div");
  const bookAuthor = document.createElement("div");
  const deleteButton = document.createElement("div");
  const deleteIcon = document.createElement("i");

  bookCard.classList.add("book-grid-item");
  bookCard.setAttribute("data-index", index);
  bookTitle.classList.add("book-title");
  bookAuthor.classList.add("book-author");
  deleteButton.classList.add("btn-delete");
  deleteIcon.setAttribute("class", "fas fa-times-circle");

  bookTitle.textContent = book.title;
  bookAuthor.textContent = book.author;

  deleteButton.appendChild(deleteIcon);
  bookCard.appendChild(bookTitle);
  bookCard.appendChild(bookAuthor);
  bookCard.appendChild(deleteButton);

  booksGrid.appendChild(bookCard);
}

function insertAddBookButton() {
  const addBookButton = document.createElement("li");
  addBookButton.classList.add("btn-add-book");
  addBookButton.textContent = "+";
  booksGrid.appendChild(addBookButton);
}

function openForm() {
  form.style.display = "block";
}

function closeForm() {
  form.style.display = "none";
}

function addBook(e) {
  e.preventDefault(); //prevents the form from posting the input data on the address bar and navigating after submitting
  addBookToLibrary(readForm());
  updateBooksGrid();
  closeForm();
}

function readForm() {
  const title = form.querySelector('input[name="title"]').value;
  const author = form.querySelector('input[name="author"]').value;
  return new Book(title, author, 100, true);
}

function executeAction(e) {
  console.log(e.target.parentNode.parentNode.getAttribute("data-index"));
  if (e.target.parentNode.classList.contains("btn-delete")) {
    const bookIndex = e.target.parentNode.parentNode.getAttribute("data-index");
    removeBook(bookIndex);
  }
}
function removeBook(bookIndex) {
  myLibrary.splice(bookIndex, 1);
  updateBooksGrid();
}

let book1 = new Book("hobbit", "tolkien", 500, true);
let book2 = new Book("replay","donovan",400,false);

//addBookToLibrary(book1,myLibrary);
//addBookToLibrary(book2,myLibrary);

//updateBooksGrid();