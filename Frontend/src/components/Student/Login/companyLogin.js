import React, {Component} from 'react';
import '../../../Login.css'
import '../../../App.css'
import {Redirect} from 'react-router';
import { Link } from 'react-router-dom';
import SideBarStudent from '../Navbar/sidebar_student';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import {Button} from 'react-bootstrap'
import BasicProfileModal from '../Profile/basicProfile_modalForm_student';
import ReactModalLogin from "react-modal-login";
// import Modal from 'react-modal';


// import axios from 'axios';
// import backendServer from '../../config'
// const backendServer = "http://localhost:3001"

class Login extends Component{
    //call the constructor method
    constructor(props){
        super(props);
        //maintain the state required for this component
        this.state = {
            cust_username : "",
            cust_password : "",
            cust_authFlag : false,
            cust_err: "",
            showModal: false,
            loading: false,
            error: null,
            showModal: false,
            loggedIn: null,
            initialTab: null,
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

    componentWillMount(){
        this.setState({
            authFlag : false,
            err: ""
        })
    }
    
    cust_usernameChangeHandler = (e) => {
        this.setState({
            username : e.target.value
        })
    }
    
    cust_passwordChangeHandler = (e) => {
        this.setState({
            password : e.target.value
        })
    }
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

    onLogin() {
        console.log('__onLogin__');
        console.log('email: ' + document.querySelector('#email').value);
        console.log('password: ' + document.querySelector('#password').value);
    
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
    
        if (!email || !password) {
          this.setState({
            error: true
          })
        } else {
        
          this.onLoginSuccess('form');
        }
    }

    onLoginSuccess(method, response) {

        this.closeModal();
        this.setState({
          loggedIn: method,
          loading: false
        })
    }
    onLoginFail(method, response) {

        this.setState({
          loading: false,
          error: response
        })
      }

    openModal() {
        this.setState({
          showModal: true
        });
      }
     
      closeModal() {
        this.setState({
          showModal: false,
          error: null
        });
      }
     
      onLoginSuccess(method, response) {
        console.log("logged successfully with " + method);

      }
     
      onLoginFail(method, response) {
        console.log("logging failed with " + method);
        this.setState({
          error: response
        });
      }
     
      startLoading() {
        this.setState({
          loading: true
        });
      }
     
      finishLoading() {
        this.setState({
          loading: false
        });
      }
     
      afterTabsChange() {
        this.setState({
          error: null
        });
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
                                    <button onClick={() => this.openModal()}>Open Modal</button>
 
                                    <ReactModalLogin
                                    visible={this.state.showModal}
                                    onCloseModal={this.closeModal.bind(this)}
                                    loading={this.state.loading}
                                    error={this.state.error}
                                    tabs={{
                                        afterChange: this.afterTabsChange.bind(this)
                                    }}
                                    loginError={{
                                        label: "Couldn't sign in, please try again."
                                    }}
                                    registerError={{
                                        label: "Couldn't sign up, please try again."
                                    }}
                                    startLoading={this.startLoading.bind(this)}
                                    finishLoading={this.finishLoading.bind(this)}
                                    form={{
                                        onLogin: this.onLogin.bind(this),
                                        loginBtn: {
                                            label: "Sign in"
                                          },
                                        loginInputs: [
                                        {
                                          containerClass: 'RML-form-group',
                                          label: 'Email',
                                          type: 'email',
                                          inputClass: 'RML-form-control',
                                          id: 'email',
                                          name: 'email',
                                          placeholder: 'Email',
                                        },
                                        {
                                          containerClass: 'RML-form-group',
                                          label: 'Password',
                                          type: 'password',
                                          inputClass: 'RML-form-control',
                                          id: 'password',
                                          name: 'password',
                                          placeholder: 'Password',
                                        }
                                      ],
                                    }}
                                    
                                    />
                                    
                                </div>
                                
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