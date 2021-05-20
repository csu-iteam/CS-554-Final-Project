import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';
import cookie from 'react-cookies'
import MultiSelect from "react-multi-select-component";

const options = [
    { label: "Electronics", value: "Electronics" },
    { label: "Computers", value: "Computers" },
    { label: "Smart Home", value: "Smart Home" },
    { label: "Home,Garden,Tools", value: "Home,Garden,Tools" },
    { label: "Pet Supplies", value: "Pet Supplies" },
    { label: "Beauty,Health", value: "Beauty,Health" },
    { label: "Handmade", value: "Handmade" },
    { label: "Books", value: "Books" },
    { label: "Outdoors", value: "Outdoors" },
    { label: "MoneyChange", value: "MoneyChange" },
    { label: "Others", value: "Others" },
];

class MakeNewPost extends Component {


    state = {
        tag: [],
        title: '',
        discription: '',
        price: '',
        selected: []
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
        let imgError = document.getElementById('imgError');

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

        try{
            let tempFile = e.target[6].files[0];
            if(!tempFile){
                imgError.hidden = false;
                imgError.innerHTML = 'Please update valid img.';
            }else{
                imgError.hidden = true;
            }
        }catch(e){
            imgError.hidden = false;
            imgError.innerHTML = 'Please update valid img.';
        }
        

        if (selectedError.hidden === true && titleError.hidden === true && discriptionError.hidden === true && priceError.hidden === true && imgError.hidden === true) {


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
                    <p>Select Tag</p>
                    <MultiSelect
                        options={options}
                        value={selected}
                        onChange={selected => this.setState({ selected })}
                        labelledBy="Select"
                        id="selected"
                    />
                </div><div id="selectedError" className="nothing-in-this-type" hidden></div>
                <div hidden>
                    <input type="string" className="form-control" id="currentEmail" defaultValue={currentEmail} name="currentEmail" />{currentEmail}<div></div>
                </div>
                <br />
                <br />
                <div className="center">
                    <label htmlFor="example2">Title</label>
                    <input type="string" className="form-control" id="title" defaultValue={title} name="title" onChange={this.handleChange} /><div id="titleError" className="nothing-in-this-type" hidden></div>
                </div>
                <br />
                <br />
                <div className="center">
                    <label htmlFor="example3">Discription</label>
                    <input type="string" className="form-control" id="discription" defaultValue={discription} name="discription" onChange={this.handleChange} /><div id="discriptionError" className="nothing-in-this-type" hidden></div>
                </div>
                <br />
                <br />
                <div className="center">
                    <label htmlFor="example4">Price</label>
                    <input type="string" className="form-control" id="price" defaultValue={price} name="price" onChange={this.handleChange} /><div id="priceError" className="nothing-in-this-type" hidden></div>
                </div>
                <br />
                <br />
                {/* <p>todo  img</p> */}
                <div className="center">
                    <label htmlFor="post-img" className="postInput">
                        Update Image      
                        <br />
                        <br />
                        <button type="submit" id="postImg" className="btn btn-primary submit-button" hidden>Upload IMG</button>
                        <input type="file" id="file_input" />
                        <div id="imgError" className="nothing-in-this-type" hidden></div>
                    </label>
                </div>
                

                <br />
                <button type="submit" className="btn btn-primary submit-button">Submit</button>
            </form>
        );
    }
};

export default MakeNewPost;
