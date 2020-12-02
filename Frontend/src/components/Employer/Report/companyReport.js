import Navigationbar from '../../Student/Navbar/navbar_company';
import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import { MDBContainer } from "mdbreact";
import { Pie } from "react-chartjs-2";
import axios from 'axios';
import backendServer from '../../../webConfig';

class companyReport extends Component {

    constructor(props) {
        super(props); 
            this.state = {
            }
        }

        componentWillMount() {
            axios.get(`${backendServer}glassdoor/jobs/${this.props.match.params.title}/fetchStatistics`)
            .then(res => {
                let val = res.data.selectedCount
                for( let i = 0; i < val.length; i++ ) {
                    console.log(val[i])
                    if(val[i]._id === 'Rejected') {
                        this.setState({rejected: val[i].Frequency})
                    } else {
                        this.setState({selected: val[i].Frequency})
                    }
                }
                this.setState({totalJobs: res.data.jobsCount}) 
                this.setState({applicantCount: res.data.applicantCount})
            });

            axios.get(`${backendServer}glassdoor/jobs/${this.props.match.params.companyName}/fetchApplicantId`)
            .then(res => {
                console.log(res.data)
            })
        }


render() {
    console.log(this.state.jobsCount)
    let companyData = {
        dataPie:{
        labels: ["Rejected", "Selected"],
        datasets: [
          {
            data: [this.state.rejected, this.state.selected],
            backgroundColor: [
              "#F7464A",
              "#46BFBD",
            ],
            hoverBackgroundColor: [
              "#FF5A5E",
              "#5AD3D1",
            ]
          }
        ]
      }

    }
return(
    <React.Fragment>
    <Navigationbar />
    <div class='container'>
        <br />
        <h1> {localStorage.getItem("name")}'s report</h1>
        <Button href= '/company/demogrphics' > View Demographics</Button>
        <div>
        <div>
            <MDBContainer>
            <Pie data = {companyData.dataPie}   />
            <p style={{fontWeight: "light",fontSize: "40px", marginLeft: "60px",  padding: "0px"}}>Job statistics</p>
            <p style={{fontWeight: "light",fontSize: "25px", marginLeft: "60px",  padding: "0px"}}>Selected applicants: {this.state.selected}</p>
            <p style={{fontWeight: "light",fontSize: "25px", marginLeft: "60px",  padding: "0px"}}>Rejected applicants: {this.state.rejected}</p>
            </MDBContainer>
        </div>
    </div>
    </div>
    </React.Fragment>

)}
}



export default companyReport;