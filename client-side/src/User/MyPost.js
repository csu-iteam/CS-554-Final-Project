import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography, makeStyles } from '@material-ui/core';
import axios from 'axios';
import noImage from '../img/no_image.jpg';


import '../App.css';

const useStyles = makeStyles({ //TODO: should be modified
    card: {
        maxWidth: 550,
        height: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 5,
        border: '1px solid #1e8678',
        boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);'
    },
    titleHead: {
        borderBottom: '1px solid #1e8678',
        fontWeight: 'bold'
    },
    grid: {
        flexGrow: 1,
        flexDirection: 'row'
    },
    media: {
        height: '100%',
        width: '100%'
    },
    button: {
        color: '#1e8678',
        fontWeight: 'bold',
        fontSize: 12
    }
});

const MyPost = (props) => {

    const currentEmail = props.match.params.currentEmail;
    
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [postData, setPostData] = useState([]);

    let card = null;


    //get data from database
    useEffect(() => {
        console.log('myPost useEffect fired');
        async function fetchData() {
            try {
                let url = `http://localhost:3008/posts/getpostbyuseremail/${currentEmail}`;
                const { data } = await axios.get(url,
                    { headers: { Accept: 'application/json' } });
                setPostData(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []
    );

    


    const bulidCard = (post) => {
        return (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={post._id}>
                <Card className={classes.card} variant='outlined'>
                    <CardActionArea>
                        <Link to={`/post/${post._id}`}>
                            <CardMedia
                                className={classes.media}
                                component='img'
                                //TODO: image={post.thumbnail ? `${post.thumbnail.path}/portrait_incredible.${post.thumbnail.extension}` : noImage} haven't create img upload
                                image={noImage}
                                title='post image'
                            />

                            <CardContent>
                                <Typography className={classes.titleHead} gutterBottom variant='h6' component='h3'>
                                    {post.title}
                                </Typography>
                                <Typography variant='body3' color='textSecondary' component='p'>
                                    Price: {post.price}
                                </Typography>
                                <Typography variant='body3' color='textSecondary' component='p'>
                                    Seller: {post.userWhoPost.name}
                                </Typography>
                                <Typography variant='body3' color='textSecondary' component='p'>
                                    Release Time: {post.time}
                                </Typography>
                                
                            </CardContent>
                        </Link>
                    </CardActionArea>
                </Card>
                {/* <button className = {classes.button} id={post._id} onClick= {handleDelete} to={`/mypost/${currentEmail}`}>Off Shelf</button> */}
            </Grid>
        );
    };

    card =
        postData &&
        postData.map((post) => {
            return bulidCard(post);
        })

    if (loading) {
        return (
            <div>
                <h2>Loading....</h2>
            </div>
        )
    } else {
        return (
            <div>
                <br />
                <Grid container className={classes.grid} spacing={5}>
                    {card}
                </Grid>
                
            </div >
            
        )
    }
};

export default MyPost;
