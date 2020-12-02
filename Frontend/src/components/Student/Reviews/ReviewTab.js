import React, { Component } from 'react';
import Navbar from '../../Student/Navbar/navbar_student';
import { Link } from 'react-router-dom';
import {Container,Col,Row, Form, Dropdown,Button,Alert, ButtonGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveReview,saveAverageRating,saveFeaturedReview,saveNegativeReview,savePositiveReview } from '../../../store/actions/studentReviewAction';
import "react-bootstrap/ModalHeader";
import axios from 'axios';
import backendServer from '../../../webConfig';
import { ReviewList } from './ReviewList';
import { Charts } from './Charts';
import {FeaturedReview} from './FeaturedReview';
import {PositiveReview} from './PositiveReview';
import {NegativeReview} from './NegativeReview';
import HomeTabs from '../Tabs/homeTabs';
class ReviewTab extends Component {
  constructor(props) {
    super(props);
    this.changeHandler = this.changeHandler.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  componentDidMount() {
   this.getReview();
   this.getAverageRating();
   this.getPositiveReview();
   this.getNegativeReview();
   this.getFeaturedReview();
  }
getReview=() =>{
  axios.get(`${backendServer}student/reviews/${this.props.match.params.companyName}`)
        .then(res => {
            if(res.status === 200){
                if(res.data){
                    this.props.saveReview(res.data)
                   console.log(this.props.review)
                    //this.props.saveEvents(res.data);
                }
            }
        })
};

getPositiveReview=() =>{
  axios.get(`${backendServer}company/reviews/positive/${this.props.match.params.companyName}`)
        .then(res => {
            if(res.status === 200){
                if(res.data){
                    this.props.savePositiveReview(res.data)
                    console.log(this.props.positive)
                }
            }
        })
};

getNegativeReview=() =>{
  axios.get(`${backendServer}company/reviews/negative/${this.props.match.params.companyName}`)
        .then(res => {
            if(res.status === 200){
                if(res.data){
                    this.props.saveNegativeReview(res.data)
                    console.log(this.props.negative)
                }
            }
        })
};
getFeaturedReview=() =>{
  axios.get(`${backendServer}company/reviews/featured/${this.props.match.params.companyName}`)
        .then(res => {
            if(res.status === 200){
                if(res.data){
                    this.props.saveFeaturedReview(res.data)
                    console.log(this.props.featured)
                }
            }
           
        })
        
};

getAverageRating=() =>{
  axios.get(`${backendServer}company/reviews/rating/${this.props.match.params.companyName}`)
        .then(res => {
          
            if(res.status === 200){
                if(res.data){
                    this.props.saveAverageRating(res.data)
                    console.log(this.props.avgRating)
                }
            }
        })
};
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

   createElements=(n) => {
    var elements = [];
    for (let i = 0; i < n; i++) {
      elements.push(
        <i className='fa fa-star' aria-hidden='true' style={{ color: 'green' }}></i>,
      );
    }
    return elements;
  } 
  addVote = (id) => {
    const data = {
        _id: id, 
    }
    console.log(data);
    axios.post(`${backendServer}student/reviews/helpful`, data)
    .then(response => {     
        if(response.status === 200) {
           console.log("vote added.")
        }
    })
}
  render() {
    return (
      <React.Fragment>
      <HomeTabs />                                     
        <Row>           
        <Col sm={8} md={8} lg={8}>
        <h4 style={{ color: '#3BB143', float: 'left' }}>Reviews</h4>
        <br />
        <Col sm={4} md={4} lg={4}>
        <React.Fragment>
          <div>
          <Charts charts= {this.props.avgRating}></Charts>
          </div>
        </React.Fragment>
        </Col>
        <React.Fragment>
        <div>
        <FeaturedReview featuredReview = { this.props.featured } ></FeaturedReview>
        <PositiveReview positiveReview = { this.props.positive } ></PositiveReview>
        <NegativeReview negativeReview = { this.props.negative } ></NegativeReview>
        <ReviewList reviewList = { this.props.review } ></ReviewList>   
        </div>
      </React.Fragment>
        </Col>
        <Col sm={4} md={4} lg={4}>
                <Button variant="primary" href="/student/addreviews">+ Add Reivew</Button>
                </Col>
                </Row>
                </React.Fragment> 
    );
  }
  
}

ReviewTab.propTypes = {
  status: PropTypes.object.isRequired,
  saveReview:PropTypes.func.isRequired,
  savePositiveReview:PropTypes.func.isRequired,
  saveNegativeReview:PropTypes.func.isRequired,
  saveFeaturedReview: PropTypes.func.isRequired,
  saveAverageRating:PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  review: state.review,
  positive: state.review.positive[0],
  negative: state.review.negative[0],
  featured: state.review.featured[0],
  avgRating: state.review.avgRating,
});
const mapDispatchToProps = (dispatch) => {
  return {
    saveReview: (data) => dispatch(saveReview(data)),
    savePositiveReview: (data) => dispatch(savePositiveReview(data)),
    saveNegativeReview: (data) => dispatch(saveNegativeReview(data)),
    saveFeaturedReview: (data) => dispatch(saveFeaturedReview(data)),
    saveAverageRating: (data) => dispatch(saveAverageRating(data)),
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(ReviewTab);


