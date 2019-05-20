import React, {Component} from "react";
import ReviewManager from "../../modules/ReviewManager"
import "./review.css"
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Col, Row, UncontrolledCollapse, } from 'reactstrap';

let userId = sessionStorage.getItem("userId")
userId = parseInt(userId)
let bookId = sessionStorage.getItem("bookId");
bookId = parseInt(bookId);

export default class ReviewBook extends Component {
    state = {
        reviews: {},
        newReview: "",
        books: [],
        book: []
    }

    static getDerivedStateFromProps(nextProps,state,) {
        if(nextProps.books !== state.books){
           let bookPicture = nextProps.books.filter(book => 
              book.id === bookId
                )
                return{book: bookPicture}
        }
        else{
            return null
        }
        
    }

    

    componentDidMount = async() => {
        let bookId = sessionStorage.getItem("bookId");
        bookId = parseInt(bookId);
        
        const promise = await ReviewManager.getAllReviews()
        const taco = await promise

        console.log(taco)
        let currentBookReview = taco.find(currentBook => currentBook.book.id === bookId && currentBook.book.userId === userId)
        if(currentBookReview !== undefined){
          this.setState({
            "reviews": await currentBookReview
          })}
          else{
              this.setState({
                  "reviews": ""
              })
          }
        }
    
    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
      };

      handleAddReview = (evt) => {
          evt.preventDefault();
          let bookId = sessionStorage.getItem("bookId");
bookId = parseInt(bookId);
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


      handleDeleteReview = (event) => {
          
        
          this.props.deleteReview(event.target.id)
          .then(() => this.props.history.push("/"))
      }

      render(){
          console.log(this.state.reviews)
            
            
          return( 
              <React.Fragment>
                   <div className="reviewDiv">
                   {                                           
                         
                    
                          
                              (this.state.reviews.review !== "" && this.state.reviews !== "")  ?
                        (<form> 
                             <div className="background-image">
                              <img src={this.state.reviews.book && this.state.reviews.book.imgUrl} alt="oops"></img>
                              <h1>{this.state.reviews.book && this.state.reviews.book.title}</h1>
                              <h2>{this.state.reviews.book && this.state.reviews.book.author}</h2>
                              {/* <p>{this.state.reviews.id}</p> */}
                              <p className="trueReview">{this.state.reviews.review}</p>
                                
                              <button 
                                type="button"
                                id={this.state.reviews.id}
                                onClick={this.handleDeleteReview}
                                className="reviewDelete"
                                >Delete Review</button>
                                <button 
                                type="button"
                                onClick={() => this.props.history.push("/review/edit")}
                                className="reviewDelete"
                                >Change Review</button>
                                </div>
                             </form>)
                        
                              :
                       (<div>  
                           <div className="background-image">     
                        <form
                                    className="addReview">
                    <div className="form-group flexReview">
                        <label className="addColor">Add Your Review!!</label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={this.handleFieldChange}
                           required id="newReview"
                           
                            
                            />
                    </div>
                    <button 
                    type="button"
                    onClick={this.handleAddReview}
                    className="btn btn-primary mt-2 saveReview"
                    
                    >Save Review!</button>
                    {
                        

                        this.state.book.map(book => 
                            
                            (
                                <CardImg className="bookImage" src={book.imgUrl} alt="Oops" />
                            )
                                                     ) 
                                                     }
                  </form>
                  </div>
                </div>)
                          
                    
                  }

                  </div>

              </React.Fragment>

          )
      }
}