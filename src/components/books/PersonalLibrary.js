import React, {Component} from "react";
import "./BookList.css"
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Col, Row, UncontrolledCollapse, } from 'reactstrap';

export default class PersonalLibrary extends Component {

state ={
    userId: ""
}

constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

componentDidMount() {
    let userId = sessionStorage.getItem("userId")
    userId = parseInt(userId)
    console.log(userId)
    this.setState({
        userId: userId
    })

}



 handleReview(id){
    sessionStorage.setItem("bookId", id)
    this.props.history.push("/review")
 }   

 

    render () {
        

        return (
            <article className="header">
            <div className="background-image">
                <h1 className="yourLib">Your Library</h1>
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
                        ( book.userId === this.state.userId) ?
                   ( 
                <div key={book.id}>
                  <Row key={book.id}> 
                   <Col sm="6">
                     <div className="libDiv">
                        <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }} className="ugh">
                            <CardBody className="ugh2">
                                
                                <CardTitle className="bookTitle">{book.title}</CardTitle>
                                <CardSubtitle className="bookAuthor">{book.author}</CardSubtitle>
                                
                                <CardImg className="bookImage" src={book.imgUrl} alt="Oops"/>
                                <Button 
                   color="danger"
                   onClick={() => this.props.deleteBook(book.id)}
                   className="card-delete mt-2">Delete</Button>
           <Button 
                   type="button"
                   color="info"
                   onClick={()=>this.handleReview(book.id)}
                   
                   className="review-button">Review</Button>
                        </CardBody>
                                <Button color="primary" id={`toggle${book.id}`} style={{ marginBottom: '1rem' }}>Toggle</Button>
        <UncontrolledCollapse toggler={`#toggle${book.id}`}>
          <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
            <CardBody className="summary">
            {book.summary}
            </CardBody>
          </Card>
        </UncontrolledCollapse>
                        </Card>
                        </div>
                    </Col>
                   </Row> 
                   
        </div>
                    )
                    :
                    (null)
                        )
                }
                </section>
                </div>
            </article>
        )
    }
}