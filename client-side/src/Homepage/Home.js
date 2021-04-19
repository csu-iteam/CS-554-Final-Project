import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography, makeStyles } from '@material-ui/core';
import axios from 'axios';
import noImage from '../img/download.jpeg';
import HomeTypeListButton from './HomeTypeListButton';
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

const Home = () => {

    const regex = /(<([^>]+)>)/gi;
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [postData, setPostData] = useState([]);
    let card = null;

    //get data from database
    useEffect(() => {
        console.log('homepage useEffect fired');
        async function fetchData() {
            try {
                const { data } = await axios.get('http://localhost:3008/posts',
                    { headers: { Accept: 'application/json' } });
                console.log(data);
                setPostData(data);
                console.log(postData);
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
                                <Typography variant='body2' color='textSecondary' component='p'>
                                    {post.body ? post.body.replace(regex, '').substring(0, 150) + '...' : 'No Description'}
                                </Typography>
                            </CardContent>
                        </Link>
                    </CardActionArea>
                </Card>
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
                <HomeTypeListButton />
                <br />
                <Grid container className={classes.grid} spacing={5}>
                    {card}
                </Grid>
            </div >
        )
    }
};

export default Home;