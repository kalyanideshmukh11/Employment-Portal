import Navigationbar from '../Student/Navbar/navbar_company';
import React, { Component } from 'react';
import {CardImg, Button } from 'react-bootstrap';
import axios from 'axios';
import backendServer from '../../webConfig';


class companyProfile extends Component {

    constructor(props) {
        super(props); 
            this.state = {
                user: {}
            }
}

componentWillMount() {
    axios.get(`${backendServer}/glassdoor/company/${localStorage.getItem("user_id")}`)
    .then(res => {
        this.setState({ user: res.data });
    });
}

render() {
    console.log(this.props.user);
    //var fileName = this.props.user.fileName
    //var imgSrc = `${backendServer}/yelp/upload/restaurant/${fileName}`
    return (
        <React.Fragment>
        <Navigationbar />
        <div style={{margin:"5px"}}>
        <div class='jumbotron' style={{paddingBottom: "0px"}}>
                <div class='row'>
                    <div class='col-xs-3 card profilePic' style={{position:"absolute"}}>
                        <card>
                            <CardImg style={{height: "250px", width: "175px"}} className='profileImg'/>
                        </card>
                    </div>
                    <div class='col-xs-4 profileName' style={{marginLeft: "200px"}}>
                        <h1>Google</h1>
                        <h6> Googleplex, 1600 Amphitheatre Parkway,</h6>
                        <h6> Mountain View, CA</h6>
                        <br />
                        <Button href = '/company' style={{backgroundColor: "transparent", color: "green", border: "none", fontSize: "25px" }}> Overview </Button>
                        <Button style={{backgroundColor: "transparent", color: "green", border: "none", borderLeft: "1px solid #e6e6e6", fontSize: "25px"}}> Jobs </Button>
                        <Button href = '/companyReviews' style={{backgroundColor: "transparent", color: "green", border: "none", borderLeft: "1px solid #e6e6e6", fontSize: "25px"}}> Reviews </Button>
                        <Button style={{backgroundColor: "transparent", color: "green", border: "none", borderLeft: "1px solid #e6e6e6", fontSize: "25px"}}> Applicants </Button>
                        <Button href = '/company/profileUpdate' style={{float: "right", marginLeft: "500px", backgroundColor: "green", border: "green"}}> Update profile details</Button>
                    </div>
                </div>
        </div>
        <div class='row' style={{ marginLeft:"10px"}}>
            <div class='col-xs-12' style={{marginLeft: "15%"}}>
                <h3 style={{color:'green'}}> Google overview</h3>
                <hr />
                <h5 style={{margin:"0px"}}> Website</h5>
                <p> www.google.com </p>
                <h5 style={{margin:"0px"}}> Company Size </h5>
                <p> 10000+ Employees </p>
                <h5 style={{margin:"0px"}}> Company Type</h5>
                <p> Company - Public </p>
                <h5 style={{margin:"0px"}}> Revenue </h5>
                <p> $10+ billion (USD) </p>
            </div>
            <div class='col-xs-3' style={{textAlign: "left", height: "100%", marginLeft: "40%", marginTop: "5%"}}>
                <div style={{marginLeft: "10px"}}>
                    <h5 style={{margin:"0px"}}> Headquarters </h5>
                    <p> Mountain View, CA</p>
                    <h5 style={{margin:"0px"}}> Industry </h5>
                    <p> Internet </p>
                    <h5 style={{margin:"0px"}}> Founded </h5>
                    <p> 1998 </p>
                    <h5 style={{margin:"0px"}}> CEO Name</h5>
                    <p> Sundar Pichai </p>
                </div>
            </div>
            <hr />
            <div class='col-xs-3' style={{marginLeft: "15%"}}>
                <br />
                <h5 style={{margin:"0px"}}> Mission </h5>
                <p>Google’s mission is to organize the world’s information and make it universally accessible and useful. </p>
            </div>
            </div>
         </div>
    </React.Fragment>
    )}
}

export default companyProfile;


