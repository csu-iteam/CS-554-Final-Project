import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, Card, CardContent, CardMedia, Typography, CardHeader } from '@material-ui/core';
import axios from 'axios';
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


    return (
        <div>
            <p>Hello</p>
            <p>{user[0].firstName}</p>
        </div>
    );
};

export default Home;