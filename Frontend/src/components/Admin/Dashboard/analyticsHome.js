import Navbar from '../../Student/Navbar/navbar_admin';
import React, { Component } from 'react';
import ApexChart from './mostReviewed';
import TopRated from './topRated';
import TopCeo from './topCeo';
import TopStudents from './topStudents';
import ReviewsPerday from './reviewsPerday';
import '../../../Admin.css';

class AnalyticsHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyRating: [],
    };
  }

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div>
          <ReviewsPerday></ReviewsPerday>
        </div>

        <div class='content'>
          <div id='div1'>
            <div>
              <h3>
                <b>Top 5 most reviewed companies:</b>
              </h3>
              <ApexChart></ApexChart>
            </div>
          </div>
          <div id='div2'>
            <div>
              <h3>
                <b>Top 10 CEO's:</b>
              </h3>
              <TopCeo></TopCeo>
            </div>
          </div>
          <div id='div3'>
            <div>
              <h3>
                <b>Top 5 most rated companies:</b>
              </h3>
              <TopRated></TopRated>
            </div>
          </div>
          <div id='div4'>
            <div>
              <h3>
                <b>Top 5 students based on total accepted reviews made:</b>
              </h3>
              <TopStudents></TopStudents>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AnalyticsHome;
