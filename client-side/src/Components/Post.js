import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import noImage from '../img/no_image.jpg';
import cookie from 'react-cookies'
import {
    makeStyles,
    Card,
    CardContent,
    CardMedia,
    Typography,
    CardHeader,
    Button,
    Chip
} from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import StarOutIcon from '@material-ui/icons/StarOutline';
import '../App.css';
import axios from 'axios';


const useStyles = makeStyles({
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
    },
    lix: {
        color: '#000'
    },
    secondary_container: {
        textAlign: 'justify'
    },
    secondary_title: {
        fontWeight: 'bold',
        color: '#000'
    }
});

const Post = (props) => {
    const [postData, setPostData] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [badRequest, setBadRequest] = useState(false);
    const [followState, setFollowState] = useState(0);//0 seller 1 unfollow 2 follow
    const classes = useStyles();
    let followButton = "";

    useEffect(() => {
        console.log('useEffect fired item');
        async function fetchData() {
            try {
                let id = props.match.params.id;
                // let reg = /^[0-9]*[0-9][0-9]*$/;
                //!reg.test(id)
                if (false) {
                    setBadRequest(true);
                    setLoading(false);
                } else {
                    let { data } = await axios.get(`http://localhost:3008/posts/${id}`);
                    setPostData(data);
                    setLoading(false);
                }

            } catch (e) {
                setNotFound(true);
                setLoading(false);
                console.log(e);
            }
        }
        fetchData();
    }, [props.match.params.id]);

    useEffect(() => {
        async function changeFollowState(userId, posrtId) {
            if (followState == 1) {
                await axios.get(`http://localhost:3008/posts/follow/${userId}/${posrtId}`);
                //followButton = <Button variant="contained" color="primary" startIcon={<StarIcon />} onClick={setFollowState(2)}>Cancel Follow</Button>
            } else if (followState == 2) {
                await axios.get(`http://localhost:3008/posts/unFollow/${userId}/${posrtId}`);
                //followButton = <Button variant="outlined" color="primary" startIcon={<StarOutIcon />} onClick={setFollowState(1)}>Follow</Button>
            }
            try {
                let id = props.match.params.id;
                // let reg = /^[0-9]*[0-9][0-9]*$/;
                //!reg.test(id)
                if (false) {
                    setBadRequest(true);
                    setLoading(false);
                } else {
                    let { data } = await axios.get(`http://localhost:3008/posts/${id}`);
                    setPostData(data);
                    setLoading(false);
                }

            } catch (e) {
                setNotFound(true);
                setLoading(false);
                console.log(e);
            }
        }
        if (postData) {
            console.log('x');
            changeFollowState(cookie.load('current_id'), postData._id);
        }
    }, [followState]);

    function generateTag(tag) {
        return (
            <Chip label={tag} color='primary' />
        );
    }

    let tags = postData && postData.tag.map((tag) => {
        return generateTag(tag);
    });
    // let tags='';
    function isSeller(userId, current_post) {
        if (userId == current_post.userWhoPost.id) return true;
        else return false;
    }

    function isFollowed(userId, current_post) {
        let followers = current_post.followers;
        for (let i = 0; i < followers.length; i++) {
            if (userId == followers[i]) return true;
        }
        return false;
    }

    // async function follow(userId,posrtId){
    //     await axios.get(`http://localhost:3008/follow/${userId}/${posrtId}`);
    //     console.log('f')

    //     followButton= <Button variant="contained" color="primary" startIcon={<StarIcon />} onClick={unfollow(cookie.load('current_id'),postData._id)}>Cancel Follow</Button>
    // }

    // async function unfollow(userId,posrtId){
    //     await axios.get(`http://localhost:3008/unFollow/${userId}/${posrtId}`);
    //     followButton=<Button variant="outlined" color="primary" startIcon={<StarOutIcon />} onClick={follow(cookie.load('current_id'),postData._id)}>Follow</Button>
    // }

    //unfollow(cookie.load('current_id'),postData._id)
    //follow(cookie.load('current_id'),postData._id)

    function generateFollow(userId, current_post) {
        if (isSeller(userId, current_post)) {
            return (
                <Button variant="contained" disabled color="secondery">You are the seller</Button>
            );
        }
        else if (isFollowed(userId, current_post)) {
            return (
                <Button variant="contained" color="primary" startIcon={<StarIcon />} onClick={() => { setFollowState(2) }}>Cancel Follow</Button>
            );
        } else return (
            <Button variant="outlined" color="primary" startIcon={<StarOutIcon />} onClick={() => { setFollowState(1) }}>Follow</Button>
        );
    }

    if (postData && postData.userWhoPost && postData.followers) {
        followButton = generateFollow(cookie.load('current_id'), postData);
    }

    if (loading) {
        return (
            <div>
                <h2>Loading...</h2>
            </div>
        );
    } else if (badRequest) {
        return (
            <div>
                <h2>400: input ID is illegal</h2>
            </div>
        );
    } else if (notFound) {
        return (
            <div>
                <h2>404: post not found</h2>
            </div>
        );
    } else {
        return (
            <Card className={classes.card} variant="outlined">
                <CardHeader className={classes.titleHead} title={postData.title} />
                <CardMedia className={classes.media} component="img"
                    image={
                        postData && postData.imgbase64headArray ? `${postData.imgbase64headArray[0].imgbase64head}` : noImage
                    }
                    title="Item image" />
                <CardContent>
                    <Typography className={classes.secondary_container}>
                        {tags}{followButton}
                    </Typography>
                    <Typography className={classes.secondary_container}>
                        <label className={classes.secondary_title}>Price:</label>{postData.price}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="div" className={classes.secondary_container}>
                        <label className={classes.secondary_title}>Description:</label>
                        {postData.discription}
                    </Typography>
                    <Typography className={classes.secondary_container}>
                        <label className={classes.secondary_title}>
                            Seller:
                        </label>
                        {postData.userWhoPost.name}
                    </Typography>
                    <Typography className={classes.secondary_container}>
                        <label className={classes.secondary_title}>Email:</label>{postData.userWhoPost.email}
                    </Typography>
                    <Button variant="contained" color='primary'>Contact with him/her</Button>
                </CardContent>
            </Card>
        );
    }

}

export default Post;