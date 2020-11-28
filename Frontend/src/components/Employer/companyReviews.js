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
                fileText: ''
            }
}

componentWillMount() {
    axios.get(`${backendServer}company/reviews/${localStorage.getItem("name")}`)
    .then(res => {
        this.setState({ reviews: res.data });
    });
}

handleOnClick = (e) => {
    const data = {
        id: e.target.parentElement.id,
        value: e.target.parentElement.value
    }
    console.log(data);
    axios.post(`${backendServer}company/reviews/favourite`, data)
    .then(response => {     
        if(response.status === 200) {
            window.location = '/company/reviews'
        }
    })
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
            let favourite = <i class="far fa-heart"></i>;
            let featured = <i class="far fa-flag"></i>
            let button1;
            let button2;

            if (rev.favorite ==='true' && rev.featured === 'true') {
                button1 = <button id = {rev._id} style={{backgroundColor: "transparent", border: "none", color: "red", fontSize: "25px"}} onClick={this.handleOnClick} value='favourite'> <i class="fas fa-heart"></i> </button>
                button2 = <button id = {rev._id} style={{backgroundColor: "transparent", border: "none", color: "red", fontSize: "25px"}} onClick={this.handleOnClick} value='featured'> <i class="fas fa-flag"></i> </button>
            }
            else if(rev.favorite === 'true') {
                button1 = <button id = {rev._id} style={{backgroundColor: "transparent", border: "none", color: "red", fontSize: "25px"}} onClick={this.handleOnClick} value='favourite'> <i class="fas fa-heart"></i> </button>
                button2 = <button id = {rev._id} style={{backgroundColor: "transparent", border: "none", color: "grey", fontSize: "25px"}} onClick={this.handleOnClick} value='featured'> {featured} </button>
            } else if (rev.featured === 'true') {
                button1 = <button id = {rev._id} style={{backgroundColor: "transparent", border: "none", color: "grey", fontSize: "25px"}} onClick={this.handleOnClick} value='favourite'> {favourite} </button>
                button2 = <button id = {rev._id} style={{backgroundColor: "transparent", border: "none", color: "red", fontSize: "25px"}} onClick={this.handleOnClick} value='featured'> <i class="fas fa-flag"></i> </button>
            } else {
                button1 = <button id = {rev._id} style={{backgroundColor: "transparent", border: "none", color: "grey", fontSize: "25px"}} onClick={this.handleOnClick} value='favourite'> {favourite} </button>
                button2 = <button id = {rev._id} style={{backgroundColor: "transparent", border: "none", color: "grey", fontSize: "25px"}} onClick={this.handleOnClick} value='featured'> {featured} </button>
            }
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
                            {button1}
                            {button2}
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