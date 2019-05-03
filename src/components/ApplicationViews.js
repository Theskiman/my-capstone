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
        BooksManager.getAllBooks().then(allBooks => {
            this.setState({
                books: allBooks
            })
        })
        UserManager.getAllUsers().then(users => {
            this.setState({
              users: users
            })
          })
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
    postUser = (newUser) => {
        return UserManager.postUser(newUser)
        
      }

      postReview = (newReview) => {
          return ReviewManager.postReview(newReview)

      }

      getAllReviews(){
        return ReviewManager.getAllReviews()
        .then(reviews => {
          return reviews
         
        })
      }

      getReview(){
          return ReviewManager.getAllReviews()
          .then(reviews => {
              return reviews
          })
      }

      editReview = (editedReview) => {
          return ReviewManager.editReview(editedReview)
          .then(review => {
              return review
          })
      }

    render() {
        return (
            <React.Fragment>
                <Route
                    exact path="/login" render={props =>{
                        return <Login users={this.state.users} {...props} postUser={this.postUser} getAllUsers={this.getAllUsers} />
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
            </React.Fragment>
        )
    }
}