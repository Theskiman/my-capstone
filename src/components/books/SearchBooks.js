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
                            
                          <p> {book.volumeInfo.title} </p>
                            // book.author
                            
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