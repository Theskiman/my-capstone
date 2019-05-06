// const myApiUrl = "https://www.googleapis.com/books/v1/volumes?q=intitle:The Non-Canon Star Wars - Sith Lords&key=AIzaSyBCwcsCgOF-Ie11OlJBsJiDz-_1EobkIf0&maxResults=25&printType=books"
const key = "key=AIzaSyBCwcsCgOF-Ie11OlJBsJiDz-_1EobkIf0"
const apiURL = "http://localhost:5002"


// console.table(fetch(`${myApiUrl}`).then(e => e.json()))
export default {
 searchByTitle (bookName){ 
     return fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${bookName}&${key}&maxResults=25&printType=books`)
    .then(books => books.json())
    
 },
 searchByAuthor (author){ 
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${author}&${key}&maxResults=25&printType=books`)
   .then(books => books.json())
   
},

    getAllBooks() {
        return fetch(`${apiURL}/books`)
        .then(books => books.json())
    },
    getOneBook(id) {
        return fetch(`${apiURL}/books/${id}`)
        .then(book => book.json())
    },
    deleteBook(id) {
        return fetch(`${apiURL}/books/${id}`, {
            method: "DELETE"
        })
        .then(book => book.json())
        .then(() => this.getAllBooks())
    },
    postBook(newBook) {
        return fetch(`${apiURL}/books`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newBook)
        }).then(book => book.json())
    },
    putBook(editedBook) {
        return fetch(`${apiURL}/books/${editedBook.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(editedBook)
        }).then(data => data.json());
      }
}

    

