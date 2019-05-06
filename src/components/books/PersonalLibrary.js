import React, {Component} from "react";
import "./BookList.css"

let userId = sessionStorage.getItem("userId")
userId = parseInt(userId)

export default class PersonalLibrary extends Component {

 handleReview(id){
    sessionStorage.setItem("bookId", id)
    this.props.history.push("/review")
 }   

    render () {
        return (
            <article className="header">
                <h1 className="yourLib">Your Library</h1>
                <div className="searchButton">
                    <button type="button"
                            className="btn btn-success"
                            onClick={() => {
                                this.props.history.push("/search")
                            }}>Search Books</button>
                </div>
                
                <section className="bookList">
                {
                    this.props.books.map(book => 
                        (book.userId === userId) ?
                   ( <div key={book.id} className="libDiv">
                        <img src={book.imgUrl} alt="Oops"></img>
                        <div key={book.id} className="card">
                            <div className="card-body">
                            <h3 className="card-title">
                            <p>{book.title}</p>
                            <p>{book.author}</p>
                            <p>{book.summary}</p>
                            
                            <button
                                    onClick={() => this.props.deleteBook(book.id)}
                                    className="card-delete">Delete</button>
                            <button 
                                    type="button"
                                    onClick={()=>this.handleReview(book.id)}
                                    
                                    className="review-button">Review</button>
                            </h3>
                            </div>
                        </div>

                    </div>)
                    :
                    (null)
                        )
                }
                </section>
            </article>
        )
    }
}