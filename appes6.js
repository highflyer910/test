// Book constructor

function Book(title, author, isbn){
   this.title = title;
   this.author = author;
   this.isbn = isbn;
}

// UI cnstructor

function UI(){

}

// Add book to list
UI.prototype.addBookToList = function(book){
  const list = document.getElementById('book-list');
  // Create tr element
  const row = document.createElement('tr');

  // Insert cols
  row.innerHTML = `
       <td>${book.title}</td>
       <td>${book.author}</td>
       <td>${book.isbn}</td>
       <td><a href="#" class="delete">X</a></td>
    `;
    list.appendChild(row);
}


// show alert
UI.prototype.showAlert = function(message, className){
   const div = document.createElement('div');
   div.className = `alert ${className}`;
   div.appendChild(document.createTextNode(message));
   const container = document.querySelector('.container');
   const form = document.querySelector('#book-form');
   container.insertBefore(div, form);

   setTimeout(function(){
    document.querySelector('.alert').remove();
   }, 3000);
}

// Delete Book
UI.prototype.deleteBook = function(target){
  if(target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
}



// Clear fields
UI.prototype.clearFields = function(){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}




// Event listener for add book

document.getElementById('book-form').addEventListener('submit', function(e){
  //get from values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value
    // Instantiate book
    const book = new Book(title, author, isbn);
    const ui = new UI();
    //validate
    if(title === '' || author === '' || isbn === ''){
      ui.showAlert('Please fill in all fields', 'error');
    } else {
      ui.addBookToList(book);
      ui.showAlert('Book added!', 'success');
        ui.clearFields();
    }    
  e.preventDefault();
});




// Event Listener for delete
document.getElementById('book-list').addEventListener('click', function(e){

  // Instantiate UI
  const ui = new UI();

  // Delete book
  ui.deleteBook(e.target);

  // Show message
  ui.showAlert('Book Removed!', 'success');

  e.preventDefault();
});