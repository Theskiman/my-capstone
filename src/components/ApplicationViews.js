import { Route, Redirect } from "react-router-dom"
import React, { Component } from "react";
import BooksManager from "../modules/BooksManager"
import Login from "./Authentication/Login"
import UserManager from "../modules/UserManager"
import RegisterForm from "./Authentication/Register"
import PersonalLibrary from "./books/PersonalLibrary"
import SearchBooks from "./books/SearchBooks"
import ReviewBook from "./reviews/review";
import ReviewManager from "../modules/ReviewManager";
import ReviewEdit from "./reviews/ReviewEdit";

export default class ApplicationViews extends Component {
    isAuthenticated = () => sessionStorage.getItem("userId") !== null

    state = {
        "users": [],
        "books": [],
        "reviews": [],
        "friends": [],
        "searchedBooks": []
    }
    componentDidMount() {
        console.log("mount")

        let newState = {}
        BooksManager.getAllBooks()
        .then(allBooks => newState.books = allBooks)
        .then(() => UserManager.getAllUsers())
        .then(users => newState.users = users)
        .then(() => this.setState(newState))
        
    }

    editBook = (editedBook) => {
        return BooksManager.putBook(editedBook)
          .then(() => BooksManager.getAllBooks())
          .then(books => {
            this.setState({
              books: books
            })
          })
      }
    deleteBook = (book) => {
        return BooksManager.deleteBook(book)
        .then(() => BooksManager.getAllBooks())
        .then(books => {
            this.setState({
                books: books
            })
        })
    }
    addBook = (book) => {
        return BooksManager.postBook(book)
        .then(() => BooksManager.getAllBooks())
        .then(books => {
            this.setState({
                books: books
            })
        })
    }
    searchByTitle = (bookTitle) => {
        console.log(bookTitle)
        return BooksManager.searchByTitle(bookTitle)
        .then(searchedBooks => {
            console.log(searchedBooks)
            return searchedBooks
        })
    }
    searchByAuthor = (author) => {
      console.log(author)
      return BooksManager.searchByAuthor(author)
      .then(searchedBooks => {
          console.log(searchedBooks)
          return searchedBooks
      })
  }
  searchByGenre = (genre) => {
    console.log(genre)
    return BooksManager.searchByGenre(genre)
    .then(searchedBooks => {
        console.log(searchedBooks)
        return searchedBooks
    })
}

    postUser = (newUser) => {
        return UserManager.postUser(newUser)
        
      }

      postReview = (newReview) => {
          return ReviewManager.postReview(newReview)

      }

      editReview = (editedReview, id) => {
        console.log(editedReview)
          return ReviewManager.editReview(editedReview, id)
          .then(review => {
              return review
          })
      }

      deleteReview = (review) => {
        return ReviewManager.deleteReview(review)
        .then(review => {
          return review
        }
        )
    }

    render() {
        return (
            <React.Fragment>
                <Route
                    exact path="/login" render={props =>{
                        return <Login users={this.state.users}  {...props} postUser={this.postUser} getAllUsers={this.getAllUsers} />
                    }}
                    />
                    <Route 
           path="/register" render={props => {
             return <RegisterForm users={this.state.users} {...props} postUser={this.postUser}/>
           }}
        />
        <Route
          exact path="/" render={props => {
            if(this.isAuthenticated()) {
            return <PersonalLibrary {...props}
            deleteBook={this.deleteBook}
            addBook={this.addBook}
            books={this.state.books}/>
          } else {
            return <Redirect to="/login"/>
          }
        }}
        />
        <Route
           path="/search" render={props => {
            if(this.isAuthenticated()) {
            return <SearchBooks {...props}
            searchByTitle={this.searchByTitle}
            searchByAuthor={this.searchByAuthor}
            searchByGenre={this.searchByGenre}
            addBook={this.addBook}
            books={this.state.books}
            searchedBooks={this.state.searchedBooks}
            />
          } else {
            return <Redirect to="/login"/>
          }
        }}
        />

        <Route
           exact path="/review" render={props => {
            if(this.isAuthenticated()) {
            return <ReviewBook {...props}
            deleteReview={this.deleteReview}
            getReview={this.getReview}
            postReview={this.postReview}
            reviews={this.state.reviews}
            books={this.state.books}
            getAllReviews={this.getAllReviews}
            />
          } else {
            return <Redirect to="/login"/>
          }
        }}
        />
        <Route
           exact path="/review/edit" render={props => {
            if(this.isAuthenticated()) {
            return <ReviewEdit 
            {...props}
            editReview={this.editReview}
            getReview={this.getReview}
            reviews={this.state.reviews}
            books={this.state.books}
            getAllReviews={this.getAllReviews}
            />
          } else {
            return <Redirect to="/login"/>
          }
        }}
        />
            </React.Fragment>
        )
    }
}