import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import noImage from '../img/no_image.jpg';
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
    const classes = useStyles();

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

    function generateTag(tag) {
        return (
            <Chip label={tag} color='primary' />
        );
    }

    let tags = postData && postData.tag.map((tag) => {
        return generateTag(tag);
    });
    // let tags='';

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
                        {tags}
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