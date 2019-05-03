import React, {Component} from "react";
import ReviewManager from "../../modules/ReviewManager"


let userId = sessionStorage.getItem("userId")
userId = parseInt(userId)
let bookId = sessionStorage.getItem("bookId");
bookId = parseInt(bookId);

export default class ReviewBook extends Component {
    state = {
        reviews: {},
        newReview: ""
    }

    componentDidMount() {
        let bookId = sessionStorage.getItem("bookId");
        bookId = parseInt(bookId);
        
        ReviewManager.getAllReviews().then(allReviews => {
        let currentBookReview = allReviews.find(currentBook => currentBook.book.id === bookId)
        if(currentBookReview !== undefined){
          this.setState({
            "reviews": currentBookReview
          })}
          else{
              this.setState({
                  "reviews": ""
              })
          }
        })
    }
    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
      };

      handleAddReview = (evt) => {
          evt.preventDefault();
          
        const newReview = {
            userId: userId,
            bookId: bookId,
            review: this.state.newReview
        }
          this.props.postReview(newReview)
          .then(newReview => {
              this.setState({
                  newReview: newReview
              })
          }) 
          this.props.history.push("/")
      }

      handleEditReview = (editedReview) => {
          this.props.editReview(editedReview)
          .then(review => {
              this.setState({
                  reviews: review
              })
          })
      }

      render(){
            // console.log(this.state.reviews)
            
          return( 
              <React.Fragment>
                   <div className="reviewDiv">
                   {                                           
                         
                    
                          
                              (this.state.reviews.review !== "" && this.state.reviews !== "")  ?
                             ( <div className="trueReview">{this.state.reviews.review}</div>
                        )
                              :
                       (<div>       
                        <form
                                    className="addReview">
                    <div className="form-group">
                        <label>Add Your Review!!</label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={this.handleFieldChange}
                           required id="newReview"
                           
                            placeholder="Add Your Review"
                            />
                    </div>
                    <button 
                    type="button"
                    onClick={this.handleAddReview}
                    className="btn btn-primary mt-2"
                    
                    >Save Review!</button>
                  </form>
                </div>)
                          
                    
                  }

                  </div>

              </React.Fragment>

          )
      }
}