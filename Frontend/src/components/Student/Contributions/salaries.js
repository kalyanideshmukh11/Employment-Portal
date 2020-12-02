import React, {Component} from 'react';
import ContributionsSidebar from '../Navbar/contributions_sideBar'
import StudentNavbar from '../Navbar/navbar_student'
import {Button, Card, Table} from 'react-bootstrap'
import axios from 'axios'
import backendServer from "../../../webConfig"
import AddSalaryModalForm from './addSalaryModalForm'

class SalaryContribution extends Component{
 constructor(props){
     super(props)
         this.state = {
            salary_reviews: [],
            add_salary_modal_form: false
     }
 }
 componentWillMount = () => {
    axios.get(`${backendServer}student/studentSalaries/${localStorage.getItem("sql_student_id")}`,
    {headers: { Authorization: `${localStorage.getItem("token")}` }
    })
    .then(response => {
        this.setState({
            salary_reviews: this.state.salary_reviews.concat(response.data) ,
        })

    })

 }

 handleSalaryModalClose = () => this.setState({add_salary_modal_form: false});
 handleSalaryModalShow = () => this.setState({add_salary_modal_form: true});


 render(){
    let details = null;
    if(this.state.salary_reviews.length > 0){
       details = this.state.salary_reviews.map(salary => {
           return(
               <tr>
                   <td>{
                       <div>
                       <span style={{fontWeight: '600', fontSize: "15px", padding:"20px 10px 10px 10px"}}>{salary.job_title}</span> <br />
                   <span style={{fontSize: '15px', fontWeight: '500', padding:"20px 10px 10px 10px"}}>{salary.company} </span>
                   <p style={{padding: "20px 10px 10px 10px"}}> Around <span style={{fontWeight: "600"}}>{salary.year_of_experience}</span> years of experience. Recieved an
                   base salary of ${salary.base_salary}/yr  with yearly bonus of ${salary.bonus}.
                   <span> </span></p>
                       </div>}</td>
   
                   <td style={{textAlign: "center", verticalAlign:"middle"}}>{salary.createdAt.split('T')[0]}</td>
               </tr>
           )
       })
    } else {
        details = (
        <tr>
           <td colSpan="2" style={{padding: "10px 10px 10px 10px", color:"#33333", verticalAlign:"middle"}}> Please add your salaries to show it here.</td>
        </tr>)
        }
     return(
        <div>
            <StudentNavbar />
            <AddSalaryModalForm show={this.state.add_salary_modal_form} onHide={this.handleSalaryModalClose} />
       
        <div className='row' style={{background: "#eaeaea"}}>
        <div className="col-4 contri" style={{paddingLeft:"5cm"}}> 
        <ContributionsSidebar />
        </div>
        <div className="col-8 contri" style={{padding:"28px 20px 0px 20px"}}>  
        <Card  style={{ width: '44rem', padding:"10px 20px 0px 10px" }}>
        <Card.Body>
            <Card.Title>
                Salaries
            </Card.Title>
            
                <Card.Text>
                    <Button style={{backgroundColor: '#1861bf', borderColor: "#1861bf"}} onClick={this.handleSalaryModalShow}>
                        Add a Salary
                    </Button>
                </Card.Text>
                <br />
                <Card.Text>
                All salaries you've posted are displayed below.

                </Card.Text>
                <Card.Text>
                    <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th style={{width:"60%", padding:"10px 0px 10px 10px"}}>Details</th>
                        <th style={{padding:"10px 0px 10px 10px"}}>Submitted</th>
                        </tr>
                    </thead>
                    <tbody>
                        {details}
                    </tbody>
                    </Table>
                </Card.Text>

            </Card.Body>
            
            </Card>               
            
        
    </div>
    </div>
    </div>
     )
 }
}
export default SalaryContribution