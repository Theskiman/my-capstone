import React, {Component} from "react";
import "./BookList.css"

export default class PersonalLibrary extends Component {

    render () {
        return (
            <article className="header">
                <h1>Your Library</h1>
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
                    <div>
                        <img src={book.imgUrl} alt="Oops"></img>
                        <div key={book.id} className="card">
                            <div className="card-body">
                            <h3 className="card-title">
                            <h4>{book.title}</h4>
                            <h5>{book.author}</h5>
                            <p>{book.summary}</p>
                            <button
                                    onClick={() => this.props.deleteBook(book.id)}
                                    className="card-delete">Delete</button>
                            <button 
                                    onClick={() => this.props.history.push("/review")}
                                    className="review-button">Review</button>
                            </h3>
                            </div>
                        </div>

                    </div>
                        )
                }
                </section>
            </article>
        )
    }
}