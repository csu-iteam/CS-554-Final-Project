import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, Card, CardContent, CardMedia, Typography, CardHeader } from '@material-ui/core';
import axios from 'axios';
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

    const [user, setUser] = useState({});

    //get data from database
    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await axios.get('http://localhost:3008/users',
                    { headers: { Accept: 'application/json' } });
                console.log(user);
                console.log(data);
                setUser(data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, []
    );

    // //add scripts 
    // useEffect(() => {
    //     const script = document.createElement('script');
    //     script.src = "/scripts/homepage.js";
    //     script.async = true;
    //     document.body.appendChild(script);
    //     return () => {
    //         document.body.removeChild(script);
    //     }
    // }, []);

    return (
        <div>
            <HomeTypeListButton />
        </div >
    );
};

export default Home;