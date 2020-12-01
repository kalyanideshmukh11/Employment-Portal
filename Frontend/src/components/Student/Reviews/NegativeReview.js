import React from 'react';
import { Card, Button, Modal, Form, Alert, Badge } from 'react-bootstrap';

export const NegativeReview = (props) => {  
    let negative = props.negativeReview;
    console.log("Inside negative review")
    console.log(negative) 
    if(negative){
      const  createElements=(n) => {
        var elements = [];
        for (let i = 0; i < n; i++) {
          elements.push(
            <i className='fa fa-star' aria-hidden='true' style={{ color: 'green' }}></i>,
          );
        }
        return elements;
      } 

    const list = (
        <div>
                <hr /> 
                <Button class="button button1" style={{backgroundColor: "#eb4133", bordercolor:"#eb4133", color: "white", fontSize: "9px"}}>Negative Review</Button> 
                    <p style={{marginLeft: "10px", fontSize: "20px", color:"#1355a9",fontWeight: "bold"}}>"{negative.headline}"</p>
                    <p style={{marginLeft: "10px"}}>{negative.rating}.0 {createElements(negative.rating)}</p>
                    <p style={{marginLeft: "10px"}}> {negative.description}</p>
                    <p style={{fontWeight: "bold", marginLeft: "10px",  padding: "0px"}}>Pros</p>
                    <p style={{marginLeft: "10px"}}>{negative.pros}</p>
                    <p style={{fontWeight: "bold", marginLeft: "10px"}}>Cons</p>
                    <p style={{marginLeft: "10px"}}>{negative.cons}</p>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <div>
                             </div>
                        <div>
                            <Button style={{backgroundColor: "transparent", bordercolor: "DodgerBlue",hoverbackground:"DodgerBlue", color: "#1355a9", fontSize: "15px"}}>Helpful({negative.helpful})</Button>
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
else{
    return(
        <div>
            <p>Loading negative review.</p>
        </div>
    )
}
    
}
