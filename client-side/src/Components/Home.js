import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography, makeStyles } from '@material-ui/core';
import axios from 'axios';
import noImage from '../img/no_image.jpg';
import '../App.css';
import Search from './Search';

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
    const [searchTerm, setSearchTerm] = useState('');
    const [searchData, setSearchData] = useState(undefined);
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

    ///////////////////////
    useEffect(() => {
        console.log('search useEffect fired');
        async function fetchData() {
          try {
            console.log(`in fetch searchTerm: ${searchTerm}`);
            const { data } = await axios.get(
              `http://localhost:3008/posts/search/${searchTerm}`
            );
            
            setSearchData(data);
            setLoading(false);
          } catch (e) {
            console.log(e);
          }
        }
        if (searchTerm) {
          console.log('searchTerm is set');
          fetchData();
        }
      }, [searchTerm]);
      ///////////////////////////////////

    const handleChange = (e) => {
        setType(e.target.value);
    }

    const searchValue = async (value) => {
        setSearchTerm(value);
      };

    const typeSelector = (
        <div>
            <form className='center'>
                
                <label>Tag Search：</label>
                <select className='selectpicker' onChange={handleChange}>
                    <option value="all">all</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Computers">Computers</option>
                    <option value="Smart Home">Smart Home</option>
                    <option value="Home,Garden,Tools">Home,Garden,Tools</option>
                    <option value="Pet Supplies">Pet Supplies</option>
                    <option value="Handmade">Handmade</option>
                    <option value="Books">Books</option>
                    <option value="Outdoors">Outdoors</option>
                    <option value="MoneyChange">MoneyChange</option>
                    <option value="Others">Others</option>
                    
                </select>
            </form>
        </div>
    );

    const bulidCard = (post) => {
        return (
            <Grid item xs={10} sm={8} md={4} lg={3} xl={2} key={post._id}>
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

    if (searchTerm) {  // search term
        card =
          searchData &&
          searchData.map((show) => {
            return bulidCard(show);
          });
    } else if (type !== 'all') {   //search tag
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
    } else {         // all post
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
                
                <Search searchValue={searchValue} />
                {typeSelector}
                
                <p className='center'>HINT: If use Term Search, make sure select "all" in tag; </p>
                <p>If use Tag search, make sure term search is empty!</p>
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