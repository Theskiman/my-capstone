import React, {Component} from "react";
import ReviewManager from "../../modules/ReviewManager"



export default class ReviewEdit extends Component {

    state = {
        
        userId: "",
      bookId: "",
      review: "",
      id: ""

    }

    componentDidMount() {
        let bookId = sessionStorage.getItem("bookId");
        bookId = parseInt(bookId);
        
        ReviewManager.getAllReviews().then(allReviews => {
        let currentBookReview = allReviews.find(currentBook => currentBook.book.id === bookId)
        
          this.setState({
            "review": currentBookReview.review,
            "userId": parseInt(currentBookReview.userId),
            "bookId": parseInt(currentBookReview.bookId),
            "id": parseInt(currentBookReview.id)
          })
          
        })
    }
    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
      };

    handleEditReview = () => {
        
        let editedReview = {
            "userId": this.state.userId,
            "review": this.state.review,
            "bookId": this.state.bookId,
            "id": this.state.id
        }
        this.props.editReview(editedReview)
        .then(() => this.props.history.push("/")
        )}

    render(){
        console.log(this.state.id)
        return(
            <React.Fragment>
                    <div>
                        <form>
                        <label>Change Your Review!!</label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={this.handleFieldChange}
                           required 
                           id="review"

                            // value={this.state.review}
                            />
                            <button 
                                type="button"
                                onClick={this.handleEditReview}
                                id={this.state.id}
                                className="editReviewButton"
                                >Update</button>
                        </form>
                    </div>

            </React.Fragment>
        )
    }

}