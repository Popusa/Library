const form = document.querySelector('add-book-form');
let AllBooks = [];
let AllBooksIdx = 0;
function Book(Title,Author,NumOfPages,Read){
    this.Title = Title;
    this.Author = Author;
    this.NumOfPages = NumOfPages;
    this.Read = Read;
}
Book.prototype.PrintDetails = function(){
    return "Title: " + this.Title + " Author: " + this.Author + " Page Count:" + this.NumOfPages + " Date Of Publication: " + this.DateOfPublication + "This book's read status is: " + read;
}
function StoreBook(BookObject){
    AllBooksIdx++;
    AllBooks[AllBooksIdx] = BookObject;
}
function AddNewbook(NewTitle,NewAuthor,NewNumOfPages,NewRead){
    const NewBook = new Book(NewTitle,NewAuthor,NewNumOfPages,NewRead);
    NewBook.NewTitle = get_title;
    NewBook.NewAuthor = get_author;
    NewBook.NewNumOfPages = get_num_of_pages;
    if (get_read_status.innerText == "Yes")
        NewBook.NewRead = true;
    else
        NewBook.NewRead = false;
    StoreBook(NewBook);
    console.log(NewBook.PrintDetails());
    location.href = 'index.html';
}
function DisplayAllBooks(){
    for (let i = 0; i < AllBooksIdx + 1; i++){
        console.log("Book Number: " + i + 1);
        console.log(PrintDetails(AllBooks[i]));
    }
}
submit_button && submit_button.addEventListener('click',AddNewbook);