import React, { Component, useEffect, useState } from 'react';
import '../App.css';

const HomeTypeListButton = () => {

    const [type, setType] = useState('all');

    const handleChange = (e) => {
        setType(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Your choice: ' + type);
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Choose trade type：</label>
                <select onChange={handleChange}>
                    <option value="all">all</option>
                    <option value="furniture">furniture</option>
                    <option value="digital product">digital product</option>
                    <option value="currency exchange">currency exchange</option>
                </select>
                <input type="submit" value="submit" />
            </form>
        </div>
    );
};
export default HomeTypeListButton;
