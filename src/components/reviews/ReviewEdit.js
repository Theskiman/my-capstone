import React, {Component} from "react";
import ReviewManager from "../../modules/ReviewManager"
import "./ReviewEdit.css"
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Col, Row, UncontrolledCollapse, } from 'reactstrap';

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
                    <div className="background-image">
                        <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }} className="reviewCard">
                        <form>
                        <label className="editLabel">Change Your Review!!</label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={this.handleFieldChange}
                           required 
                           value={this.state.review}
                           id="review"

                            // value={this.state.review}
                            />
                            <Button 
                                color="info"
                                onClick={this.handleEditReview}
                                id={this.state.id}
                                className="editReviewButton card-delete mt-2"
                                >Update</Button>
                        </form>
                        </Card>
                    </div>

            </React.Fragment>
        )
    }

}