import React, {Component} from 'react';
import ContributionsSidebar from '../Navbar/contributions_sideBar'
import StudentNavbar from '../Navbar/navbar_student'
import {Button, Card, Table} from 'react-bootstrap'

class SalaryContribution extends Component{
 constructor(props){
     super(props)
         this.state = {

     }
 }
 render(){
     return(
        <div>
            <StudentNavbar />
       
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
                    <Button style={{backgroundColor: '#1861bf', borderColor: "#1861bf"}} href=''>
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
                        <th style={{padding:"10px 0px 10px 10px"}}>Employee Status</th>
                        <th style={{padding:"10px 0px 10px 10px"}}>Submitted</th>
                        </tr>
                    </thead>
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