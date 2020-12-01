import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import backendServer from '../../webConfig';
import Loader from 'react-loader-spinner';

class ApexChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      options: {
        chart: {
          id: 'basic-bar',
        },
        xaxis: {
          categories: ['a', 'b', 'c'],
        },
      },
      series: [
        {
          name: 'series-1',
          data: [1, 5, 3],
        },
      ],
    };
    this.getData();
  }
  //   componentDidMount() {
  //     this.getData();
  //   }

  getData() {
    axios.get(`${backendServer}admin/mostreviewed`).then((response) => {
      console.log(response);
      if (response.status === 200) {
        this.setState({
          loading: false,
          //   loading: false,
          options: {
            chart: {
              id: 'basic-bar',
            },
            xaxis: {
              categories: response.data.names,
            },
          },
          series: [
            {
              name: 'Reviews',
              data: response.data.reviews,
            },
          ],
        });
        // this.forceUpdate();
      }
    });
  }

  render() {
    return (
      <div className='app'>
        <div className='row'>
          <div className='mixed-chart'>
            {this.state.loading ? (
              <Loader type='Puff' color='#00BFFF' height={100} width={100} />
            ) : (
              <Chart
                options={this.state.options}
                series={this.state.series}
                type='bar'
                width='500'
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ApexChart;
