const form = document.querySelector('#add-book-form');
const submit_button = document.querySelector('#Submit');
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
//console.log(DisplayAllBooks());