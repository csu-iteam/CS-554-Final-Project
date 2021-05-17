import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';

import MultiSelect from "react-multi-select-component";

const options = [
    { label: "A", value: "A" },
    { label: "B", value: "B" },
    { label: "C", value: "C" },
    { label: "D", value: "D" },
    { label: "E", value: "E" },
    { label: "F", value: "F" },
    { label: "G", value: "G" },
    { label: "H", value: "H" },
    { label: "I", value: "I" },
];

class MakeNewPost extends Component {


    state = {
        tag: [],
        title: '',
        discription: '',
        price: '',
        selected: []
    };




    handleSubmit = async e => {
        <script type="text/javascript"></script>

        let isNullFormate = "^[ ]+$";
        let isNullCheck = new RegExp(isNullFormate);
        let { selected } = this.state;
        //let selected = document.getElementById('selected');
        let selectedError = document.getElementById('selectedError');
        let title = document.getElementById('title');
        let titleError = document.getElementById('titleError');
        let discription = document.getElementById('discription');
        let discriptionError = document.getElementById('discriptionError');
        let price = document.getElementById('price');
        let priceError = document.getElementById('priceError');
        let currentEmail = document.getElementById('currentEmail');
        e.preventDefault();
        if (selected.length <= 0) {
            selectedError.hidden = false;
            selectedError.innerHTML = 'Please enter valid tag.';
        } else {
            selectedError.hidden = true;
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

        if (selectedError.hidden === true && titleError.hidden === true && discriptionError.hidden === true && priceError.hidden === true) {


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
                        "tag": selected.map((x) => { return x.value }),
                        "title": title.value,
                        "discription": discription.value,
                        "price": price.value,
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
        const { selected, title, discription, price } = this.state;


        return (
            <form onSubmit={this.handleSubmit}>

                {/* <MutiTags id="tag" />
                <MutiTags bgcolor={this.state.bgcolor} changeColor={(color)=>{this.bgChange(color)}} /> */}
                <div className="center" >
                    <p>Select Tag:</p>
                    <MultiSelect
                        options={options}
                        value={selected}
                        onChange={selected => this.setState({ selected })}
                        labelledBy="Select"
                        id="selected"
                    />
                </div><div id="selectedError" className="error" hidden></div>




                <div hidden>
                    <input type="string" className="form-control" id="currentEmail" defaultValue={currentEmail} name="currentEmail" />{currentEmail}<div></div>
                </div>
                {/* <div className="center">
                    <label htmlFor="example1">tag:</label>
                    <input type="string" className="form-control" id="tag" defaultValue={tag} name="tag" onChange={this.handleChange} /><div id="tagError" className="error" hidden></div>
                </div> */}
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
                    <input type="string" className="form-control" id="price" defaultValue={price} name="price" onChange={this.handleChange} /><div id="priceError" className="error" hidden></div>
                </div>
                <br />
                <br />
                {/* <p>todo  img</p> */}
                <div className="center">
                    <label for="post-img" class="postInput">
                        <button type="submit" id="postImg">Upload IMG</button>
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
