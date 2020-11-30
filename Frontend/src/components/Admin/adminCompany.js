import Navbar from '../Student/Navbar/navbar_admin';
import React, { Component } from 'react';
import axios from 'axios';
import backendServer from '../../webConfig';

class adminCompany extends Component {
    constructor(props) {
        super(props); 
            this.state = {
            }
        }

        componentWillMount() {
            axios.get(`${backendServer}glassdoor/jobs/${localStorage.getItem("name")}/fetchStatistics`)
        }

        render() {
            return(
                <React.Fragment>
                    <Navbar/>
                </React.Fragment>
            )
        }
}

export default adminCompany;