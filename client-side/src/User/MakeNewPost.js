import React, { Component, useState } from 'react';
import axios from 'axios';
import '../App.css';


class MakeNewPost extends Component {

    state = {
        tag: '',
        title: '',
        discription: '',
        price: ''
    };

    handleSubmit = async e => {
        <script type="text/javascript"></script>

        let isNullFormate = "^[ ]+$";
        let isNullCheck = new RegExp(isNullFormate);

        let tag = document.getElementById('tag');
        let tagError = document.getElementById('tagError');
        let title = document.getElementById('title');
        let titleError = document.getElementById('titleError');
        let discription = document.getElementById('discription');
        let discriptionError = document.getElementById('discriptionError');
        let price = document.getElementById('price');
        let priceError = document.getElementById('priceError');
        let currentEmail = document.getElementById('currentEmail');
        e.preventDefault();

        if (!tag.value || isNullCheck.test(tag.value)) {
            tagError.hidden = false;
            tagError.innerHTML = 'Please enter valid tag.';
        } else {
            tagError.hidden = true;
        }

        if (!title.value || isNullCheck.test(title.value)) {
            titleError.hidden = false;
            titleError.innerHTML = 'Please enter valid title.';
        } else {
            titleError.hidden = true;
        }

        if (!discription.value) {
            discriptionError.hidden = false;
            discriptionError.innerHTML = 'Please enter valid discription.';
        } else {
            discriptionError.hidden = true;
        }

        if (!price.value) {
            priceError.hidden = false;
            priceError.innerHTML = 'Please enter valid price.';
        } else {
            priceError.hidden = true;
        }

        if (tagError.hidden === true && titleError.hidden === true && discriptionError.hidden === true && priceError.hidden === true) {
            let priceNum = Number(price.value);

            ////////////////////
            let base64head = '';
            if (window.FileReader) {
                let file = e.target[6].files[0];
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = function (e) {
                    base64head = reader.result;

                    console.log(base64head)
                    ////////////////
                    axios.post(`http://localhost:3008/posts/makenewpostbyemail`, {
                        "useremail": currentEmail.value,
                        "tag": tag.value,
                        "title": title.value,
                        "discription": discription.value,
                        "price": priceNum,
                        "imgbase64head": base64head
                    }).then(function (response) {
                        console.log("response: ", response);
                        if (response.status === 200) {
                            alert('Congratulations, post submit successful!');
                            window.location.href = "/";
                        }
                    }).catch(err => console.log(err))
                }
            }
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render() {

        //userId, tag, title, discription, img, price
        const currentEmail = this.props.match.params.currentEmail;
        const { tag, title, discription, img, price } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <div hidden>
                    <input type="string" className="form-control" id="currentEmail" defaultValue={currentEmail} name="currentEmail" />{currentEmail}<div></div>
                </div>
                <div className="center">
                    <label htmlFor="example1">tag:</label>
                    <input type="string" className="form-control" id="tag" defaultValue={tag} name="tag" onChange={this.handleChange} /><div id="tagError" className="error" hidden></div>
                </div>
                <br />
                <div className="center">
                    <label htmlFor="example2">title:</label>
                    <input type="string" className="form-control" id="title" defaultValue={title} name="title" onChange={this.handleChange} /><div id="titleError" className="error" hidden></div>
                </div>
                <br />
                <div className="center">
                    <label htmlFor="example3">discription:</label>
                    <input type="string" className="form-control" id="discription" defaultValue={discription} name="discription" onChange={this.handleChange} /><div id="discriptionError" className="error" hidden></div>
                </div>
                <br />
                <div className="center">
                    <label htmlFor="example4">price:</label>
                    <input type="number" className="form-control" id="price" defaultValue={price} name="price" onChange={this.handleChange} /><div id="priceError" className="error" hidden></div>
                </div>
                {/* <p>todo  img</p> */}
                <div className="center">
                    <label for="post-img" class="postInput">
                        <button id="postImg">Upload IMG</button>
                        <input type="file" id="file_input" multiple />
                    </label>
                </div>

                <br />
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        );
    }
};

export default MakeNewPost;
