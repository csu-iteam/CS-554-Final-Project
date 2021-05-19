const express = require('express');
const router = express.Router();
const data = require('../data');
const bcrypt = require('bcryptjs');
const crypto = require('crypto-js');
const saltRounds = 10;
const userData = data.users;


router.get('/chat/:email', async (req, res) => {
    const email = req.params.email;
    try {
        let user = await userData.getUserByEmail(email);
        res.json(user);
    } catch (e) {
        res.status(404).json({ error: 'User not found' });
    }
});

module.exports = router;
