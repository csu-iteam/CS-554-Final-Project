import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies'
import '../App.css';

class Profile extends Component {
    state = {
        username: cookie.load('current_username'),
        email: cookie.load('current_email'),
        password: cookie.load('current_password'),
        userId: cookie.load('current_id')
    };

    componentWillMount(){
        var username= cookie.load('current_username');
        if(!username){
            window.location.href = "/login";
        }
    }

    handleSubmit = async e => {
        <script type="text/javascript"></script>
        let isNullFormate = "^[ ]+$";
        let isNullCheck = new RegExp(isNullFormate);
        let username = document.getElementById('userName');
        let usernameError = document.getElementById('usernameError');
        let email = document.getElementById('email');
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
        
        if (usernameError.hidden === true && passwordError.hidden === true && passwordConfirmationError.hidden === true) {
            axios.put('http://localhost:3008/users/' + this.state.userId, {
                "username": username.value,
                "email": email.value,
                "password": password.value
            })
            .then(function (response) {
                console.log(response.data)
                if(response.status === 200){
                    alert('Congratulations, update successfully!');

                    cookie.save('current_username', response.data.username);
                    cookie.save('current_password', response.data.password);
                }
            })
            .catch(err => console.log(err))
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    render() {
        const { username, email, password } = this.state;
        console.log(this.state);
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="center">
                    <label htmlFor="exampleInputEmail1" for="userName" >UserName</label>
                    <input type="string" className="form-control" id="userName" defaultValue={username} name="username" onChange={this.handleChange} /><div id="usernameError" className="error" hidden></div>
                </div>
                <br />
                <div className="center">
                    <label htmlFor="exampleInputEmail1" for="email">Email address</label>
                    <input readOnly="readonly" type="string" className="form-control" id="email" defaultValue={email} name="email" onChange={this.handleChange} />
                </div>
                <br />
                <div className="center">
                    <label htmlFor="exampleInputPassword1" for="password">Password</label>
                    <input type="password" className="form-control" id="password" defaultValue={password} name="password" onChange={this.handleChange} /><div id="passwordError" className="error" hidden></div>
                </div>
                <br />
                <div className="center">
                    <label htmlFor="exampleInputPassword1" for="passwordConfirmation">Confirm Password</label>
                    <input type="password" className="form-control" id="passwordConfirmation" defaultValue={password} name="passwordConfirmation" onChange={this.handleChange} /><div id="passwordConfirmationError" className="error" hidden></div>
                </div>
                <br />
                <button type="submit" className="btn btn-primary submit-button">Update</button>
            </form>
        );
    }
};

export default Profile;
