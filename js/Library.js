const add_book_form = document.querySelector('#add-book-form');
const edit_book_form = document.querySelector('#edit-book-form');
const all_books = document.querySelector('.all_books');
const add_book_button = document.querySelector('#add-book-button');
const entire_page = document.querySelector('.fullpage');
const add_book_popup = document.querySelector(".add-book-popup");
const edit_book_popup = document.querySelector('.edit-book-popup');
const close_edit_book_form_button = document.querySelector('#close-edit-book-form');
let Create_Book = true;
let Editing_book = false;
let edited_book_idx;
let Title_Error_Msg = "Title is too long.",Author_Error_Msg = "Author name is too long.",NumOfPages_Error_Msg = "Number of pages is either too little or not even a number.",No_Errors = "No errors.";
let Books_Arr = [];
let BookCount = 0;
function Book(Title,Author,NumOfPages,Read){
    this.Title = Title;
    this.Author = Author;
    this.NumOfPages = NumOfPages;
    this.Read = Read;
}
Book.prototype.PrintDetails = function(){
    return "Book Number: " + BookCount + ", Title: " + this.Title + " Author: " + this.Author + " Page Count: " + this.NumOfPages + " This book's read status is: " + this.Read;
}
function StoreBook(BookObject){
    Books_Arr.push(BookObject);
    localStorage.setItem('Books_Arr', JSON.stringify(Books_Arr));
    BookCount++;
    localStorage.setItem('BookCount',BookCount);
}
function EditBook(){
    Books_Arr[edited_book_idx].Title = edit_book_form.elements[0].value;
    Books_Arr[edited_book_idx].Author = edit_book_form.elements[1].value;
    Books_Arr[edited_book_idx].NumOfPages = edit_book_form.elements[2].value;
    if (edit_book_form.elements[3].checked == true)
        Books_Arr[edited_book_idx].Read = true;
    else
        Books_Arr[edited_book_idx].Read = false;
        localStorage.setItem('Books_Arr', JSON.stringify(Books_Arr));
        DisplayAllBooks();
}
function CreateBookDiv(BookObj){
    const book_div = document.createElement('div');
    const title_div = document.createElement('div');
    const author_div = document.createElement('div');
    const nop_div = document.createElement('div');
    const remove_book_button = document.createElement('button');
    const edit_book_button = document.createElement('button');
    const read_status_button = document.createElement('button');
    book_div.classList.add('book');
    book_div.setAttribute('id', Books_Arr.indexOf(BookObj));
    title_div.innerText = BookObj.Title;
    title_div.classList.add('title_div');
    book_div.appendChild(title_div);
    author_div.innerText = BookObj.Author;
    author_div.classList.add('author_div');
    book_div.appendChild(author_div);
    nop_div.innerText = BookObj.NumOfPages + " pgs";
    nop_div.classList.add('nop_div');
    book_div.appendChild(nop_div);
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
        Books_Arr.splice(Books_Arr.indexOf(BookObj),1);
        localStorage.setItem('Books_Arr', JSON.stringify(Books_Arr));
        DisplayAllBooks();
        BookCount--;
        localStorage.setItem('BookCount',BookCount);
    });
    read_status_button.addEventListener('click',function(){
        BookObj.Read = !BookObj.Read;
        if(BookObj.Read == false) {
            read_status_button.innerText = 'Not Read';
            read_status_button.style.backgroundColor = 'red';
        }
        else {
            read_status_button.innerText = 'Read';
            read_status_button.style.backgroundColor = 'green';
        }
        localStorage.setItem('Books_Arr', JSON.stringify(Books_Arr));
        DisplayAllBooks();
    });
    edit_book_button.addEventListener('click',function(){
        if (!Editing_book){
            edit_book_popup.style.display = "block";
            Editing_book = true;
            edit_book_form.elements[0].value = BookObj.Title;
            edit_book_form.elements[1].value = BookObj.Author;
            edit_book_form.elements[2].value = BookObj.NumOfPages;
            // if (edit_book_form.getElementById('read-status-yes').checked == true)
            //     edit_book_form.elements[3].checked = true;
            // else
            //     edit_book_form.elements[4].checked = true;  
            edited_book_idx = Books_Arr.indexOf(BookObj);
        }
        else
            return;
    });
}
function ValidateForm(){
    let Temp_Title;
    let Temp_Author;
    let Temp_NumOfPages;      
    if (Editing_book){
        Temp_Title = edit_book_form.elements[0].value;
        Temp_Author = edit_book_form.elements[1].value;
        Temp_NumOfPages = edit_book_form.elements[2].value;        
    }
    else{
        Temp_Title = add_book_form.elements[0].value;
        Temp_Author = add_book_form.elements[1].value;
        Temp_NumOfPages = add_book_form.elements[2].value;
    }
    if (Temp_Title.length > 20)
        return Title_Error_Msg;
    else if (Temp_Author.length > 20)
        return Author_Error_Msg;
    else if (Temp_NumOfPages < 20 || isNaN(Temp_NumOfPages))
        return NumOfPages_Error_Msg;
    else
        return No_Errors;
}
function AddNewbook(){ 
    console.log("function was called");
    if (BookCount >= 39){
        alert("limit reached.");
        return;
    }
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
    const books = document.querySelectorAll('.book');
    books.forEach(book => all_books.removeChild(book));
    for (let i = 0; i < Books_Arr.length; i++)
        CreateBookDiv(Books_Arr[i]);
}
function DisplayBookForm(){
    add_book_button.innerText = "Cancel";
    add_book_popup.style.display = "block";
    Create_Book = false;
}
function HideBookForm(){
    if (Editing_book){
        edit_book_popup.style.display = "none";
        Editing_book = false;
    }
    else{
        add_book_button.innerText = "Add book";
        add_book_popup.style.display = "none";
        Create_Book = true;
    }
}
add_book_form && add_book_form.addEventListener('submit',function(e) {
    e.preventDefault();
    let Error_Msg = ValidateForm();
    if (Error_Msg != No_Errors){
        alert(Error_Msg);
        return;
    }
    else {
        HideBookForm();
        AddNewbook();
        add_book_form.reset();
    }
});
edit_book_form && edit_book_form.addEventListener('submit',function(e){
    e.preventDefault();
    let Error_Msg = ValidateForm();
    if (Error_Msg != No_Errors){
        alert(Error_Msg);
        return;
    }
    else {
        HideBookForm();
        EditBook();
        edit_book_form.reset();
    }
});
add_book_button.addEventListener('click',function(){
    if (Editing_book){
        alert("You cannot add a book while you are editing one!");
        return;
    }
    else{
    if (!Create_Book){
        HideBookForm();
    }
    else
        DisplayBookForm();
}
});
close_edit_book_form_button.addEventListener('click',function(){
    edit_book_popup.style.display = "none";
    Editing_book = false;
});
function LoadStoredDetails(){
    if(localStorage.getItem("Books_Arr") === null) {
        Books_Arr = [];
        BookCount = 0;
    }
    else {
        let BookObjects = localStorage.getItem('Books_Arr');
        BookObjects = JSON.parse(BookObjects);
        Books_Arr = BookObjects;
        DisplayAllBooks();
        if (BookCount === NaN)
            BookCount = Books_Arr.length;
        else
            BookCount = localStorage.getItem('BookCount');    
    }
}
add_book_popup.style.display = "none";
edit_book_popup.style.display = "none";
//testing purposes
// for(let i = 0; i < 45; i++){
// const Test = new Book("The Power of Habit","Charles Duhigg","371",true);
// StoreBook(Test);
// CreateBookDiv(Test);
// }
LoadStoredDetails();