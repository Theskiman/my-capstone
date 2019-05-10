import React, {Component} from "react";
import "./SearchedBooks.css"



export default class SearchedBooks extends Component {
    state = {
        searchBook: "",
        books: this.props.books,
        buttonClicked: false,
        searchResults: []
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
      };


      handleSearchTitle = (event) => {
          console.log("hi")
          event.preventDefault()
          this.props.searchByTitle(this.state.searchBook).then(r => {
            console.log(r)
            this.setState({
              searchResults: r.items,
              buttonClicked: true
          })
          
        }) 
          .then(() => console.log(this.state.searchResults))
      }

      handleSearchAuthor = (event) => {
        console.log("hi")
        event.preventDefault()
        this.props.searchByAuthor(this.state.searchBook).then(r => {
          console.log(r)
          this.setState({
            searchResults: r.items,
            buttonClicked: true
        })
        
      }) 
        .then(() => console.log(this.state.searchResults))
    }
    handleSearchGenre = (event) => {
        console.log("hi")
        event.preventDefault()
        this.props.searchByGenre(this.state.searchBook).then(r => {
          console.log(r)
          this.setState({
            searchResults: r.items,
            buttonClicked: true
        })
        
      }) 
        .then(() => console.log(this.state.searchResults))
    }
        
      handleSaveBook = (event) => {
          if (event.target.parentNode.firstChild.nextSibling.nextSibling.getAttribute("src") !== ""){
            let userId = sessionStorage.getItem("userId")
            userId = parseInt(userId)
              let newBook = {
                  
                title: event.target.parentNode.firstChild.firstChild.textContent,
                author: event.target.parentNode.firstChild.firstChild.nextSibling.textContent,
                summary: event.target.parentNode.firstChild.firstChild.textContent,
                imgUrl: event.target.parentNode.firstChild.nextSibling.getAttribute("src"),
                userId: userId
                }
                this.props.addBook(newBook).then(() => this.props.history.push("/"))
            }
            else{
                console.log(event.target.parentNode.firstChild.nextSibling.nextSibling.getAttribute("src"))
                let userId = sessionStorage.getItem("userId")
                userId = parseInt(userId)
               let newBook = {
                title: event.target.parentNode.firstChild.firstChild.nextSibling.textContent,
                author: event.target.parentNode.firstChild.firstChild.nextSibling.nextSibling.textContent,
                summary: event.target.parentNode.firstChild.firstChild.nextSibling.nextSibling.nextSibling.textContent,
                imgUrl: "https://tse3.mm.bing.net/th?id=OIP.OcnLjfzboIj5HXnUmbVD1QHaGO&pid=Api&P=0&w=187&h=158",
                userId: sessionStorage.getItem(userId)
            }
            
                 this.props.addBook(newBook).then(() => this.props.history.push("/"))
      }}



      render() {
          console.log(this.state.searchResults)
          return(
              <React.Fragment>
                  <form
                                    className="bookSearch">
                    <div className="form-group">
                        <label>Search by Title</label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={this.handleFieldChange}
                           required id="searchBook"
                           value={this.state.searchBook}
                            placeholder="Search by Title"
                            />
                    </div>
                    <button 
                    type="button"
                    onClick={this.handleSearchTitle}
                    className="btn btn-primary mt-2"
                    
                    >Find by Title</button>
                    <button 
                    type="button"
                    onClick={this.handleSearchAuthor}
                    className="btn btn-primary mt-2"
                    
                    >Find by Author</button>
                    <button 
                    type="button"
                    onClick={this.handleSearchGenre}
                    className="btn btn-primary mt-2"
                    
                    >Find by Genre</button>
                  </form>
                  {(this.state.searchResults.length > 0) ?  
                  
                  <div className="mainSearch">    
                    
                    {
                        this.state.searchResults.map(book => 
                        <form  key={book.id} >
                          <div> 
                            <div className="searchedDiv">

                                <p> {book.volumeInfo.title} </p>
                                <p>{book.volumeInfo.authors}</p>
                                <p>{book.volumeInfo.description}</p>
                            </div>
                                {(book.volumeInfo.imageLinks !== undefined) ?
                            
                                <img src={book.volumeInfo.imageLinks.thumbnail} alt="oops"></img>

                                

                                :

                                <img src="https://tse3.mm.bing.net/th?id=OIP.OcnLjfzboIj5HXnUmbVD1QHaGO&pid=Api&P=0&w=187&h=158" alt="oops"></img>
                                }
                                
                                <button 
                                    type="button"
                                    onClick={this.handleSaveBook}
                                    className="saveBook btn btn-primary"
                                    id={book.id}
                                    >Save Book</button>
                            </div>
                        </form>
                        )
                    }

                  </div>
                  :

                   null
                  }
              </React.Fragment>
          )
      }
}