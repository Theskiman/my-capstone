import React, {Component} from "react";

export default class SearchedBooks extends Component {
    state = {
        searchBook: "",
        books: this.props.books,
        buttonClicked: false,
        searchResults: ""
    }


    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
      };

    //   searchButtonClicked = () => {
    //       return this.setState({searchResults: this.props.books})
    //   }

      handleSearch = (event) => {
          console.log("hi")
          event.preventDefault()
          this.props.searchByTitle(this.state.searchBook).then(r => this.setState({
              searchResults: r
          }))
      }



      render() {
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
                  {this.state.searchResults !== "" ?  
                  <div>
                    {
                        this.state.searchResults.items.map(book => {
                           return book.volumeInfo.title
                            // book.author
                            
                        })
                    }

                  </div>
                  :

                   null
                  }
              </React.Fragment>
          )
      }
}