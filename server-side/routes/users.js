const express = require('express');
const router = express.Router();
const data = require('../data');
const bcrypt = require('bcryptjs');
const crypto = require('crypto-js');
const saltRounds = 10;
const userData = data.users;

router.get('/user', async (req, res) => {
  const email = req.body;
  console.log(req.body);
  try {
    let user = await userData.getUserByEmail(email);
    res.json(user);
  } catch (e) {
    res.status(404).json({ error: 'User not found' });
  }
});

router.get('/user/:email', async (req, res) => {
  const email = req.params.email;
  try {
    let user = await userData.getUserByEmail(email);
    res.json(user);
  } catch (e) {
    res.status(404).json({ error: 'User not found' });
  }
});

router.get('/', async (req, res) => {
  try {
    let userList = await userData.getAllUsers();
    res.json(userList);
  } catch (e) {
    res.sendStatus(500);
  }
});

// Register Done
router.post('/register', async (req, res) => {
  let userInfo = req.body;

  if (!userInfo) {
    res.status(400).json({ error: 'You must provide data to create a account' });
    return;
  }

  if (!userInfo.username) {
    res.status(400).json({ error: 'You must provide the username' });
    return;
  }

  if (!userInfo.email) {
    res.status(400).json({ error: 'You must provide the email address' });
    return;
  }

  if (!userInfo.password) {
    res.status(400).json({ error: 'You must provide the password' });
    return;
  }

  const emailExist = await userData.judgeEmail(userInfo.email);
  if (emailExist) {
    res.status(406).json({ error: 'The email address input has been registered.' });
    return;
  }

  try {
    const newUser = await userData.addUser(
      userInfo.username,
      userInfo.email,
      userInfo.password
    );
    res.json(newUser);
  } catch (e) {
    res.sendStatus(500);
  }
});

//Login Done
router.post('/login', async (req, res) => {
  let userInfo = req.body;

  if (!userInfo) {
    res.status(400).json({ error: 'You must provide data to create a account' });
    return;
  }

  if (!userInfo.email) {
    res.status(400).json({ error: 'You must provide the email address' });
    return;
  }

  if (!userInfo.password) {
    res.status(400).json({ error: 'You must provide the password' });
    return;
  }

  let compareToMerlin = false;
  try {
    const emailExist = await userData.judgeEmail(userInfo.email);
    if (emailExist) {
      let user = await userData.getUserByEmail(userInfo.email);
      compareToMerlin = await bcrypt.compare(userInfo.password, user.password);
      if(compareToMerlin) res.json(user);
      else res.status(404).json({ error: 'Password is not correct' });
    }else{
      res.status(404).json({ error: 'User not found' });
    }
  } catch (e) {
    res.status(404).json({ error: 'User not found' });
  }
});

//done
router.put('/:id', async (req, res) => {
  let userInfo = req.body;

  if (!userInfo) {
    res.status(400).json({ error: 'You must provide data to update a account' });
    return;
  }

  if (!userInfo.email) {
    res.status(400).json({ error: 'You must provide the email address' });
    return;
  }

  if (!userInfo.password) {
    res.status(400).json({ error: 'You must provide the password' });
    return;
  }

  try {
    const updatedUser = await userData.updateUser(req.params.id, userInfo);
    res.json(updatedUser);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.delete('/:id', async (req, res) => {
  if (!req.params.id) throw 'You must specify an ID to delete';
  try {
    await userData.getUserById(req.params.id);
  } catch (e) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  try {
    await userData.removeUser(req.params.id);
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;
