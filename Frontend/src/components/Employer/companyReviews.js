import Navigationbar from '../Student/Navbar/navbar_company';
import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import axios from 'axios';
import backendServer from '../../webConfig';

class companyReview extends Component {

    constructor(props) {
        super(props); 
            this.state = {
                reviews: [],
            }
}

componentWillMount() {
    console.log("Hi, I am in component will mount");
    axios.get(`${backendServer}company/reviews/${localStorage.getItem("name")}`)
    .then(res => {
        this.setState({ reviews: res.data });
    });
}

createElements(n) {
    var elements = [];
    for (let i = 0; i < n; i++) {
      elements.push(
        <i className='fa fa-star' aria-hidden='true' style={{ color: 'green' }}></i>,
      );
    }
    return elements;
  }

render() {
    console.log(this.state.reviews)
    let renderReviews;
    if (this.state.reviews) {
        renderReviews = this.state.reviews.map( rev => {
            return (
            <div>
                <hr />
                    <h4> "{rev.headline}" </h4>
                    <p style={{marginLeft: "10px"}}>{rev.rating}.0 {this.createElements(rev.rating)}</p>
                    <p style={{marginLeft: "10px"}}> {rev.description}</p>
                    <p style={{fontWeight: "bold", marginLeft: "10px",  padding: "0px"}}>Pros</p>
                    <p style={{marginLeft: "10px"}}>{rev.pros}</p>
                    <p style={{fontWeight: "bold", marginLeft: "10px"}}>Cons</p>
                    <p style={{marginLeft: "10px"}}>{rev.cons}</p>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <div>
                            <Button style={{marginLeft: "10px", backgroundColor: "green", border: "green"}}> Reply </Button>
                        </div>
                        <div>
                            <Button style={{backgroundColor: "transparent", border: "none", color: "grey", fontSize: "25px"}}><i class="far fa-heart"></i></Button> 
                            <Button style={{backgroundColor: "transparent", border: "none", color: "grey", fontSize: "25px"}}><i class="far fa-flag"></i></Button>
                        </div>
                    </div>
            </div>
            )
        })
    }
return(
    <React.Fragment>
    <Navigationbar />
    <div class='container'>
        <h1> {localStorage.getItem("name")} Reviews</h1>
    {renderReviews}
    </div>
    </React.Fragment>

)}
}

export default companyReview;