import Navbar from '../../Student/Navbar/navbar_admin';
import React, { Component } from 'react';
import ApexChart from './mostReviewed';
import TopRated from './topRated';

class AnalyticsHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyRating: [],
    };
  }

  render() {
    console.log(this.state.companyList);
    return (
      <React.Fragment>
        <Navbar />
        <div>
          <h3>
            <b>Top 5 most reviewed companies:</b>
          </h3>
          <ApexChart></ApexChart>
        </div>

        <div>
          <h3>
            <b>Top 5 most rated companies:</b>
          </h3>
          <TopRated></TopRated>
        </div>
      </React.Fragment>
    );
  }
}

export default AnalyticsHome;
