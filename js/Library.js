//DOM ELEMENTS
const add_book_form = document.querySelector('#add_book_form');
const edit_book_form = document.querySelector('#edit_book_form');
const all_books = document.querySelector('.all_books');
const add_book_button = document.querySelector('#add_book_button');
const entire_page = document.querySelector('.fullpage');
const add_book_popup = document.querySelector(".add_book_popup");
const edit_book_popup = document.querySelector('.edit_book_popup');
const close_edit_book_form_button = document.querySelector('#close_edit_book_form');
//variables to control forms display
let creating_book = false;
let editing_book = false;
//saving edited book index to allow editing of book attributes
let edited_book_idx;
//error msgs to allow for cleaner code in form validation function
let title_error_msg = "Title is too long.",author_error_Msg = "Author name is too long.",num_of_Pages_error_msg = "Number of pages is either too little or not even a number.",no_errors = "No errors.";
//book list that holds all the objects and the book count for keeping track
let books_arr = [];
let book_count = 0;
//book class contains construtor and get details which returns the book details as a string.
class book{
    constructor(title,author,num_of_pages,read){
        this.title = title;
        this.author = author;
        this.num_of_pages = num_of_pages;
        this.read = read;
    }
    get_details(){
        return "Book Number: " + book_count + ", Title: " + this.title + ", Author: " + this.author + ", Page Count: " + this.num_of_pages + ", This book's read status is: " + this.read;
    }
}
//store book
function store_book(book_object){
    //save book in book list
    books_arr.push(book_object);
    //save book in localstorage to allow for data persistence
    localStorage.setItem('books_arr', JSON.stringify(books_arr));
    book_count++;
    //save book count, useful for debugging and maybe could be used for a new feature later on
    localStorage.setItem('book_count',book_count);
}
function edit_book(){
    //get new edited book data, unedited data stays the same since edit book form was fed the old data
    books_arr[edited_book_idx].title = edit_book_form.elements[0].value;
    books_arr[edited_book_idx].author = edit_book_form.elements[1].value;
    books_arr[edited_book_idx].num_of_pages = edit_book_form.elements[2].value;
    //for some reason this doesn't work but it is too trivial to consider
    if (edit_book_form.elements[3].checked == true)
        books_arr[edited_book_idx].read = true;
    else
        books_arr[edited_book_idx].read = false;
        //modified book data has to be stored back in localstorage
        localStorage.setItem('books_arr', JSON.stringify(books_arr));
        display_all_books();
}
function create_book_div(book_obj){
    //initializing divs and buttons
    const book_div = document.createElement('div');
    const title_div = document.createElement('div');
    const author_div = document.createElement('div');
    const nop_div = document.createElement('div');
    const remove_book_button = document.createElement('button');
    const edit_book_button = document.createElement('button');
    const read_status_button = document.createElement('button');
    book_div.classList.add('book');
    book_div.setAttribute('id', books_arr.indexOf(book_obj));
    //data from add book form is used to assign book div elements values
    title_div.innerText = book_obj.title;
    title_div.classList.add('title_div');
    book_div.appendChild(title_div);
    author_div.innerText = book_obj.author;
    author_div.classList.add('author_div');
    book_div.appendChild(author_div);
    nop_div.innerText = book_obj.num_of_pages + " pgs";
    nop_div.classList.add('nop_div');
    book_div.appendChild(nop_div);
    read_status_button.classList.add('read_status_button');    
    book_div.appendChild(read_status_button);
    //checking to see if book status is read or not
    if(book_obj.read == false) {
        read_status_button.innerText = 'Not Read';
        read_status_button.style.backgroundColor = 'red';
    }
    else{
        read_status_button.innerText = 'Read';
        read_status_button.style.backgroundColor = 'green';
    }
    //edit book button details
    edit_book_button.innerText = "Edit Book";
    edit_book_button.classList.add('edit_book_button');
    book_div.appendChild(edit_book_button);
    //delete book button details
    remove_book_button.innerText = 'Delete Book'; 
    remove_book_button.classList.add('remove_book_button');
    book_div.appendChild(remove_book_button);
    //adding book to all_books div to be displayed
    all_books.appendChild(book_div);
    //event listeners
    remove_book_button.addEventListener('click',function(){
        //removes book object
        books_arr.splice(books_arr.indexOf(book_obj),1);
        //stores modified books list back to localstorage
        localStorage.setItem('books_arr', JSON.stringify(books_arr));
        //decrement book count
        book_count--;
        //store modified book count
        localStorage.setItem('book_count',book_count);
        //re-rendering books
        display_all_books();
        console.log("Total number of books: " + book_count);
    });
    read_status_button.addEventListener('click',function(){
        //switches book read status on click
        book_obj.read = !book_obj.read;
        //appropriate styling for read status
        if(book_obj.read == false) {
            read_status_button.innerText = 'Not Read';
            read_status_button.style.backgroundColor = 'red';
        }
        else {
            read_status_button.innerText = 'Read';
            read_status_button.style.backgroundColor = 'green';
        }
        //data is re-stored back in local storage
        localStorage.setItem('books_arr', JSON.stringify(books_arr));
        display_all_books();
    });
    edit_book_button.addEventListener('click',function(){
        //first checks if editing book button is clicked, if it is, nothing will happen
        if (!editing_book){
            //display edit book button
            edit_book_popup.style.display = "block";
            editing_book = true;
            //add old book data values in the input areas in case user decides to leave any data as it is 
            edit_book_form.elements[0].value = book_obj.title;
            edit_book_form.elements[1].value = book_obj.author;
            edit_book_form.elements[2].value = book_obj.num_of_pages; 
            //setting edited book index to the book that fired up the edit book button eventlistener
            edited_book_idx = books_arr.indexOf(book_obj);
        }
        else
            return;
    });
}
function validate_form(){
    //data is reterived to be validated incase it does not meet the constraints
    let temp_title;
    let temp_author;
    let temp_num_of_pages;
    //first checks if edit book button was pressed and in that case, edit book form will be validated      
    if (editing_book){
        temp_title = edit_book_form.elements[0].value;
        temp_author = edit_book_form.elements[1].value;
        temp_num_of_pages = edit_book_form.elements[2].value;        
    }
    //if edit book button was not pressed, add book form will be validated
    else{
        temp_title = add_book_form.elements[0].value;
        temp_author = add_book_form.elements[1].value;
        temp_num_of_pages = add_book_form.elements[2].value;
    }
    //simple if else block to check data against the constraints
    if (temp_title.length > 20)
        return title_error_msg;
    else if (temp_author.length > 20)
        return author_error_Msg;
    else if (temp_num_of_pages < 20 || isNaN(temp_num_of_pages))
        return num_of_Pages_error_msg;
    else
        return no_errors;
}
function add_new_book(){ 
    //when adding a new book, a new object is made with all the data from the add book form to make appending to the book list easy and smooth
    let new_book = new book();
    //data is read from form
    new_book.title = add_book_form.elements[0].value;
    new_book.author = add_book_form.elements[1].value;
    new_book.num_of_pages = add_book_form.elements[2].value;
    if (document.getElementById('read_status_yes').checked == true)
        new_book.read = true;
    else
        new_book.read = false;
    //calls store_book to make sure each added book is stored sequentially in order of form submission
    store_book(new_book);
    //book div created for every book
    create_book_div(new_book);
    //book details is logged in case of debugging or testing new features
    console.log(new_book.get_details());
    //book count is logged too
    console.log("Total number of books: " + book_count);
}
function display_all_books(){
    //this function will first remove each book in the library
    const books = document.querySelectorAll('.book');
    books.forEach(book => all_books.removeChild(book));
    //then the books will be added one by one
    for (let i = 0; i < books_arr.length; i++)
        create_book_div(books_arr[i]);
    //this is done in case a new book is added and needs to be displayed (instead of just appending directly to all_books div), or when books need to be re-rendered to apply changes
}
function display_book_form(){
    //dedicated function for displaying add book form
    add_book_button.innerText = "Cancel";
    add_book_popup.style.display = "block";
    creating_book = true;
}
function hide_book_form(){
    //depending on which book form is currently displayed, it will hide the displayed one and reset its flag to false
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
    //upon submitting form, form validation is applied
    e.preventDefault();
    let error_msg = validate_form();
    if (error_msg != no_errors){
        alert(error_msg);
        return;
    }
    //once it passes form validation, the book form is set to hidden and the book is added
    else {
        hide_book_form();
        add_new_book();
        //add book form is reset on every submission
        add_book_form.reset();
    }
});
edit_book_form && edit_book_form.addEventListener('submit',function(e){
    //just like add book form, form is validated
    e.preventDefault();
    let error_msg = validate_form();
    if (error_msg != no_errors){
        alert(error_msg);
        return;
    }
    //for validation passed, book form set to hidden and book is edited
    else {
        hide_book_form();
        edit_book();
        //edit book form is also reset when submitted
        edit_book_form.reset();
    }
});
add_book_button.addEventListener('click',function(){
    //pressing this button while editing a book will throw an alert
    if (editing_book){
        alert("You cannot add a book while you are editing one!");
        return;
    }
    //otherwise, will display the add book form if the flag is set to false, or hide it if the flag is set to true
    else{
    if (creating_book){
        hide_book_form();
    }
    else
        display_book_form();
}
});
close_edit_book_form_button.addEventListener('click',function(){
    //discards edits, dedicated button had to be added to avoid conflicting with display book form button
    edit_book_popup.style.display = "none";
    editing_book = false;
});
function load_stored_details(){
    //called at the start to retrieve any stored books on the device
    if(localStorage.getItem("books_arr") === null) {
        // if no stored books, just set everything to default
        books_arr = [];
        book_count = 0;
    }
    else {
        //otherwise, fetch stored books
        let book_objects = localStorage.getItem('books_arr');
        book_objects = JSON.parse(book_objects);
        books_arr = book_objects;
        //edge case where book count became NaN while debugging book count retrieval
        if (book_count === NaN)
            book_count = books_arr.length;
        else
            book_count = localStorage.getItem('book_count');
            //once all books are retrieved, they are to be displayed
            display_all_books();    
    }
}
//hide book forms, get stored books, and log book count
add_book_popup.style.display = "none";
edit_book_popup.style.display = "none";
load_stored_details();
console.log("Total number of books: " + book_count);