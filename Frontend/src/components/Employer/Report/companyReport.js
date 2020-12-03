import Navigationbar from '../../Student/Navbar/navbar_company';
import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import { MDBContainer } from "mdbreact";
import { Pie } from "react-chartjs-2";
import axios from 'axios';
import backendServer from '../../../webConfig';
import { Link } from 'react-router-dom';

class companyReport extends Component {

    constructor(props) {
        super(props); 
            this.state = {
                applicantId: [],
                ethnicity: [],
                gender:[],
                sexualOrient: [],
                disability:[],
                parent:[],
                veteran: [],
            }
        }

        componentWillMount() {
            axios.get(`${backendServer}glassdoor/jobs/${this.props.match.params.title}/fetchStatistics`)
            .then(res => {
                axios.post(`${backendServer}glassdoor/jobs/getDemographics`, res.data.applicantId )
                .then(res => {
                    console.log(res.data)
                this.setState({ethnicity: res.data[0]})
                this.setState({gender: res.data[1]})
                this.setState({sexualOrient: res.data[2]})
                this.setState({disability: res.data[3]})
                this.setState({parent: res.data[4]})
                this.setState({veteran: res.data[5]})
            })
                console.log(res.data)
                let val = res.data.selectedCount
                for( let i = 0; i < val.length; i++ ) {
                    console.log(val[i])
                    if(val[i]._id === 'Rejected') {
                        this.setState({rejected: val[i].Frequency})
                    } else {
                        this.setState({selected: val[i].Frequency})
                    }
                }
                this.setState({applicantId: res.data.applicantId})
            });
        }

render() {
    console.log(this.state.sexualOrient)
    let ethnicitylabels = [];
    for(let i = 0; i<this.state.ethnicity.length; i++) {
        ethnicitylabels.push(this.state.ethnicity[i].ethnicity);
    }
    console.log(ethnicitylabels);

    let ethnicityCount = [];
    for(let i = 0; i<this.state.ethnicity.length; i++) {
        ethnicityCount.push(this.state.ethnicity[i].n);
    }

    let ethnicityData = {
        dataPie:{
        labels: ethnicitylabels,
        datasets: [
          {
            data: ethnicityCount,
            backgroundColor: [
              "#228B22",
              "#FF69B4",
              "#20B2AA",
              "#FFA500",
              "#008080",
              "#B22222",
              "#FF7F50",
              "#5F9EA0",
              "#483D8B",
              "#FFFAF0"
            ],
          }
        ]
      }
    }


    let genderlabels = [];
    for(let i = 0; i<this.state.gender.length; i++) {
        genderlabels.push(this.state.gender[i].gender);
    }
    console.log(genderlabels);

    let genderCount = [];
    for(let i = 0; i<this.state.gender.length; i++) {
        genderCount.push(this.state.gender[i].n);
    }

    let genderData = {
        dataPie:{
        labels: genderlabels,
        datasets: [
          {
            data: genderCount,
            backgroundColor: [
                "#FFA500",
              "#008080",
              "#B22222",
              "#FF7F50",
            ],
          }
        ]
      }
    }

    let sexualOrientlabels = [];
    for(let i = 0; i<this.state.sexualOrient.length; i++) {
        sexualOrientlabels.push(this.state.sexualOrient[i].sexual_orientation);
    }
    console.log(sexualOrientlabels);

    let sexualOrientCount = [];
    for(let i = 0; i<this.state.sexualOrient.length; i++) {
        sexualOrientCount.push(this.state.sexualOrient[i].n);
    }

    let sexualOrientData = {
        dataPie:{
        labels: sexualOrientlabels,
        datasets: [
          {
            data: sexualOrientCount,
            backgroundColor: [
              "#F7464A",
              "#46BFBD",
              "#5AD3D1",
            ],
          }
        ]
      }
    }

    let disabilitylabels = [];
    for(let i = 0; i<this.state.disability.length; i++) {
        disabilitylabels.push(this.state.disability[i].disability);
    }

    let disabilityCount = [];
    for(let i = 0; i<this.state.disability.length; i++) {
        disabilityCount.push(this.state.disability[i].n);
    }

    let disabilityData = {
        dataPie:{
        labels: disabilitylabels,
        datasets: [
          {
            data: disabilityCount,
            backgroundColor: [
              "#F7464A",
              "#46BFBD",
              "#5AD3D1",
            ],
          }
        ]
      }
    }

    let parentlabels = [];
    for(let i = 0; i<this.state.parent.length; i++) {
        parentlabels.push(this.state.parent[i].parent_caregiver);
    }

    let parentCount = [];
    for(let i = 0; i<this.state.parent.length; i++) {
        parentCount.push(this.state.parent[i].n);
    }

    let parentData = {
        dataPie:{
        labels: parentlabels,
        datasets: [
          {
            data: parentCount,
            backgroundColor: [
                "#5F9EA0",
                "#483D8B",
                "#FFFAF0"
            ],
          }
        ]
      }
    }

    let veteranlabels = [];
    for(let i = 0; i<this.state.veteran.length; i++) {
        veteranlabels.push(this.state.veteran[i].veteran_status);
    }

    let veteranCount = [];
    for(let i = 0; i<this.state.veteran.length; i++) {
        veteranCount.push(this.state.veteran[i].n);
    }

    let veteranData = {
        dataPie:{
        labels: veteranlabels,
        datasets: [
          {
            data: veteranCount,
            backgroundColor: [
              "#F7464A",
              "#46BFBD",
              "#5AD3D1",
            ],
          }
        ]
      }
    }

    let companyData = {
        dataPie:{
        labels: ["Rejected", "Hired"],
        datasets: [
          {
            data: [this.state.rejected, this.state.selected],
            backgroundColor: [
              "#F7464A",
              "#46BFBD",
            ],
          }
        ]
      }

    }
return(
    <React.Fragment>
    <Navigationbar />
    <div class='container'>
        <br />
        <h1> {this.props.match.params.title}'s report</h1>
        <hr />
        <br />
        <div>
            <MDBContainer>
                <h5>Job Statistics</h5>
            <Pie data = {companyData.dataPie}   />
            {/* <p style={{fontWeight: "light",fontSize: "40px", marginLeft: "60px",  padding: "0px"}}>Job statistics</p>
            <p style={{fontWeight: "light",fontSize: "25px", marginLeft: "60px",  padding: "0px"}}>Selected applicants: {this.state.selected}</p>
            <p style={{fontWeight: "light",fontSize: "25px", marginLeft: "60px",  padding: "0px"}}>Rejected applicants: {this.state.rejected}</p> */}
            </MDBContainer>
        </div>
        <div style={{display: "flex", justifyContent: "space-between"}}>
        <div>
            <MDBContainer>
                <h5> Ethnicity</h5>
            <Pie data = {ethnicityData.dataPie}   />
            </MDBContainer>
        </div>
        <div>
            <MDBContainer>
                <h5> Gender</h5>
            <Pie data = {genderData.dataPie}   />
            </MDBContainer>
        </div>

        <div>
            <MDBContainer>
                <h5> Sexual Orientation</h5>
            <Pie data = {sexualOrientData.dataPie}   />
            </MDBContainer>
        </div>
        </div>
        <div style={{display: "flex", justifyContent: "space-between"}}>
        <div>
            <MDBContainer>
                <h5> Disability</h5>
            <Pie data = {disabilityData.dataPie}   />
            </MDBContainer>
        </div>

        <div>
            <MDBContainer>
                <h5> Parent caregiver</h5>
            <Pie data = {parentData.dataPie}   />
            </MDBContainer>
        </div>

        <div>
            <MDBContainer>
                <h5> Veteran status</h5>
            <Pie data = {veteranData.dataPie}   />
            </MDBContainer>
        </div>
    </div>
    </div>
    </React.Fragment>

)}
}



export default companyReport;