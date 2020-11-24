import React, { Component } from 'react';
//import yelpLoginImage from './images/yelp_logo.jpg';
import {Button, Nav, FormControl, Dropdown} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
//import { Redirect} from 'react-router';
//import { Link } from 'react-router-dom';

class navigationBar extends Component {

    constructor(props) {

        super(props); 
            this.state = {
                searchKeyword: "",
                searchCategory: 0,
                searchBar: 'False'
            }
}


searchChangeHandler = (e) => {
    e.preventDefault();
    console.log(e.target.value)
    this.setState({
        searchKeyword: e.target.value
    })
}

handleClick = (e) => {
    if (localStorage.getItem("user") === 'False')
    {
        window.location = "/restaurant";
    } else {
        window.location = "/userProfile";
    }
}

handleOrder = (e) => {
    if (localStorage.getItem("user") === 'False')
    {
        window.location = '/restOrders';
    } else {
        window.location = '/user/orders'
    }
}

handleInputChange = (e) => {
    console.log(e.target.value)
    this.setState({
        searchCategory: e.target.value
    })
}

handleLogout = () => {
    window.localStorage.clear();
    window.location ='/'
  };

handleSearch = (e) => {
    e.preventDefault();
    this.setState({searchBar: 'True'})
};



render() {
return (
    <React.Fragment>
        <Nav class="navbar navbar-expand-md bg-light">
            <div>
                <form class="form-inline mx-auto">
                <h3 style={{fontWeight: "bolder", color: "green", marginLeft: "30px", marginRight:"40px", fontSize: "40px"}}> glassdoor</h3>
                <br />
                <FormControl style={{width:"400px", marginRight: "5px" }} type="search" placeholder="Companies" autoComplete='on' onChange={this.searchChangeHandler}/>
                    <select
                        style={{width: "150px"}}
                        class='custom-select input-group'
                        onChange={this.handleInputChange}>
                        <option selected>Search...</option>
                        <option value='1'>Jobs</option>
                        <option value='2'>Companies</option>
                        <option value='3'>Salaries</option>
                        <option value='4'>Interviews</option>
                    </select>
                    <FormControl style={{width:"275px", marginLeft: "5px"}} list="searchWord" class="form-control lg-5" type="search" placeholder="Location" aria-label="Search" autoComplete='on' onChange={this.searchChangeHandler}/>
                    <Button onClick={this.handleSearch} style = {{ marginLeft: "10px", marginRight: "40px", height:"38px", borderRadius:"5px", background: "green", color: "white", border: "1px solid green", cursor: "pointer"}} type="submit">Search</Button>
                    <Dropdown>
                        <Dropdown.Toggle style={{fontSize: "25px",backgroundColor: "transparent", color: "#555555", border: "none", marginLeft: "60px"}}id="dropdown-basic"> <i class="far fa-user-circle"></i></Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item style={{background: "none"}}onClick={this.handleClick}>Profile</Dropdown.Item>
                            <Dropdown.Item onClick={this.handleLogout}>Resumes</Dropdown.Item>
                            <Dropdown.Item onClick={this.handleLogout}>Job Preferences</Dropdown.Item>
                            <Dropdown.Item onClick={this.handleLogout}>Demographics</Dropdown.Item>
                            <hr />
                            <Dropdown.Item onClick={this.handleLogout}>Contributions</Dropdown.Item>
                            <Dropdown.Item onClick={this.handleLogout}>Company Follows</Dropdown.Item>
                            <Dropdown.Item onClick={this.handleLogout}>Emails & Alerts</Dropdown.Item>
                            <hr />
                            <Dropdown.Item onClick={this.handleLogout}>Account Settings</Dropdown.Item>
                            <hr />
                            <Dropdown.Item onClick={this.handleLogout}>Help center </Dropdown.Item>
                            <Dropdown.Item onClick={this.handleLogout}>Sign Out</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </form>
                </div>
            </Nav>
            <Nav class="navbar navbar-expand-md bg-light" style={{borderTop: "0.5px solid #a9a9a9"}}>
            <div>
                <form class="form-inline mx-auto">
                        <Dropdown>
                                <Dropdown.Toggle style={{fontSize: "15px",backgroundColor: "transparent", color: "#555555", border: "none", marginLeft: "5px"}}id="dropdown-basic"> <i class="fas fa-briefcase"></i> Jobs</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item style={{background: "none"}}onClick={this.handleClick}>Recent Activity</Dropdown.Item>
                                    <Dropdown.Item onClick={this.handleLogout}>Career Insights</Dropdown.Item>
                                    <Dropdown.Item onClick={this.handleLogout}>Job Alerts</Dropdown.Item>
                                    <Dropdown.Item onClick={this.handleLogout}>Saved</Dropdown.Item>
                                    <Dropdown.Item onClick={this.handleLogout}>Applications</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Dropdown>
                                <Dropdown.Toggle style={{fontSize: "15px",backgroundColor: "transparent", color: "#555555", border: "none", marginLeft: "5px"}}id="dropdown-basic"> <i class="far fa-building"></i> Companies</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item style={{background: "none"}}onClick={this.handleClick}>Discover companies</Dropdown.Item>
                                    <Dropdown.Item onClick={this.handleLogout}>Compare Companies </Dropdown.Item>
                                    <Dropdown.Item onClick={this.handleLogout}>Suggested Follows</Dropdown.Item>
                                    <Dropdown.Item onClick={this.handleLogout}>Write a Review</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Dropdown>
                                <Dropdown.Toggle style={{fontSize: "15px",backgroundColor: "transparent", color: "#555555", border: "none", marginLeft: "5px"}}id="dropdown-basic"> <i class="fas fa-money-bill"></i> Salaries</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item style={{background: "none"}}onClick={this.handleClick}>Discover salary</Dropdown.Item>
                                    <Dropdown.Item onClick={this.handleLogout}>Salary Calculator </Dropdown.Item>
                                    <Dropdown.Item onClick={this.handleLogout}>Analyze Offer</Dropdown.Item>
                                    <Dropdown.Item onClick={this.handleLogout}>Add a Salary</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Dropdown>
                                <Dropdown.Toggle style={{fontSize: "15px",backgroundColor: "transparent", color: "#555555", border: "none", marginLeft: "5px"}}id="dropdown-basic"> <i class="far fa-comments"></i> Interviews </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item style={{background: "none"}}onClick={this.handleClick}>Discover Interviews</Dropdown.Item>
                                    <Dropdown.Item onClick={this.handleLogout}>Add an Interview</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                    <Button onClick={this.handleSearch} style = {{ marginLeft: "750px", marginRight: "40px", height:"38px", background: "transparent", color: "#555555", border: "none", cursor: "pointer"}} type="submit"> <i class="fas fa-briefcase"></i> Post Jobs </Button>
                </form>
                </div>
            </Nav>
        </React.Fragment>
       )
}
}
export default navigationBar;