import React, {Component} from 'react';
import '../../../Login.css'
import '../../../App.css'
import {Redirect} from 'react-router';
import { Link } from 'react-router-dom';

// import axios from 'axios';
// import backendServer from '../../config'
// const backendServer = "http://localhost:3001"
//Define a Login Component
class Login extends Component{
    //call the constructor method
    constructor(props){
        super(props);
        //maintain the state required for this component
        this.state = {
            cust_username : "",
            cust_password : "",
            cust_authFlag : false,
            cust_err: ""
        }
        //Bind the handlers to this class
        this.cust_usernameChangeHandler = this.cust_usernameChangeHandler.bind(this);
        this.cust_passwordChangeHandler = this.cust_passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            authFlag : false,
            err: ""
        })
    }
    //username change handler to update state variable with the text entered by the user
    cust_usernameChangeHandler = (e) => {
        this.setState({
            username : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    cust_passwordChangeHandler = (e) => {
        this.setState({
            password : e.target.value
        })
    }
    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        // e.preventDefault();
        // const data = {
        //     username : this.state.username,
        //     password : this.state.password
        // }
        // //set the with credentials to true
        // axios.defaults.withCredentials = true;
        // //make a post request with the user data
        // axios.post(`${backendServer}/customers/validate`,data)
        //     .then(response => {
        //         console.log(response.data)
        //         console.log("Status Code : ",response.status);
        //         if(response.status === 200){
        //             localStorage.setItem('customer_id', response.data.id)
        //             localStorage.setItem('customer_name', response.data.name)
        //             localStorage.setItem('type', "customer")
        //             this.setState({
        //                 authFlag : true,
        //                 err: response.data                       
        //             })
        //         }else{
        //             this.setState({
        //                 authFlag : false,
        //                 invalid: true
        //             })
        //         }
                
        //     })
        //     .catch(err => {
        //             this.setState({
        //                 authFlag : false,
        //                 invalid: true
        //             })
        //     })
    }

    render(){
        //redirect based on successful login
        let redirectVar = null;    
        let message = ""
        if(this.state.authFlag){
            redirectVar = <Redirect to= "/customerHome"/>
        } else if (this.state.invalid) {
            message = "Invalid username or password"
        }
        return(
            <div class="login-class"> 
                {redirectVar}
                <div >
                            <div class="main-div">
                                <div class="panel">
                            
                            <h2>Sign In</h2>
                            <p>Please enter your username and password</p>
                            
                        </div>
                        <form onSubmit={this.submitLogin}>                        
                            <div class="form-group">
                                <input onChange = {this.cust_usernameChangeHandler} type="text" class="form-control" name="username" placeholder="Username" required/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.cust_passwordChangeHandler} type="password" class="form-control" name="password" placeholder="Password" required/>
                            </div>
                            <div style={{ color: "#ff0000" }}>{message}</div>
                            <button type="submit" class="btn btn-primary">Login</button>                 
                            <div class="signup-section">
                                
                                <div>
                                    <p>Don't have an account?
                                        <Link to='/CustomersSignup'>   Signup here</Link>
                                    </p>
                                    {/* <p>
                                        <Link to="/RestaurantsLogin">Restaurant? Click here to sign in</Link>
                                    </p> */}
                                    </div>
                                </div>
                        </form>

                    </div>
                    
                </div>
                
                {/* <div class="restaurant-form"> <RestaurantsLogin /></div> */}
            </div>
        )
    }
}
//export Login Component
export default Login;