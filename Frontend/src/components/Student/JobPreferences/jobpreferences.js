import React, {Component} from 'react';
import StudentNavbar from '../Navbar/navbar_student'
import SideBarStudent from '../Navbar/sidebar_student';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import {Button, Card, DropdownButton, InputGroup, FormControl, Dropdown, Form} from 'react-bootstrap'
import { Multiselect } from 'multiselect-react-dropdown';
import CurrencyInput from 'react-currency-input-field';
import {Checkbox, FormControlLabel} from '@material-ui/core';

class StudentJobPreferences extends Component {
    constructor(props){
        super(props)
        this.state = {
            jobSearchStatus: 'Select',
            jobTypeOptions: [{type: 'Full-time'},
            {type: 'Part-time'},
            {type: 'Contract'},
            {type: 'Internship'},
            {type: 'Temporary'},
            {type: 'Apprenticeship'},
            {type: 'Entry-level'}
         ],
         payPeriod: [{value: 'Per Year'}, {value: 'Per Month'}, {value: 'Per Hour'} ],
         companySize: [{type: '1-50'},
         {type: '51-200'},
         {type: '201-500'},
         {type: '501-1000'},
         {type: '1001-5000'},
         {type: '5001-10000'},
         {type: '10000+'},
        ],
        industry: [{type: 'Accounting & Legal'},
        {type: 'Aerospace & Defense'},
        {type: 'Agriculture & Forestry'},
        {type: 'Arts, Entertainment & Recreation'},
        {type: 'Biotech & Pharmaceuticals'},
        {type: 'Business Services'},
        {type: 'Construction, Repain and Maintenance'},
        {type: 'Consumer Service'},
        {type: 'Education'},
        {type: 'Finance'},
        {type: 'Government'},
        {type: 'Healthcare'},
        {type: 'Information Technology'},
        {type: 'Insurancee'},
        {type: 'Manufacturing'},
        {type: 'Media'},
        {type: 'Mining & Metals'},
        {type: 'Non-Profit'},
        {type: 'Oil, Gas, Energy & Utilities'},
        {type: 'Real Estate'},
        {type: 'Restaurants, Bars & Food Services'},
        {type: 'Retail'},
        {type: 'Telecommunication'},
        {type: 'Transportation & Logistics'},
        {type: 'Travel & Tourism'},
    ]

        }
        
    }
    jobSearchStatus = (e) => {
        this.setState({
            jobSearchStatus: e
        })
    }
    jobType = (e) => {
        this.setState({
            jobType: e
        })
    }
    
    updateJSS = () => {

    }

    render() {
        return (
            <div>
                <StudentNavbar />
                <br />
                <br />

                <div className='row'>
                    <div class="col-4" style={{paddingLeft:"2cm", paddingRight:"1cm"}}> 
                    <SideBarStudent />
                    </div>

                    <div class="col-8" style={{borderLeft:"1px solid #e6e6e6"}}>
                        <Card style={{width: "22cm"}}>
                            <Card.Title style={{padding: "30px 20px 0px 20px", fontWeight:"bolder", fontSize:"25px"}}>
                                Job Preferences
                            </Card.Title>
                            <Card.Body>
                                <Card.Text>Tell us what you’re looking for in a job and we’ll use this information to recommend the best jobs to you. This information will not be visible to employers.</Card.Text>
                                <br />
                                <Card.Text style={{fontWeight:'bold', color:"#49504C"}}>
                                Where are you in your job search?
                                <br />
                                <br />
                                <label style={{fontSize:"12px", fontWeight:'lighter'}}> Select Job Search Status</label> 
                                <InputGroup>
                                <FormControl type="text" placeholder="Select" className='col-sm-6' value={this.state.jobSearchStatus} />
                                <DropdownButton as={InputGroup.Append} variant="light"
                                name='jobSearchStatus'
                                menuAlign="right" style={{marginLeft:"0.01mm"}}
                                onSelect={ this.jobSearchStatus }
                                show={ this.state.isOpen }>
                                <Dropdown.Item eventKey="Not Looking" onClick={this.updateJSS}>Not looking </Dropdown.Item>
                                <Dropdown.Item eventKey="Not Looking, but open" onClick={this.updateJSS}>Not looking, but open</Dropdown.Item>
                                <Dropdown.Item eventKey="Casually looking" onClick={this.updateJSS}>Casually looking</Dropdown.Item>
                                <Dropdown.Item eventKey="Actively looking" onClick={this.updateJSS}>Actively looking</Dropdown.Item>
                                </DropdownButton>
                                </InputGroup>
                                </Card.Text>
                                <br />
                                <Card.Text style={{fontWeight:'bold', color:"#49504C"}}>
                                What job titles are you looking for?
                                <br />
                                <br />
                                <label style={{fontSize:"12px", fontWeight:'lighter'}}> Job Title</label> 
                                <InputGroup>
                                <Form.Control className='col-sm-6' type="text" placeholder="Job Title"/>
                                <Button variant='link' style={{textDecoration: 'none'}}>
                                <FontAwesomeIcon icon={faPlusCircle} />
                                <span style={{marginLeft:"1mm"}}>
                                </span>
                                </Button>
                                </InputGroup>
                                </Card.Text>
                                <br />
                                <Card.Text style={{fontWeight:'bold', color:"#49504C"}}>
                                What types of jobs are you open to?
                                <br />
                                <br />
                                <label style={{fontSize:"12px", fontWeight:'lighter'}}>Job Types</label> 
                                <Multiselect 
                                options = {this.state.jobTypeOptions}
                                displayValue = 'type'
                                showCheckbox={true}
                                closeIcon = 'cancel'
                                style={ { chips: { background: "rgb(77, 166, 79)" }, multiselectContainer: {width:"10.5cm"}}}
                                closeOnSelect = {false}
                                />
                                </Card.Text>

                                <br />
                                 <Card.Text style={{fontWeight:'bold', color:"#49504C"}}>
                                 What is your target salary range?
                                <br />
                                <br />
                                Add Salary Range
                                <br />
                                <br />
                                <div class='row'>
                                    <div class='col-md-3'>
                                    <label style={{fontSize:"12px", fontWeight:'lighter'}}>From</label> 
                                    <CurrencyInput 
                                      name='fromSalary'
                                      groupSeparator = ','
                                      decimalSeparator = '.'
                                      turnOffSeparators = {false}
                                      style={{borderRadius: '4px', border: '1px solid #cccccc', height:'10mm'}}
                                      prefix = '$'
                                    />
                                    </div>
                                    <div class='col-md-3'>
                                    <label style={{fontSize:"12px", fontWeight:'lighter'}}>To(optional)</label> 
                                    <CurrencyInput 
                                      name='fromSalary'
                                      groupSeparator = ','
                                      decimalSeparator = '.'
                                      turnOffSeparators = {false}
                                      prefix = '$'
                                      style={{borderRadius: '4px', border: '1px solid #cccccc', height:'10mm'}}
                                    />

                                    </div>
                                </div>
                                <br />
                                <label style={{fontSize:"12px", fontWeight:'lighter'}}>Pay Period</label> 
                                <Multiselect 
                                options = {this.state.payPeriod}
                                displayValue = 'value'
                                singleSelect
                                style={ {  multiselectContainer: {width:"10.5cm"}}}
                                />

                            </Card.Text>
                            </Card.Body>
                        </Card>

                        <br />
                        <br/>
                        <Card style={{width: "22cm"}}>
                            <Card.Title style={{padding: "30px 20px 0px 20px", fontWeight:"bolder", fontSize:"25px"}}>
                                Company Preferences
                            </Card.Title>
                            <Card.Body>
                                <Card.Text>We use this information to help find you the best company matches.</Card.Text>
                                <br />
                                <Card.Text style={{fontWeight:'bold', color:"#49504C"}}>
                                Where would you prefer to work?
                                <br />
                                <br />
                                <label style={{fontSize:"12px", fontWeight:'lighter'}}> Location</label> 
                                <InputGroup>
                                <Form.Control className='col-sm-6' type="text" placeholder="Location"/>
                                <Button variant='link' style={{textDecoration: 'none'}}>
                                <FontAwesomeIcon icon={faPlusCircle} />
                                <span style={{marginLeft:"1mm"}}>
                                </span>
                                </Button>
                                </InputGroup>
                                <div class='row'>
                                    <div class='col-8'>
                                    <FormControlLabel
                                    style={{marginTop: '3mm'}}
                                    control={
                                     <Checkbox
                                        value="open to relocation"
                                        color="primary"
                                    />}
                                    label="I'm open to relocation
                                    (Add locations you’d consider above)"
                                />  
                                    </div>
                                    <div class='col-4'>
                                    <FormControlLabel
                                style={{marginTop: '3mm'}}
                                    control={
                                     <Checkbox
                                        value="remote only"
                                        color="primary"
                                    />}
                                    label="I want to work remotely"
                                />  
                                    </div>
                                </div>
      
                                </Card.Text>
                                <br />
                                <Card.Text style={{fontWeight:'bold', color:"#49504C"}}>
                                What industries and company sizes do you prefer?
                                <br />
                                <br />
                                <div class='row' >
                                    <div class='col-6'>
                                    <label style={{fontSize:"12px", fontWeight:'lighter'}}>Industry</label> 
                                <Multiselect 
                                options = {this.state.industry}
                                placeholder='Industry'
                                displayValue = 'type'
                                showCheckbox={true}
                                closeIcon = 'cancel'
                                style={ { chips: { background: "rgb(77, 166, 79)" }, multiselectContainer: {width:"10.5cm"}}}
                                closeOnSelect = {false}
                                />
                                    </div>
                                    <div class='col-4'>
                                    <label style={{fontSize:"12px", fontWeight:'lighter'}}>Company size</label> 
                                <Multiselect 
                                options = {this.state.companySize}
                                placeholder='Company size'
                                displayValue = 'type'
                                showCheckbox={true}
                                closeIcon = 'cancel'
                                style={ { chips: { background: "rgb(77, 166, 79)" }, multiselectContainer: {width:"10.5cm"}}}
                                closeOnSelect = {false}
                                />
                                    </div>
                                </div>


                                </Card.Text>

                                <br />
                                 <Card.Text style={{fontWeight:'bold', color:"#49504C"}}>
                                 What are your top 5 dream companies to work for?
                                <br />
                                <br />
                                <label style={{fontSize:"12px", fontWeight:'lighter'}}> Company name</label> 
                                <InputGroup>
                                <Form.Control className='col-sm-6' type="text" placeholder="Company name"/>
                                <Button variant='link' style={{textDecoration: 'none'}}>
                                <FontAwesomeIcon icon={faPlusCircle} />
                                <span style={{marginLeft:"1mm"}}>
                                </span>
                                </Button>
                                </InputGroup>

                            </Card.Text>
                            </Card.Body>
                        </Card>
                        <br />
                        <br />
                    </div>
                </div>
            </div>
        ) 
    }
}

export default StudentJobPreferences