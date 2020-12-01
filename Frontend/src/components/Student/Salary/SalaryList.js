
import React from 'react';
import { Card, Button, Modal, Form, Alert, Badge } from 'react-bootstrap';

export const SalaryList = (props) => {    
    let salaryList = props.salaryList.salary;
    console.log(salaryList)
    const list = Object.keys(salaryList).map(key =>
        <div>
                <hr />
                    <p style={{marginLeft: "10px", fontSize: "20px", color:"#1355a9",fontWeight: "bold"}}> {salaryList[key]._id.job_title}</p>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                    <div>
                        <p style={{marginLeft: "10px",fontWeight: "bold"}}> ${salaryList[key].base_salary + salaryList[key].bonus}/yr</p>
                        <p style={{fontWeight: "light",fontSize: "10px", marginLeft: "10px",  padding: "0px"}}>Avg. Total Pay</p>
                    </div>
                    <div>
                        <Button style={{ backgroundColor: "transparent", border: "none",color: "grey",fontSize: "25px"}}><i class="fa fa-angle-right"></i></Button> 
                     </div>
                     <div>
                        <p style={{marginLeft: "10px",fontWeight: "bold"}}> ${salaryList[key].base_salary}/yr</p>
                        <p style={{fontWeight: "light",fontSize: "10px", marginLeft: "10px",  padding: "0px"}}>Base Pay</p>
                     </div>
                    <div>
                        <p style={{marginLeft: "10px",fontWeight: "bold"}}>${salaryList[key].bonus}/yr</p>
                        <p style={{fontWeight: "light",fontSize: "10px", marginLeft: "10px",  padding: "0px"}}>Additional Pay</p>
                    </div>
                    </div>
            </div>
    );
    return (
        <div>
            {list}
         </div>
    );  
}
