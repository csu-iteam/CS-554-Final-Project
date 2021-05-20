import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import cookie from 'react-cookies'
import '../App.css';


class Login extends Component {
    state = {
        email: '',
        password: ''
    };

    componentWillMount(){
        var cookie_email= cookie.load('cookie_email');
        var cookie_password = cookie.load('cookie_password');
        if(cookie_email && cookie_password){
            this.state.email = cookie_email;
            this.state.password = cookie_password;
        }
    }

    handleSubmit = async e => {
        <script type="text/javascript"></script>
        let isNullFormate = "^[ ]+$";
        let reEmail = /[_a-zA-Z\d\-\.]+@[_a-zA-Z\d\-]+(\.[_a-zA-Z\d\-]+)+$/;
        let isNullCheck = new RegExp(isNullFormate);
        let email = document.getElementById('email');
        let emailError = document.getElementById('emailError');
        let password = document.getElementById('password');
        let passwordError = document.getElementById('passwordError');

        e.preventDefault();
        if (!email.value || isNullCheck.test(email.value) || !reEmail.test(email.value)) {
            emailError.hidden = false;
            emailError.innerHTML = 'Please enter valid email address.';
        } else if (email.value.split("@")[1] !== "stevens.edu") {
            emailError.hidden = false;
            emailError.innerHTML = 'Please login with stevens email.';
        } else {
            emailError.hidden = true;
        }

        if (!password.value) {
            passwordError.hidden = false;
            passwordError.innerHTML = 'Please enter valid password.';
        } else {
            passwordError.hidden = true;
        }
        if(emailError.hidden === true && passwordError.hidden === true){
            axios.post('http://localhost:3008/users/login', {
                "email": email.value,
                "password": password.value
            })
            .then(function (response) {
                if(response.status === 200){
                    alert('Login successful.');
                    //Set cookie
                    let inFifteenMinutes = new Date(new Date().getTime() + 3 * 60 * 60 * 1000);
                    cookie.save('cookie_email', email.value, { expires: inFifteenMinutes });
                    cookie.save('cookie_password', password.value, { expires: inFifteenMinutes });
                    cookie.save('current_username', response.data.username);
                    cookie.save('current_email', response.data.email);
                    cookie.save('current_password', response.data.password);
                    cookie.save('current_id', response.data._id);
                    
                    window.location.href = "/";
                }
            })
            .catch(err => alert('Email or password is not correct.'))
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render() {
        const { email, password } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="center">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="string" className="form-control" id="email" defaultValue={email} name="email" onChange={this.handleChange} /><div id="emailError" className="nothing-in-this-type" hidden></div>
                </div>
                <br />
                <div className="center">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="password" defaultValue={password} name="password" onChange={this.handleChange} /><div id="passwordError" className="nothing-in-this-type" hidden></div>
                </div>
                <br />
                <button type="submit" className="btn btn-primary submit-button">Sign in</button> <Link className="showlink registerLink" to="/register">
                    Don't have an account? Sign here.
          </Link>
            </form>
        );
    }
};

export default Login;
