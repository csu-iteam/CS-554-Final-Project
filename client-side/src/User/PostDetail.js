import  React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@material-ui/core';
import axios from 'axios';
import '../App.css';

const PostDetail = (props) => {

    const [loading, setLoading] = useState(true);
    const [postData, setPostData] = useState(undefined);
    const postId = props.match.params.id;


    let card;

    //get data from database
    useEffect(() => {
        console.log('PostDetail useEffect fired');
        async function fetchData() {
            try {
                const data = await axios.get(`http://localhost:3008/posts/${postId}`);   
                setPostData(data);
                setLoading(false);
            } catch (e) {
                // setError(true);
                console.log(e);
            }
        }
        fetchData();
    }, []
    );

    
    const construct = ()=> {
        return(
            <Card style = {{width: '70%', margin: 'auto', height: '15vh'}}>
                <Card.Img
                    variant='top'
                    src ={`${postData.img}/portrait_medium.jpg`}
                    alt="Image"
                    style={{
                        width: '300px',
                        height: '500px',
                    }}
                />
                <Card.Title style={{ textAlign: 'center', fontWeight: 'normal' }}>
                    {postData.title}
                </Card.Title>
                <Card.Body style={{ height: '25vh', overflow: 'scroll' }}>
                    
                    <Card.Text>Price: {postData.price}</Card.Text>
                    <Card.Text>Release Time: {postData.time}</Card.Text>
                    <Card.Text>Tag: {postData.tag}</Card.Text>
                    <Card.Text>Description: {postData.description}</Card.Text>
                    <Card.Text>Seller: {postData.userWhoPost.name}</Card.Text>

                </Card.Body>
                <Card.Body>
                    <Card.Link onClick={()=>{
                        window.history.back();
                    }}>
                        Go BACK
                    </Card.Link>
                    <br/>
                </Card.Body>
            </Card>
        )
    }



    if (loading) {
        return (
            <div>
                <h2>Loading....</h2>
            </div>
        )
    } 
    if(postData){
        card = construct();
    }

    return (
        <div>
            {card}
        </div>
    )
};

export default PostDetail;
