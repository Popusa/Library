const form = document.querySelector('#add-book-form');
const submit_button = document.querySelector('#Submit');
const bookshelfee = document.getElementById("#bookshelf");
const add_book_button = document.querySelector("#add-book-button");
const add_book_form_container = document.querySelector(".add-book-form-container");
const entire_page = document.querySelector(".fullpage");
let Create_Book = true;
let AllBooks = [];
let AllBooksIdx = 0;
function Book(Title,Author,NumOfPages,Read){
    this.Title = Title;
    this.Author = Author;
    this.NumOfPages = NumOfPages;
    this.Read = Read;
}
Book.prototype.PrintDetails = function(){
    return "Title: " + this.Title + " Author: " + this.Author + " Page Count:" + this.NumOfPages + "This book's read status is: " + this.Read;
}
function StoreBook(BookObject){
    AllBooks[AllBooksIdx] = BookObject;
    AllBooksIdx++;
}
function CreateBookDiv(){
    let div = document.createElement("div");
    div.style.width = "100px";
    div.style.height = "100px";
    div.style.background = "red";
    div.style.color = "white";
    div.innerText = "Hello";
    bookshelfee.appendChild(div);
}
function AddNewbook(){ 
    // console.log("function was called");
    let NewBook = new Book();
    NewBook.Title = form.elements[0].value;
    NewBook.Author = form.elements[1].value;
    NewBook.NumOfPages = form.elements[2].value;
    if (document.getElementById('read-status-yes').checked == true)
        NewBook.Read = "Yes";
    else
        NewBook.Read = "No";
    StoreBook(NewBook);
    CreateBookDiv();
    console.log(NewBook.PrintDetails());
    // console.log("function reached end.");
}
function DisplayAllBooks(){
    for (let i = 0; i < AllBooksIdx + 1; i++){
        console.log("Book Number: " + i + 1);
        console.log(AllBooks[i].PrintDetails());
    }
}
form && form.addEventListener('submit',function(e) {
    e.preventDefault();
    AddNewbook();
});
add_book_button.addEventListener('click',function(){
    if (!Create_Book){
        add_book_button.innerText = "Add book";
        add_book_form_container.style.display = "none";
        Create_Book = true;
    }
    else{
        add_book_button.innerText = "Cancel";
        add_book_form_container.style.display = "block";
        entire_page.style.backgroundColor = 'rgba(0,0,0,0.2)';
        add_book_button.style.opacity = "1.0";
        add_book_form_container.style.opacity = "1.0";
        Create_Book = false;
    }
});
//console.log(DisplayAllBooks());