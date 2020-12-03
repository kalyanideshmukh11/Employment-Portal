import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import backendServer from '../../../webConfig';
import Loader from 'react-loader-spinner';
import { noAuto } from '@fortawesome/fontawesome-svg-core';

class ReviewsPerday extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      count: null,
      // options: {
      //   chart: {
      //     id: 'basic-bar',
      //   },
      //   xaxis: {
      //     categories: ['a', 'b', 'c'],
      //   },
      // },
      // series: [
      //   {
      //     name: 'series-1',
      //     data: [1, 5, 3],
      //   },
      // ],
    };
    this.getData();
  }

  getData() {
    axios.get(`${backendServer}admin/reviewcount`).then((response) => {
      console.log(response);
      console.log('total:', response.data.total);
      if (response.status === 200) {
        this.setState({
          loading: false,
          // loading: true,
          count: response.data.total,
        });
      }
      console.log('state:', this.state.count);
    });
  }

  render() {
    return (
      <div className='app'>
        <div>
          <h3>
            <b> Today's review count: {this.state.count}</b>
          </h3>
        </div>
      </div>
    );
  }
}

export default ReviewsPerday;
