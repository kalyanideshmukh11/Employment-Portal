import Navigationbar from '../Navbar/navbar_student';
import React, { Component } from 'react';
import { CardImg, Button } from 'react-bootstrap';
import axios from 'axios';
import backendServer from '../../../webConfig';
const qs = require('query-string');

class CompanyOverview extends Component {
  constructor(props) {
    super(props);
    console.log(('Props received overview:', props));
    this.routeParam = props.companyID;
    this.state = {
      user: {},
    };
  }
  componentDidMount() {
    axios
      .post(`${backendServer}student/incrementVisits/${this.routeParam}`)
      .then((res) => {
        console.log('API has been hit for increment');
      });
  }

  componentWillMount() {
    axios
      .get(`${backendServer}company/profile/${this.routeParam}`)
      .then((res) => {
        this.setState({ user: res.data });
      });
  }

  render() {
    console.log(this.state.user);
    //console.log(this.props.user);
    var fileName = this.state.user.cphoto_file_name;
    var imgSrc = `${backendServer}company/imageUpload/${fileName}`;
    return (
      <React.Fragment>
        <div style={{ margin: '5px' }}>
          <div class='row' style={{ marginLeft: '10px' }}>
            <div class='col-xs-12' style={{ marginLeft: '15%' }}>
              <h3 style={{ color: 'green' }}>
                {' '}
                {this.state.user.name} overview
              </h3>
              <hr />
              <h5 style={{ margin: '0px' }}> Website</h5>
              <p> {this.state.user.website} </p>
              <h5 style={{ margin: '0px' }}> Company Size </h5>
              <p> {this.state.user.company_size} </p>
              <h5 style={{ margin: '0px' }}> Company Type</h5>
              <p> {this.state.user.company_type} </p>
              <h5 style={{ margin: '0px' }}> Revenue </h5>
              <p> {this.state.user.revenue} </p>
            </div>
            <div
              class='col-xs-3'
              style={{
                textAlign: 'left',
                height: '100%',
                marginLeft: '40%',
                marginTop: '5%',
              }}
            >
              <div style={{ marginLeft: '10px' }}>
                <h5 style={{ margin: '0px' }}> Headquarters </h5>
                <p> {this.state.user.headquarters}</p>
                <h5 style={{ margin: '0px' }}> Industry </h5>
                <p> {this.state.user.industry} </p>
                <h5 style={{ margin: '0px' }}> Founded </h5>
                <p> {this.state.user.founded} </p>
                <h5 style={{ margin: '0px' }}> CEO Name</h5>
                <p> {this.state.user.ceo_name} </p>
              </div>
            </div>
            <hr />
            <div class='col-xs-3' style={{ marginLeft: '15%' }}>
              <br />
              <h5 style={{ margin: '0px' }}> Mission </h5>
              <p>{this.state.user.mission}</p>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CompanyOverview;
