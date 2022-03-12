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
function book(title,author,num_of_pages,read){
    this.title = title;
    this.author = author;
    this.num_of_pages = num_of_pages;
    this.read = read;
}
book.prototype.print_details = function(){
    return "Book Number: " + book_count + ", Title: " + this.title + " Author: " + this.author + " Page Count: " + this.num_of_pages + " This book's read status is: " + this.read;
}
function store_book(book_object){
    books_arr.push(book_object);
    localStorage.setItem('books_arr', JSON.stringify(books_arr));
    book_count++;
    localStorage.setItem('book_count',book_count);
}
function edit_book(){
    books_arr[edited_book_idx].title = edit_book_form.elements[0].value;
    books_arr[edited_book_idx].author = edit_book_form.elements[1].value;
    books_arr[edited_book_idx].num_of_pages = edit_book_form.elements[2].value;
    if (edit_book_form.elements[3].checked == true)
        books_arr[edited_book_idx].read = true;
    else
        books_arr[edited_book_idx].read = false;
        localStorage.setItem('books_arr', JSON.stringify(books_arr));
        display_all_books();
}
function create_book_div(book_obj){
    const book_div = document.createElement('div');
    const title_div = document.createElement('div');
    const author_div = document.createElement('div');
    const nop_div = document.createElement('div');
    const remove_book_button = document.createElement('button');
    const edit_book_button = document.createElement('button');
    const read_status_button = document.createElement('button');
    book_div.classList.add('book');
    book_div.setAttribute('id', books_arr.indexOf(book_obj));
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
    if(book_obj.read == false) {
        read_status_button.innerText = 'Not Read';
        read_status_button.style.backgroundColor = 'red';
    }
    else{
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
        books_arr.splice(books_arr.indexOf(book_obj),1);
        localStorage.setItem('books_arr', JSON.stringify(books_arr));
        display_all_books();
        book_count--;
        localStorage.setItem('book_count',book_count);
    });
    read_status_button.addEventListener('click',function(){
        book_obj.read = !book_obj.read;
        if(book_obj.read == false) {
            read_status_button.innerText = 'Not Read';
            read_status_button.style.backgroundColor = 'red';
        }
        else {
            read_status_button.innerText = 'Read';
            read_status_button.style.backgroundColor = 'green';
        }
        localStorage.setItem('books_arr', JSON.stringify(books_arr));
        display_all_books();
    });
    edit_book_button.addEventListener('click',function(){
        if (!editing_book){
            edit_book_popup.style.display = "block";
            editing_book = true;
            edit_book_form.elements[0].value = book_obj.title;
            edit_book_form.elements[1].value = book_obj.author;
            edit_book_form.elements[2].value = book_obj.num_of_pages; 
            edited_book_idx = books_arr.indexOf(book_obj);
        }
        else
            return;
    });
}
function validate_form(){
    let temp_title;
    let temp_author;
    let temp_num_of_pages;      
    if (editing_book){
        temp_title = edit_book_form.elements[0].value;
        temp_author = edit_book_form.elements[1].value;
        temp_num_of_pages = edit_book_form.elements[2].value;        
    }
    else{
        temp_title = add_book_form.elements[0].value;
        temp_author = add_book_form.elements[1].value;
        temp_num_of_pages = add_book_form.elements[2].value;
    }
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
    //console.log("function was called");
    // if (book_count >= 39){
    //     alert("limit reached.");
    //     return;
    // }
    let new_book = new book();
    new_book.title = add_book_form.elements[0].value;
    new_book.author = add_book_form.elements[1].value;
    new_book.num_of_pages = add_book_form.elements[2].value;
    if (document.getElementById('read_status_yes').checked == true)
        new_book.read = true;
    else
        new_book.read = false;
    store_book(new_book);
    create_book_div(new_book);
    console.log(new_book.print_details());
    // console.log("function reached end.");
}
function display_all_books(){
    const books = document.querySelectorAll('.book');
    books.forEach(book => all_books.removeChild(book));
    for (let i = 0; i < books_arr.length; i++)
        create_book_div(books_arr[i]);
}
function display_book_form(){
    add_book_button.innerText = "Cancel";
    add_book_popup.style.display = "block";
    creating_book = true;
}
function hide_book_form(){
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
    let error_msg = validate_form();
    if (error_msg != no_errors){
        alert(error_msg);
        return;
    }
    else {
        hide_book_form();
        add_new_book();
        add_book_form.reset();
    }
});
edit_book_form && edit_book_form.addEventListener('submit',function(e){
    e.preventDefault();
    let error_msg = validate_form();
    if (error_msg != no_errors){
        alert(error_msg);
        return;
    }
    else {
        hide_book_form();
        edit_book();
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
        hide_book_form();
    }
    else
        display_book_form();
}
});
close_edit_book_form_button.addEventListener('click',function(){
    edit_book_popup.style.display = "none";
    editing_book = false;
});
function load_stored_details(){
    if(localStorage.getItem("books_arr") === null) {
        books_arr = [];
        book_count = 0;
    }
    else {
        let book_objects = localStorage.getItem('books_arr');
        book_objects = JSON.parse(book_objects);
        books_arr = book_objects;
        display_all_books();
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
// const test = new book("The Power of Habit","Charles Duhigg","371",true);
// store_book(test);
// create_book_div(Test);
// }
load_stored_details();