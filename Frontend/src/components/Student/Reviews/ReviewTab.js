import React, { Component } from 'react';
import Navbar from '../../Student/Navbar/navbar_student';
import { Link } from 'react-router-dom';
import {Container,Col,Row, Form, Dropdown,Button,Alert, ButtonGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveReview } from '../../../store/actions/studentReviewAction';
import "react-bootstrap/ModalHeader";
import axios from 'axios';
import backendServer from '../../../webConfig';
import { ReviewList } from './ReviewList';
import { Doughnut } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

class ReviewTab extends Component {
  constructor(props) {
    super(props);
    this.routeParam = props.match.params.companyName;
    this.changeHandler = this.changeHandler.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    
  
  }

  componentDidMount() {
   const data=  this.getReview();
   this.getAverageRating();
  }
getReview=() =>{
  axios.get(`${backendServer}company/reviews/${this.routeParam}`)
        .then(res => {
         
            if(res.status === 200){
                if(res.data){
                    console.log(res.data)
                    this.props.saveReview(res.data)
                   
                    //this.props.saveEvents(res.data);
                }
            }
        })
};

getAverageRating=() =>{
  console.log(this.props.review)
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

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleCheckboxChange(e) {
    this.setState({ workType: e.target.value });
  }

  temp = {
    title: "Recommend to a Friend",
    dataDoughnut: {
      datasets: [
        {
          data: [70,30],
          backgroundColor: ["#008000", "#DCDCDC"],
        }
      ]
    }
  }

  render() {
    return (
      <React.Fragment>
      <Navbar />                                      
        <Row>           
        <Col sm={8} md={8} lg={8}>
              <h4 style={{ color: '#3BB143', float: 'left' }}>Reviews</h4>
              <br />
              <Col sm={4} md={4} lg={4}>
              <div style={{display: "flex", justifyContent: "space-between"}}>
                <div>
                <p style={{marginLeft: "10px", padding: "25px"}}>{4}.0 {this.createElements(4)}</p>
                <p style={{fontWeight: "light",fontSize: "15px", marginLeft: "0px", padding: "60px"}}>Overall Rating</p>
           
                </div>
                <div>
                <MDBContainer>
                <Doughnut data={this.temp.dataDoughnut}  />
                <p style={{fontWeight: "light",fontSize: "15px", marginLeft: "60px",  padding: "0px"}}>Recommend to a Friend</p>
              </MDBContainer>
              </div>
              <div>
                <MDBContainer>
                <Doughnut data={this.temp.dataDoughnut}  />
                <p style={{fontWeight: "light",fontSize: "15px", marginLeft: "90px",  padding: "0px"}}>Approve of CEO</p>
              </MDBContainer>
              </div>
            </div>
        </Col>
              <React.Fragment>
<div>
<ReviewList reviewList = { this.props.review } ></ReviewList>   
 </div>
 </React.Fragment>
 
              </Col>
        <Col sm={4} md={4} lg={4}>
                <Button variant="primary" href="/company/addreview">+ Add Reivew</Button>
                </Col>
                </Row>
                </React.Fragment> 
    );
  }
  
}

ReviewTab.propTypes = {
  status: PropTypes.object.isRequired,
  saveReview:PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  review: state.review,
});
const mapDispatchToProps = (dispatch) => {
  return {
    saveReview: (data) => dispatch(saveReview(data)),
   
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(ReviewTab);


