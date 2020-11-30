import Navigationbar from '../../Student/Navbar/navbar_student';
import React, { Component } from 'react';
import { CardImg, Button } from 'react-bootstrap';
// import axios from 'axios';
// import backendServer from '../../webConfig';

class HomeTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      buttontxt: ' Review',
    };
  }

  // componentWillMount() {
  //     axios.get(`${backendServer}company/profile/${localStorage.getItem("sql_company_id")}`)
  //     .then(res => {
  //         this.setState({ user: res.data });
  //     });
  // }

  render() {
    console.log(this.state.user);
    //console.log(this.props.user);
    // var fileName = this.state.user.cphoto_file_name;
    // var imgSrc = `${backendServer}company/imageUpload/${fileName}`;
    return (
      <React.Fragment>
        <Navigationbar />
        <div style={{ margin: '5px' }}>
          <div class='jumbotron' style={{ paddingBottom: '0px' }}>
            <div class='row'>
              <div
                class='col-xs-3 card profilePic'
                style={{ position: 'absolute' }}
              >
                <card>
                  <CardImg
                    style={{ height: '200px', width: '175px' }}
                    // src={imgSrc}
                    className='profileImg'
                  />
                </card>
              </div>
              <div class='col-xs-4 profileName' style={{ marginLeft: '200px' }}>
                <h1>{this.state.user.name}</h1>
                <h6> {this.state.user.street}</h6>
                <h6>
                  {' '}
                  {this.state.user.city}, {this.state.user.state}
                </h6>
                <br />
                <Button
                  href='/company'
                  style={{
                    backgroundColor: 'transparent',
                    color: 'green',
                    border: 'none',
                    fontSize: '25px',
                  }}
                >
                  {' '}
                  Overview{' '}
                </Button>
                <Button
                  style={{
                    backgroundColor: 'transparent',
                    color: 'green',
                    border: 'none',
                    borderLeft: '1px solid #e6e6e6',
                    fontSize: '25px',
                  }}
                >
                  {' '}
                  Jobs{' '}
                </Button>
                <Button
                  href=''
                  style={{
                    backgroundColor: 'transparent',
                    color: 'green',
                    border: 'none',
                    borderLeft: '1px solid #e6e6e6',
                    fontSize: '25px',
                  }}
                >
                  {' '}
                  Reviews{' '}
                </Button>
                <Button
                  style={{
                    backgroundColor: 'transparent',
                    color: 'green',
                    border: 'none',
                    borderLeft: '1px solid #e6e6e6',
                    fontSize: '25px',
                  }}
                >
                  {' '}
                  Interviews{' '}
                </Button>
                <Button
                  style={{
                    backgroundColor: 'transparent',
                    color: 'green',
                    border: 'none',
                    borderLeft: '1px solid #e6e6e6',
                    fontSize: '25px',
                  }}
                >
                  {' '}
                  Salaries{' '}
                </Button>
                <Button
                  style={{
                    backgroundColor: 'transparent',
                    color: 'green',
                    border: 'none',
                    borderLeft: '1px solid #e6e6e6',
                    fontSize: '25px',
                  }}
                >
                  {' '}
                  Photos{' '}
                </Button>
                <Button
                  href='/company/profileUpdate'
                  style={{
                    float: 'right',
                    marginLeft: '500px',
                    backgroundColor: 'green',
                    border: 'green',
                  }}
                >
                  {' '}
                  Add {this.state.buttontxt}
                </Button>
              </div>
            </div>
          </div>
          <div class='row' style={{ marginLeft: '10px' }}>
            <div
              class='col-xs-3'
              style={{
                textAlign: 'left',
                height: '100%',
                marginLeft: '40%',
                marginTop: '5%',
              }}
            ></div>
            <hr />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default HomeTabs;
