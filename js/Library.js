const submit_button = document.querySelector('#submit');
const get_title = document.querySelector('.Title');
const get_author = document.querySelector('.Author');
const get_num_of_pages = document.querySelector('.NumOfPages');
const get_read_status = document.querySelector('#read-status-button');
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
    console.log(NewBook.PrintDetails);
    location.href = 'index.html';
}
function DisplayAllBooks(){
    for (let i = 0; i < AllBooksIdx + 1; i++){
        console.log("Book Number: " + i + 1);
        console.log(PrintDetails(AllBooks[i]));
    }
}
function AlternateReadStatus(){
    if (get_read_status.innerText == "Yes"){
        get_read_status.style.backgroundColor = "rgb(255,0,0)";
        get_read_status.innerText = "No";
    }
    else{
        get_read_status.style.backgroundColor = "rgb(0,255,0)";
        get_read_status.innerText = "Yes";
    }
}
//submit_button && submit_button.addEventListener('click',AddNewbook);
get_read_status.addEventListener('click',AlternateReadStatus);