import React, {Component} from 'react';
import '../../../Login.css'
import '../../../App.css'
import {Redirect} from 'react-router';
import { Link } from 'react-router-dom';
import SideBarStudent from '../Navbar/sidebar_student';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import {Button} from 'react-bootstrap'
import BasicProfileModal from '../Profile/basicProfile_modalForm_student'


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
            show: false,
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

    showModal = () => {
        this.setState({ show: true });
    };
    
    hideModal = () => {
    this.setState({ show: false });
    };

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
            <div>            
                <div class="container">
                    <br /><br /><br />
                    <br /><br /><br />
                    <br /><br /><br />
                    <div class="d-flex justify-content-center h-100">
                        <div class="card">
                            <div class="card-header">
                                <h3>Sign Up</h3>
                                <div class="d-flex justify-content-end social_icon">
                                    {/* <span><i class="fab fa-facebook-square"></i></span>
                                    <span><i class="fab fa-google-plus-square"></i></span>
                                    <span><i class="fab fa-twitter-square"></i></span> */}
                                </div>
                            </div>
                            <div class="card-body">
                                <form>
                                    <div class="input-group form-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="fas fa-user"></i></span>
                                        </div>
                                        <input type="text" class="form-control" placeholder="Create account with Email" />
                                
                                    </div>
                                    <div class="input-group form-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="fas fa-key"></i></span>
                                        </div>
                                        <input type="password" class="form-control" placeholder="Password" />
                                    </div>
                                    <div class="row align-items-center remember">
                                        <input type="checkbox"/>Remember Me
                                    </div>
                                    <div class="form-group">
                                        <input type="submit" value="Continue with Email" class="float-right login_btn" />
                                    </div>
                                </form>
                            </div>
                            <div class="card-footer">
                                <div class="acc">
                                    Already have an account? 
                                    {/* <a href="#">Sign In</a> */}
                                    {/* <Link to='/'>   Sign In</Link> */}
                                    <button type="button" onClick={this.showModal}>Sign In</button>
                                </div>
                                {/* <div class="d-flex justify-content-center">
                                    <a href="#">Forgot your password?</a>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="post-jobs">
                    Are you hiring? <a href="#">Post Jobs</a>
                </div>
            </div>

            // {/* // <div>
            // //     <br />
            // //     <br />

                
            // //  <div class="container"></div>
            // // <div class="container"> 
            // //     {redirectVar}
            // //     <div >
            // //                 <div class="main-div">
            // //                     <div class="panel">
                            
            // //                 <h2>Sign In</h2>
            // //                 <p>Please enter your username and password</p>
                            
            // //             </div>
            // //             <form onSubmit={this.submitLogin}>                        
            // //                 <div class="form-group">
            // //                     <input onChange = {this.cust_usernameChangeHandler} type="text" class="form-control" name="username" placeholder="Username" required/>
            // //                 </div>
            // //                 <div class="form-group">
            // //                     <input onChange = {this.cust_passwordChangeHandler} type="password" class="form-control" name="password" placeholder="Password" required/>
            // //                 </div>
            // //                 <div style={{ color: "#ff0000" }}>{message}</div>
            // //                 <button type="submit" class="btn btn-primary">Login</button>                 
            // //                 <div class="signup-section">
                                
            // //                     <div>
            // //                         <p>Don't have an account?
            // //                             <Link to='/CustomersSignup'>   Signup here</Link>
            // //                         </p>
            // //                         
            // //                         </div>
            // //                     </div>
            // //             </form>

            // //         </div>
                    
            // //     </div>
                
            // //    // </div>
            // // </div> */}
        )
    }
}
//export Login Component
export default Login;