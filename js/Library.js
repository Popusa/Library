const add_book_form = document.querySelector('#add-book-form');
const edit_book_form = document.querySelector('#edit-book-form');
const bookshelfee = document.querySelector(".bookshelf");
const all_books = document.querySelector(".all_books");
const add_book_button = document.querySelector("#add-book-button");
const edit_book_form_container = document.querySelector('.edit-book-form-container');
const entire_page = document.querySelector(".fullpage");
const popup = document.querySelector(".popup");
let Create_Book = true;
let Books = [];
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
    Books[AllBooksIdx] = BookObject;
    AllBooksIdx++;
}
function CreateBookDiv(BookObj){
    const book_div = document.createElement('div');
    const title_div = document.createElement('div');
    const author_div = document.createElement('div');
    const NOP_div = document.createElement('div');
    const remove_book_button = document.createElement('button');
    const edit_book_button = document.createElement('button');
    const read_status_button = document.createElement('button');
    book_div.classList.add('book');
    book_div.setAttribute('id', AllBooksIdx);
    title_div.innerText = BookObj.Title;
    title_div.classList.add('title_div');
    book_div.appendChild(title_div);
    author_div.innerText = BookObj.Author;
    author_div.classList.add('author_div');
    book_div.appendChild(author_div);
    NOP_div.innerText = BookObj.NumOfPages + " pgs";
    NOP_div.classList.add('NOP_div');
    book_div.appendChild(NOP_div);
    read_status_button.classList.add('read_status_button');    
    book_div.appendChild(read_status_button);
    if(BookObj.Read == false) {
        read_status_button.innerText = 'Not Read';
        read_status_button.style.backgroundColor = 'red';
    }else{
        read_status_button.innerText = 'Read';
        read_status_button.style.backgroundColor = 'green';
    }
    edit_book_button.innerText = "Edit Book";
    edit_book_button.classList.add('edit_book_button');
    book_div.appendChild(edit_book_button);
    remove_book_button.innerText = 'Delete Book'; 
    remove_book_button.classList.add('remove_book_button');
    book_div.appendChild(remove_book_button);
    all_books.appendChild(book_div);
    remove_book_button.addEventListener('click',function(){
        Books.splice(Books.indexOf(BookObj),1);
        all_books.removeChild(book_div);
    });
    read_status_button.addEventListener('click',function(){
        BookObj.Read = !BookObj.Read;
        if(BookObj.Read == false) {
            read_status_button.innerText = 'Not Read';
            read_status_button.style.backgroundColor = 'red';
        }else {
            read_status_button.innerText = 'Read';
            read_status_button.style.backgroundColor = 'green';
        }
    });
    edit_book_button.addEventListener('click',function(){

    });
}
function AddNewbook(){ 
    // console.log("function was called");
    // if (AllBooksIdx == 9){
    //     console.log("limit reached.");
    //     return;
    // }
    let NewBook = new Book();
    NewBook.Title = add_book_form.elements[0].value;
    NewBook.Author = add_book_form.elements[1].value;
    NewBook.NumOfPages = add_book_form.elements[2].value;
    if (document.getElementById('read-status-yes').checked == true)
        NewBook.Read = true;
    else
        NewBook.Read = false;
    StoreBook(NewBook);
    CreateBookDiv(NewBook);
    console.log(NewBook.PrintDetails());
    // console.log("function reached end.");
}
function DisplayAllBooks(){
    for (let i = 0; i < AllBooksIdx + 1; i++){
        console.log("Book Number: " + i + 1);
        console.log(Books[i].PrintDetails());
    }
}
function RenderBookForm(){
    add_book_button.innerText = "Cancel";
    popup.style.display = "block";
    Create_Book = false;
}
function HideBookForm(){
    add_book_button.innerText = "Add book";
    popup.style.display = "none";
    Create_Book = true;
}
add_book_form && add_book_form.addEventListener('submit',function(e) {
    e.preventDefault();
    HideBookForm();
    AddNewbook();
});
add_book_button.addEventListener('click',function(){
    if (!Create_Book){
        HideBookForm();
    }
    else
        RenderBookForm();
});
//console.log(DisplayAllBooks());
popup.style.display = "none";
edit_book_form_container.style.display = "none";
//testing purposes
const Test = new Book("The Power of Habit","Charles Duhigg","371",true);
CreateBookDiv(Test);