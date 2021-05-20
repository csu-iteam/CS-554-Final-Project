const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const uuid = require('uuid/v4');
const ObjectId = require('mongodb').ObjectID;
const axios = require('axios');
const bcrypt = require('bcryptjs');
const crypto = require('crypto-js');
const saltRounds = 10;
const privateKey = "08844dc7-e92c-4640-a3a1-b44d04d531ad";

let exportedMethods = {
  async getAllUsers() {
    const userCollection = await users();
    const userList = await userCollection.find({}).toArray();
    if (!userList) throw 'No users in system!';
    return userList;
  },

  //Done
  async getUserByEmailAndPassword(email, password) {
    const userCollection = await users();
    const user = await userCollection.findOne({ email: email, password: password });
    if (!user) throw 'User not found';
    return user;
  },

  //Done
  async addUser(username, email, password) {
    const userCollection = await users();
    const bcrypt_password = await bcrypt.hash(password, saltRounds);
    posts = [];
    const newChatUserCreated = await this.addChatUser({ username: username, email: email, password: bcrypt_password});
    if (!newChatUserCreated.id) throw 'Fail to create chat user';
    let newUser = {
      username: username,
      email: email,
      password: bcrypt_password,
      _id: uuid(),
      posts: posts,
      chatUserId: newChatUserCreated.id,
      follows: []
    };
    const newInsertInformation = await userCollection.insertOne(newUser);
    if (newInsertInformation.insertedCount === 0) throw 'Insert failed!';
    
    return await this.getUserById(newInsertInformation.insertedId);
  },

  //(done)
  async getUserByEmail(useremail) {
    if (typeof useremail != "string") {
      throw "the email typy is error.";
    }
    const userCollection = await users();
    const user = await userCollection.findOne({ email: useremail });
    if (user === null) {
      console.log("The user is not exist.");
    }
    return user;
  },

  // done
  async judgeEmail(useremail) {
    const userCollection = await users();
    const user = await userCollection.findOne({ email: useremail });
    if (user === null) {
      return false;
    }
    return true;
  },

  // get user by ID  (done) 
  async getUserById(id) {
    if (typeof id != "string") {
      throw "the id typy is error.";
    }
    const userCollection = await users();
    const user = await userCollection.findOne({ _id: id });
    if (user === null) {
      throw "The user is not exist.";
    }
    return user;
  },


  async removeUser(id) {
    const userCollection = await users();
    const user = await this.getUserById(id);
    const chatUserId = user.chatUserId;
    const deletionInfo = await userCollection.removeOne({ _id: id });
    const deleteChatUserInfo = await this.deleteChatUser(chatUserId);
    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete user with id of ${id}`;
    }
    if (!deleteChatUserInfo.id) throw 'Fail to update chat user';
    return true;
  },

  //done
  async updateUser(id, updatedUser) {
    const user = await this.getUserById(id);
    const chatUserId = user.chatUserId;
    let userUpdateInfo = {
      username: updatedUser.username,
      email: updatedUser.email,
      password: updatedUser.password
    };
    const userCollection = await users();
    const updateInfo = await userCollection.updateOne(
      { _id: id },
      { $set: userUpdateInfo }
    );
    const updateChatUserInfo = await this.updateChatUser(chatUserId, userUpdateInfo);
    if (!updateChatUserInfo.id) throw 'Fail to update chat user';
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
      throw 'Update failed';
    return await this.getUserById(id);
  },

  //  add post for user  (done) 
  async addPostToUser(userId, postId) {

    let userInfo = await this.getUserById(userId);
    const userCollection = await users();
    const updateInfo = await userCollection.updateOne(
      { _id: userId },
      { $addToSet: { posts: ObjectId(postId) } }
    );
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount) {
      throw "Update failed";
    }
    return await this.getUserById(userId);
  },

  //(done) remove post from user
  async removePostFromUser(userId, postId) {
    let currentUser = await this.getUserById(userId);

    const userCollection = await users();
    const updateInfo = await userCollection.updateOne(
      { _id: userId },
      { $pull: { posts: ObjectId(postId) } }
    );
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount) {
      throw 'Update failed';
    }
  },

  ///////
  async addFollowToUser(userId, postId) {
    let userInfo = await this.getUserById(userId);
    const userCollection = await users();
    try {
      const updateInfo = await userCollection.updateOne(
        { _id: userId },
        { $addToSet: { follows: ObjectId(postId) } }
      );
      if (!updateInfo.matchedCount && !updateInfo.modifiedCount) {
        throw "Update failed";
      }
      return await this.getUserById(userId);
    } catch (e) {
      console.log(e);
    }
  },

  async removeFollowFromUser(userId, postId) {
    let currentUser = await this.getUserById(userId);
    const userCollection = await users();
    const updateInfo = await userCollection.updateOne(
      { _id: userId },
      { $pull: { follows: ObjectId(postId) } }
    );
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount) {
      throw 'Update failed';
    }
  },

  async addChatUser({username, email, password}) {
    const data = {
      "username": username,
      "secret": password,
      "email": email,
    };
    const config = {
      method: 'post',
      url: 'https://api.chatengine.io/users/',
      headers: {
        'PRIVATE-KEY': privateKey
      },
      data: data
    };

    return await axios(config).then(res => {
      	return res.data;
      })
      .catch(err => {
        console.log(err);
        return false
      });
  },

  async updateChatUser({ chatUserId, userUpdateInfo}) {
    const data = {
      "username": userUpdateInfo.username,
      "secret": userUpdateInfo.password,
      "email": userUpdateInfo.email,
    };
    const config = {
      method: 'patch',
      url: `https://api.chatengine.io/users/${chatUserId}/`,
      headers: {
        'PRIVATE-KEY': privateKey
      },
      data: data
    };

    return await axios(config).then(res => {
       return res.data;
      })
      .catch(err => {
        console.log(err);
        return false
      });
  },

  async deleteChatUser(chatUserId) {
    const config = {
      method: 'delete',
      url: `https://api.chatengine.io/users/${chatUserId}/`,
      headers: {
        'PRIVATE-KEY': privateKey
      }
    };
    return await axios(config).then(res => {
      return res.data;
     })
     .catch(err => {
       console.log(err);
       return false
     });
  },
}


module.exports = exportedMethods;
