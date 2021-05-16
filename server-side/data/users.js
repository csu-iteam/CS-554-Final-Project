const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const uuid = require('uuid/v4');
const ObjectId = require('mongodb').ObjectID;

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
    posts = [];
    let newUser = {
      username: username,
      email: email,
      password: password,
      _id: uuid(),
      posts: posts
    };

    const newInsertInformation = await userCollection.insertOne(newUser);
    if (newInsertInformation.insertedCount === 0) throw 'Insert failed!';
    return await this.getUserById(newInsertInformation.insertedId);
  },

    //(done)
async getUserByEmail(useremail){
  if (typeof useremail != "string") {
    throw "the email typy is error.";
  }
  const userCollection = await users();
  const user = await userCollection.findOne({ email: useremail });
  if (user === null) {
    throw "The user is not exist.";
  }
  return user;
},

// done
async judgeEmail(useremail){
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
    const deletionInfo = await userCollection.removeOne({ _id: id });
    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete user with id of ${id}`;
    }
    return true;
  },
  async updateUser(id, updatedUser) {
    const user = await this.getUserById(id);

    let userUpdateInfo = {
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName
    };

    const userCollection = await users();
    const updateInfo = await userCollection.updateOne(
      { _id: id },
      { $set: userUpdateInfo }
    );
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
      throw 'Update failed';

    return await this.getUserById(id);
  },
  //  add post for user  (done) 
  async addPostToUser(userId, postId) {

    let userInfo = await this.getUserById(userId);
    const userCollection = await users();
    const updateInfo = await userCollection.updateOne(
      {_id: userId},
      {$addToSet: {posts: ObjectId(postId)} }
    );
    if(!updateInfo.matchedCount && !updateInfo.modifiedCount){
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
      { $pull: { posts: ObjectId(postId)} }
    );
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount){
      throw 'Update failed';
    }
  }
}

module.exports = exportedMethods;
