import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import backendServer from '../../../webConfig';
import Loader from 'react-loader-spinner';

class TopRated extends Component {
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
    axios.get(`${backendServer}admin/toprated`).then((response) => {
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
              name: 'Rating',
              data: response.data.avgrating,
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
              <div
                style={{
                  position: 'absolute',
                  left: '15%',
                  top: '20%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <Loader type='Puff' color='#00b32d' height={70} width={100} />
              </div>
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

export default TopRated;
