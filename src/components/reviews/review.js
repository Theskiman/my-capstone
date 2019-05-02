import React, {Component} from "react";

export default class ReviewBook extends Component {
    state = {
        reviews: ""
    }
    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
      };

      handleAddReview = (review) => {
        //   event.preventDefault()
          this.props.postReview(review)
          .then(review => {
              this.setState({
                  reviews: review
              })
          })
      }

      handleEditReview = (editedReview) => {
          this.props.editReview(editedReview)
          .then(review => {
              this.setState({
                  review: review
              })
          })
      }

      render(){
          return(
              <React.Fragment>
                  <div>
                      
                  </div>

              </React.Fragment>

          )
      }
}