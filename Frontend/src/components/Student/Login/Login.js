import React, {Component} from 'react';
import '../../../Login.css'
import '../../../App.css'
import {Redirect} from 'react-router';
import ReactModalLogin from "react-modal-login";
import axios from 'axios';
import backendServer from '../../../webConfig';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email : "",
            password : "",
            first_name: "",
            last_name: "",
            authFlag : false,
            err: "",
            loading: false,
            error: null,
            showModal: false,
            loggedIn: null,
            initialTab: null,
            redirect: null
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.onSignUp = this.onSignUp.bind(this);
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    onSignUp = (e) => {
        e.preventDefault();
        if (this.state.password.length < 7) {
          this.setState({
            message: "Minimum password length is 6 characters"
          })
          return
        }
        const data = {
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          email : this.state.email,
          password : this.state.password
        }
        axios.defaults.withCredentials = true;
        axios.post(`${backendServer}student/register`,data)
            .then(response => {
                console.log(response.data)
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                  alert("Signed Up successfully")
                  this.openModal()
                }else{
                    this.setState({

                        authFlag : false,
                        invalid: true
                    })
                }
            })
            .catch(err => {
              console.log(err)
                    this.setState({
                        message : "Email already exists"
                    })
            })
    }

    onLogin() {
        // console.log('email: ' + document.querySelector('#email').value);
        // console.log('password: ' + document.querySelector('#password').value);

        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
    
        if (!email || !password) {
          this.setState({
            error: true
          })
        } else {
          const login_data = {
            email : email,
            password: password
          }

          axios.post(`${backendServer}student/login`,login_data)
            .then(response => {
                console.log(response.data)
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                  
                  this.onLoginSuccess(response.data.id);
                }else{
                    this.onLoginFail('form');
                }
            })
            .catch(err => {
              console.log(err)
              this.onLoginFail('form');
            })
        }
    }

    onLoginSuccess(method, response) {

        localStorage.setItem('sql_student_id', method)
        localStorage.setItem('type', "student")
        console.log("logged successfully with " + method);
        this.setState({
          redirect: <Redirect to= "/student/home"/>
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
      this.forceUpdate()
    }
     
    onLoginFail(method, response) {
      console.log("logging failed with " + method);
      this.setState({
        error: true
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

      window.location.reload();
      this.setState({
        error: null,
        showModal: false
      });
    }

    render(){
        let redirectVar = null;    
        if(this.state.redirect){
            redirectVar = this.state.redirect
        }
        return(
            <div> 
                {redirectVar}
                <div class="container">
                    <br /><br /><br />
                    <br /><br /><br />
                    <br /><br /><br />
                    <div class="d-flex justify-content-center h-100">
                        <div class="card">
                            <div class="card-header">
                                <h3>Sign Up</h3>
                            </div>
                            <div class="card-body">
                                <form onSubmit={this.onSignUp}>
                                    <div class="input-group form-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="fas fa-user"></i></span>
                                        </div>
                                        <input required type="text" class="form-control" onChange = {this.changeHandler} name="fisrt_name" placeholder="First Name" />
                                
                                    </div>

                                    <div class="input-group form-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="fas fa-user"></i></span>
                                        </div>
                                        <input required type="text" class="form-control" onChange = {this.changeHandler} name="last_name" placeholder="Last Name" />
                                
                                    </div>

                                    <div class="input-group form-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="fas fa-envelope"></i></span>
                                        </div>
                                        <input required type="email" class="form-control" onChange = {this.changeHandler} name="email" placeholder="Create account with Email" />
                                
                                    </div>
                                    <div class="input-group form-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="fas fa-key"></i></span>
                                        </div>
                                        <input required type="password" class="form-control" name="password" onChange = {this.changeHandler} placeholder="Password" />
                                    </div>
                                    <div style={{ color: "#ff0000" }}>{this.state.message}</div>
                                    <div class="form-group">
                                        <input type="submit" value="Continue with Email" class="float-right login_btn" />
                                    </div>
                                </form>
                            </div>
                            <div class="card-footer">
                                <div class="acc">
                                    Already have an account?
                                    <button onClick={() => this.openModal()}>Sign In</button>
 
                                    <ReactModalLogin
                                    ref={(r) => this.loginModalRef = r}
                                    visible={this.state.showModal}
                                    onCloseModal={this.closeModal.bind(this)}
                                    loading={this.state.loading}
                                    error={this.state.error}
                                    tabs={{
                                        afterChange: this.afterTabsChange.bind(this)
                                    }}
                                    loginError={{
                                        label: "Invalid username or password"
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
        )
    }
}

export default Login;