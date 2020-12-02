import Navigationbar from '../../Student/Navbar/navbar_admin';
import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import { MDBContainer } from "mdbreact";
import { Pie } from "react-chartjs-2";
import axios from 'axios';
import backendServer from '../../../webConfig';

class adminDemographics extends Component {

    constructor(props) {
        super(props); 
            this.state = {
                applicantId: {}
            }
        }

        componentWillMount() {
            axios.get(`${backendServer}glassdoor/jobs/${this.props.match.params.companyName}/fetchApplicantId`)
            .then(res => {
            
                setTimeout(() => {
                    let applied_status = res.data.map(val => {
                        console.log(val.applied_students)
                    })
                    //this.setState({applicantId: res.data})
                }, 800)

                
            })
        }


        render() {
        //console.log(ids)
        //console.log(applied_status)
            return (
                <React.Fragment>
                    <Navigationbar />

                </React.Fragment>
                   
            )}
}

        
        export default adminDemographics;