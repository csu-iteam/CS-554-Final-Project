const mongoCollections = require('../config/mongoCollections');
const posts = mongoCollections.posts;
const users = require('./users');
const uuid = require('uuid/v4');
var { ObjectId } = require('mongodb');


function isEmptyOrSpaces(str) {
  return str === null || str.match(/^ *$/) !== null;
}

function getNowFormatDate() {
  let date = new Date();
  let seperator1 = "-";
  let seperator2 = ":";
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let strDate = date.getDate();
  if (month >= 1 && month <= 9) {
      month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
  }
  let currentdate = year + seperator1 + month + seperator1 + strDate
          + " " + date.getHours() + seperator2 + date.getMinutes()
          + seperator2 + date.getSeconds();
  return currentdate;
}


const exportedMethods = {
  //(done)
  async getAllPosts() {
    const postCollection = await posts();
    return await postCollection.find({}).toArray();
  },

  //(done)
  async getPostsByTag(tag) {
    if (!tag) throw 'No tag provided';
    const postCollection = await posts();
    return await postCollection.find({ tag: tag }).toArray();
  },

  //(done)
  async getPostsByUser(username){
    if (!username) throw 'No username provided';
    const postCollection = await posts();
    
    return await postCollection.find({"userWhoPost.name": username}).toArray();
  },

  //(done)
  async getPostsByUserEmail(currentEmail){
    if(!currentEmail) throw 'no user email provide';
    const postCollection = await posts();
    return await postCollection.find({"userWhoPost.email": currentEmail}).toArray();
  },

  //(done)
  async getPostById(id) {
    
    const postCollection = await posts();
    const post = await postCollection.findOne({ _id: ObjectId(id) });
    if (!post) throw 'Post not found';
    return post;
  },

  //add post by user eamil  (done)   img todo
  async addPostByUserEmail(useremail, tag, title, discription, price){
    if (!useremail){
      throw 'Add post failed, need provide user ID';
    }
    if (typeof tag !== "string" || isEmptyOrSpaces(tag)){
      throw "Please provide a valid tag!";
    }
    if (typeof title !== "string" || isEmptyOrSpaces(title)){
      throw "Please provide a valid title!";
    }
    if (typeof discription !== "string" || isEmptyOrSpaces(discription)){
      throw "Please provide a valid discription!";
    }
    // if (!Array.isArray(img)){   ........................todo
    //   throw "Please provide a valid image!";
    // } 
    if (typeof price !== "number") {
      throw "Please provide a valid price!";
    }
    const postCollection = await posts();
    const userWhoPost = await users.getUserByEmail(useremail);
    let timenow = getNowFormatDate();
    const newTempPost = {
      userWhoPost:{
        id: userWhoPost._id,
        name: userWhoPost.username,
        email: userWhoPost.email
      },
      tag: tag,
      title: title,
      discription: discription,
      img: [],               //.....................todo
      price: price,
      time: timenow
    }
    try{
      const newInsertInformation = await postCollection.insertOne(newTempPost);
      const newId = newInsertInformation.insertedId;

      await users.addPostToUser(userWhoPost._id, newId);
      return await this.getPostById(newId);
    }catch(e){
      throw "add post failed";
    }
  },

//add post by userId (done)
  async addPost(userId, tag, title, discription, img, price) {
    if (!userId){
      throw 'Add post failed, need provide user ID';
    }
    if (typeof tag !== "string" || isEmptyOrSpaces(tag)){
      throw "Please provide a valid tag!";
    }
    if (typeof title !== "string" || isEmptyOrSpaces(title)){
      throw "Please provide a valid title!";
    }
    if (typeof discription !== "string" || isEmptyOrSpaces(discription)){
      throw "Please provide a valid discription!";
    }
    if (!Array.isArray(img)){
      throw "Please provide a valid image!";
    } 
    if (typeof price !== "number") {
      throw "Please provide a valid price!";
    }
    const postCollection = await posts();
    const userWhoPost = await users.getUserById(userId);
    let timenow = getNowFormatDate();
    const newTempPost = {
      userWhoPost:{
        id: userId,
        name: userWhoPost.username,
        email: userWhoPost.email
      },
      tag: tag,
      title: title,
      discription: discription,
      img: img,
      price: price,
      time: timenow
    }
    try{
      const newInsertInformation = await postCollection.insertOne(newTempPost);
      const newId = newInsertInformation.insertedId;

      await users.addPostToUser(userId, newId);
      return await this.getPostById(newId);
    }catch(e){
      throw "add post failed";
    }
  },
  
  //(done)
  async removePost(id) {
    const postCollection = await posts();
    let post = null;
    try {
      post = await this.getPostById(id);
    } catch (e) {
      console.log(e);
      return;
    }
    const deletionInfo = await postCollection.removeOne({ _id: ObjectId(id) });
    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete post with id of ${id}`;
    }
    await users.removePostFromUser(post.userWhoPost.id, id);
    return true;
  },

  async updatePost(id, updatedPost) {
    const oldPost = await this.getPostById();
    if(!oldPost){
      console.log('update failed, no such post');
    }

    const updatedPostData = {};

    if (updatedPost.title) {
      updatedPostData.title = updatedPost.title;
    }

    if (updatedPost.discription) {
      updatedPostData.discription = updatedPost.discription;
    }

    if (updatedPost.price) {
      updatedPostData.price = updatedPost.price;
    }

    if (updatedPost.img) {
      updatedPostData.img = updatedPost.img;
    }
    const postCollection = await posts();
    const updateInfo = await postCollection.updateOne({ _id: id }, { $set: updatedPostData });
    if (updateInfo.modifiedCount === 0){
      console.log('could not update post');
    }
    return await this.getPostById(id);
  },

  async renameTag(oldTag, newTag) {
    if (oldTag === newTag) throw "tags are the same";
    let findDocuments = {
      tags: oldTag,
    };

    let firstUpdate = {
      $addToSet: { tags: newTag },
    };

    let secondUpdate = {
      $pull: { tags: oldTag },
    };

    const postCollection = await posts();
    await postCollection.updateMany(findDocuments, firstUpdate);
    await postCollection.updateMany(findDocuments, secondUpdate);

    return await this.getPostsByTag(newTag);
  },


};

module.exports = exportedMethods;
