import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';

class Register extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    };

    handleSubmit = async e => {
        <script type="text/javascript"></script>
        let isNullFormate = "^[ ]+$";
        let reEmail = /[_a-zA-Z\d\-\.]+@[_a-zA-Z\d\-]+(\.[_a-zA-Z\d\-]+)+$/;
        let isNullCheck = new RegExp(isNullFormate);
        let username = document.getElementById('userName');
        let usernameError = document.getElementById('usernameError');
        let email = document.getElementById('email');
        let emailError = document.getElementById('emailError');
        let password = document.getElementById('password');
        let passwordError = document.getElementById('passwordError');
        let passwordConfirmation = document.getElementById('passwordConfirmation');
        let passwordConfirmationError = document.getElementById('passwordConfirmationError');
        e.preventDefault();
        if (!username.value || isNullCheck.test(username.value)) {
            usernameError.hidden = false;
            usernameError.innerHTML = 'Please enter valid username.';
        } else {
            usernameError.hidden = true;
        }

        if (!email.value || isNullCheck.test(email.value) || !reEmail.test(email.value)) {
            emailError.hidden = false;
            emailError.innerHTML = 'Please enter valid email address.';
        } else if (email.value.split("@")[1] !== "stevens.edu") {
            emailError.hidden = false;
            emailError.innerHTML = 'Please register account with stevens email.';
        } else {
            emailError.hidden = true;
        }

        if (!password.value) {
            passwordError.hidden = false;
            passwordError.innerHTML = 'Please enter valid password.';
        } else if(password.value.length < 8){
            passwordError.hidden = false;
            passwordError.innerHTML = 'The length of password should be at least 8.';
        }else{
            passwordError.hidden = true;
        }

        if (!passwordConfirmation.value) {
            passwordConfirmationError.hidden = false;
            passwordConfirmationError.innerHTML = 'Please enter valid password.';
        } else if (passwordConfirmation.value !== password.value) {
            passwordConfirmationError.hidden = false;
            passwordConfirmationError.innerHTML = 'Please keep the same password.';
        } else {
            passwordConfirmationError.hidden = true;
        }
        
        if (usernameError.hidden === true && emailError.hidden === true && passwordError.hidden === true && passwordConfirmationError.hidden === true) {
            axios.post('http://localhost:3008/users/register', {
                "username": username.value,
                "email": email.value,
                "password": password.value
            })
            .then(function (response) {
                console.log("response: ", response);
                if(response.status === 200){
                    alert('Congratulations, successful registration!');
                    window.location.href = "/login";
                }
            })
            .catch(err => {
                alert("The email address input has been registered.");
                window.location.href = "/register";
            })
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    render() {
        const { username, email, password, passwordConfirmation } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="center">
                    <label htmlFor="exampleInputEmail1">UserName</label>
                    <input type="string" className="form-control" id="userName" defaultValue={username} name="username" onChange={this.handleChange} /><div id="usernameError" className="nothing-in-this-type" hidden></div>
                </div>
                <br />
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
                <div className="center">
                    <label htmlFor="exampleInputPassword1">Confirm Password</label>
                    <input type="password" className="form-control" id="passwordConfirmation" defaultValue={passwordConfirmation} name="passwordConfirmation" onChange={this.handleChange} /><div id="passwordConfirmationError" className="nothing-in-this-type" hidden></div>
                </div>
                <br />
                <button type="submit" className="btn btn-primary">Sign up</button>
            </form>
        );
    }
};

export default Register;
