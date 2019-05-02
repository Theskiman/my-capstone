import React, {Component} from "react";

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


      handleSearch = (event) => {
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
    
        
      handleSaveBook = (event) => {
        if (event.target.parentNode.firstChild.nextSibling.nextSibling.imageLinks === undefined){
            let newBook = {
                title: event.target.parentNode.firstChild.textContent,
                author: event.target.parentNode.firstChild.nextSibling.textContent,
                imgUrl: "https://tse3.mm.bing.net/th?id=OIP.OcnLjfzboIj5HXnUmbVD1QHaGO&pid=Api&P=0&w=187&h=158"
          }
        }
        else{
               let newBook = {
                title: event.target.parentNode.firstChild.textContent,
            author: event.target.parentNode.firstChild.nextSibling.textContent,
            imgUrl: event.target.parentNode.firstChild.nextSibling.nextSibling.imageLinks.thumbnail
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
                    onClick={this.handleSearch}
                    className="btn btn-primary mt-2"
                    
                    >Find Book</button>
                  </form>
                  {(this.state.searchResults.length > 0) ?  
                  
                  <div>
                      <h1>RESULTS!!!!!!</h1>
                    {
                        this.state.searchResults.map(book => 
                        <form  key={book.id} >
                            <div className="card">
                                <p> {book.volumeInfo.title} </p>
                                <p>{book.volumeInfo.authors}</p> 
                                <img src={book.volumeInfo.imageLinks.thumbnail} alt="oops"></img>
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

                   <h1>Oops</h1>
                  }
              </React.Fragment>
          )
      }
}