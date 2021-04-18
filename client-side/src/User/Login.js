import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';


class Login extends Component {
    state = {
        email: '',
        password: ''
    };

    handleSubmit = async e => {
        <script type="text/javascript"></script>
        let isNullFormate = "^[ ]+$";
        let reEmail = /[_a-zA-Z\d\-\.]+@[_a-zA-Z\d\-]+(\.[_a-zA-Z\d\-]+)+$/;
        let isNullCheck = new RegExp(isNullFormate);
        let email = document.getElementById('email');
        let emailError = document.getElementById('emailError');
        let password = document.getElementById('password');
        let passwordError = document.getElementById('passwordError');
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
        } else {
            passwordError.hidden = true;
        }
        if(emailError.hidden === true && passwordError.hidden === true){
        e.preventDefault();
        console.log(this.state);
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
                    <input type="string" className="form-control" id="email" defaultValue={email} name="email" onChange={this.handleChange} /><div id="emailError" className="error" hidden></div>
                </div>
                <br />
                <div className="center">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="password" defaultValue={password} name="password" onChange={this.handleChange} /><div id="passwordError" className="error" hidden></div>
                </div>
                <br />
                <button type="submit" className="btn btn-primary">Sign in</button> <Link className="showlink" to="/register">
                    Don't have an account? Sign here.
          </Link>
            </form>
        );
    }
};

export default Login;
