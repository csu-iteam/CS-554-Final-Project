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

const Home = () => {

    const regex = /(<([^>]+)>)/gi;
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [postData, setPostData] = useState([]);
    const [typedData, setTypedData] = useState([]);
    const [type, setType] = useState('all');
    let card = null;
    let error = null;

    //get data from database
    useEffect(() => {
        console.log('homepage useEffect fired');
        async function fetchData() {
            try {
                const { data } = await axios.get('http://localhost:3008/posts',
                    { headers: { Accept: 'application/json' } });
                setPostData(data);
                setLoading(false);
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, []
    );

    useEffect(() => {
        console.log('homepage type useEffect fired');
        async function fetchData() {
            try {
                const { data } = await axios.get('http://localhost:3008/posts/tag/' + type,
                    { headers: { Accept: 'application/json' } });
                setTypedData(data);
                setLoading(false);
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, [type]
    );

    const handleChange = (e) => {
        setType(e.target.value);
    }

    const typeSelector = (
        <div>
            <form>
                <label>Choose trade type：</label>
                <select className='selectpicker' onChange={handleChange}>
                    <option value="all">all</option>
                    <option value="furniture">furniture</option>
                    <option value="digital product">digital product</option>
                    <option value="currency exchange">currency exchange</option>
                    <option value="bicycle">bicycle</option>
                    <option value="test">test for none</option>
                </select>
            </form>
        </div>
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
                                image={post && post.imgbase64headArray ? `${post.imgbase64headArray[0].imgbase64head}` : noImage}
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
            </Grid>
        );
    };

    if (type !== 'all') {
        if (typedData.length > 0) {
            card =
                typedData &&
                typedData.map((post) => {
                    return bulidCard(post);
                })
        } else { //there is nothing of this type
            error = (
                <div>
                    <h2 className='nothing-in-this-type'>There is nothing of this type, please try another type</h2>
                </div>
            )
        }
    } else {
        card =
            postData &&
            postData.map((post) => {
                return bulidCard(post);
            })
    }

    if (loading) {
        return (
            <div>
                <h2>Loading....</h2>
            </div>
        )
    } else {
        return (
            <div>
                {typeSelector}
                <br />
                {error}
                <Grid container className={classes.grid} spacing={5}>
                    {card}
                </Grid>
            </div >
        )
    }
};

export default Home;