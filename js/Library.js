const add_book_form = document.querySelector('#add_book_form');
const edit_book_form = document.querySelector('#edit_book_form');
const all_books = document.querySelector('.all_books');
const add_book_button = document.querySelector('#add_book_button');
const entire_page = document.querySelector('.fullpage');
const add_book_popup = document.querySelector(".add_book_popup");
const edit_book_popup = document.querySelector('.edit_book_popup');
const close_edit_book_form_button = document.querySelector('#close_edit_book_form');
let creating_book = false;
let editing_book = false;
let edited_book_idx;
let title_error_msg = "Title is too long.",author_error_Msg = "Author name is too long.",num_of_Pages_error_msg = "Number of pages is either too little or not even a number.",no_errors = "No errors.";
let books_arr = [];
let book_count = 0;
function Book(Title,Author,NumOfPages,Read){
    this.Title = Title;
    this.Author = Author;
    this.NumOfPages = NumOfPages;
    this.Read = Read;
}
Book.prototype.PrintDetails = function(){
    return "Book Number: " + book_count + ", Title: " + this.Title + " Author: " + this.Author + " Page Count: " + this.NumOfPages + " This book's read status is: " + this.Read;
}
function StoreBook(BookObject){
    books_arr.push(BookObject);
    localStorage.setItem('books_arr', JSON.stringify(books_arr));
    book_count++;
    localStorage.setItem('book_count',book_count);
}
function EditBook(){
    books_arr[edited_book_idx].Title = edit_book_form.elements[0].value;
    books_arr[edited_book_idx].Author = edit_book_form.elements[1].value;
    books_arr[edited_book_idx].NumOfPages = edit_book_form.elements[2].value;
    if (edit_book_form.elements[3].checked == true)
        books_arr[edited_book_idx].Read = true;
    else
        books_arr[edited_book_idx].Read = false;
        localStorage.setItem('books_arr', JSON.stringify(books_arr));
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
    book_div.setAttribute('id', books_arr.indexOf(BookObj));
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
        books_arr.splice(books_arr.indexOf(BookObj),1);
        localStorage.setItem('books_arr', JSON.stringify(books_arr));
        DisplayAllBooks();
        book_count--;
        localStorage.setItem('book_count',book_count);
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
        localStorage.setItem('books_arr', JSON.stringify(books_arr));
        DisplayAllBooks();
    });
    edit_book_button.addEventListener('click',function(){
        if (!editing_book){
            edit_book_popup.style.display = "block";
            editing_book = true;
            edit_book_form.elements[0].value = BookObj.Title;
            edit_book_form.elements[1].value = BookObj.Author;
            edit_book_form.elements[2].value = BookObj.NumOfPages; 
            edited_book_idx = books_arr.indexOf(BookObj);
        }
        else
            return;
    });
}
function ValidateForm(){
    let Temp_Title;
    let Temp_Author;
    let Temp_NumOfPages;      
    if (editing_book){
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
        return title_error_msg;
    else if (Temp_Author.length > 20)
        return author_error_Msg;
    else if (Temp_NumOfPages < 20 || isNaN(Temp_NumOfPages))
        return num_of_Pages_error_msg;
    else
        return no_errors;
}
function AddNewbook(){ 
    console.log("function was called");
    if (book_count >= 39){
        alert("limit reached.");
        return;
    }
    let NewBook = new Book();
    NewBook.Title = add_book_form.elements[0].value;
    NewBook.Author = add_book_form.elements[1].value;
    NewBook.NumOfPages = add_book_form.elements[2].value;
    if (document.getElementById('read_status_yes').checked == true)
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
    for (let i = 0; i < books_arr.length; i++)
        CreateBookDiv(books_arr[i]);
}
function DisplayBookForm(){
    add_book_button.innerText = "Cancel";
    add_book_popup.style.display = "block";
    creating_book = true;
}
function HideBookForm(){
    if (editing_book){
        edit_book_popup.style.display = "none";
        editing_book = false;
    }
    else{
        add_book_button.innerText = "Add book";
        add_book_popup.style.display = "none";
        creating_book = false;
    }
}
add_book_form && add_book_form.addEventListener('submit',function(e) {
    e.preventDefault();
    let Error_Msg = ValidateForm();
    if (Error_Msg != no_errors){
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
    if (Error_Msg != no_errors){
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
    if (editing_book){
        alert("You cannot add a book while you are editing one!");
        return;
    }
    else{
    if (creating_book){
        HideBookForm();
    }
    else
        DisplayBookForm();
}
});
close_edit_book_form_button.addEventListener('click',function(){
    edit_book_popup.style.display = "none";
    editing_book = false;
});
function LoadStoredDetails(){
    if(localStorage.getItem("books_arr") === null) {
        books_arr = [];
        book_count = 0;
    }
    else {
        let BookObjects = localStorage.getItem('books_arr');
        BookObjects = JSON.parse(BookObjects);
        books_arr = BookObjects;
        DisplayAllBooks();
        if (book_count === NaN)
            book_count = books_arr.length;
        else
            book_count = localStorage.getItem('book_count');    
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