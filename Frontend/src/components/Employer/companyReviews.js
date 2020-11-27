import Navigationbar from '../Student/Navbar/navbar_company';
import React, { Component } from 'react';
import {CardImg, Button } from 'react-bootstrap';
import axios from 'axios';
import backendServer from '../../webConfig';

class companyReview extends Component {

    constructor(props) {
        super(props); 
            this.state = {
                reviews: [],
                companyName: "Facebook"
            }
}

componentWillMount() {
    axios.get(`${backendServer}/glassdoor/company/reviews/${this.state.companyName}}`)
    .then(res => {
        this.setState({ reviews: res.data });
    });
}

render() {
    let renderReviews;
    if (this.state.review) {
        renderReviews = this.state.reviews.map( review => {
            <div>
            <h1> {review.headline} </h1>
            <h4> {review.description}</h4>
            <p>{review.pros}</p>
            <p>{review.cons}</p>
            <p>{review.rating}</p>
            </div>
        })
    }
return(
    <React.Fragment>
    <Navigationbar />
    {renderReviews}
    </React.Fragment>

)}
}

export default companyReview;