import Navbar from '../../Student/Navbar/navbar_admin';
import React, { Component } from 'react';
import ApexChart from './mostReviewed';
import TopRated from './topRated';
import '../../../Admin.css';

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
        {/* <div id='menu'></div> */}
        <div class='content'>
          <div id='div1'>
            <div>
              <h3>
                <b>Top 5 most reviewed companies:</b>
              </h3>
              <ApexChart></ApexChart>
            </div>
          </div>
          <div id='div2'></div>
          <div id='div3'>
            <div>
              <h3>
                <b>Top 5 most rated companies:</b>
              </h3>
              <TopRated></TopRated>
            </div>
          </div>
          <div id='div4'></div>
        </div>
      </React.Fragment>
    );
  }
}

export default AnalyticsHome;
