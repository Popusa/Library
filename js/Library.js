let AllBooks = [];
let AllBooksIdx = 0;
function Book(Title,Author,NumOfPages,DateOfPublication,Read){
    this.Title = Title;
    this.Author = Author;
    this.NumOfPages = NumOfPages;
    this.DateOfPublication = DateOfPublication;
    this.Read = Read;
}
Book.prototype.PrintDetails = function(){
    return "Title: " + this.Title + " Author: " + this.Author + " Page Count:" + this.NumOfPages + " Date Of Publication: " + this.DateOfPublication + "This book's read status is: " + read;
}
function StoreBook(BookObject){
    AllBooksIdx++;
    AllBooks[AllBooksIdx] = BookObject;
}