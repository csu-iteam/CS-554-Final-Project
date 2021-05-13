const mongoCollections = require('../config/mongoCollections');
const posts = mongoCollections.posts;
const users = require('./users');
const uuid = require('uuid/v4');

const exportedMethods = {
  async getAllPosts() {
    const postCollection = await posts();
    return await postCollection.find({}).toArray();
  },
  async getPostsByType(type) {
    if (!type) throw 'No type provided';
    const postCollection = await posts();
    return await postCollection.find({ types: type }).toArray();
  },
  async getPostById(id) {
    const postCollection = await posts();
    const post = await postCollection.findOne({ _id: id });

    if (!post) throw 'Post not found';
    return post;
  },
  async addPost(title, body, price, types, posterId) {
    if (typeof title !== 'string') throw 'No title provided!';
    if (typeof body !== 'string') throw 'No body provided!';
    if(typeof price !== 'string') throw 'No price provided!';

    if (!Array.isArray(types)) { //TODO: the value type of 'type' is not decided yet, this is just a demo
      types = [];
    }

    const postCollection = await posts();

    const userThatPosted = await users.getUserById(posterId);

    const newPost = {
      title: title,
      body: body,
      price: price,
      poster: {
        id: posterId,
        name: `${userThatPosted.firstName} ${userThatPosted.lastName}`
      },
      types: types,
      _id: uuid()
    };

    const newInsertInformation = await postCollection.insertOne(newPost);
    const newId = newInsertInformation.insertedId;

    await users.addPostToUser(posterId, newId, title);

    return await this.getPostById(newId);
  },
  
  async removePost(id) {
    const postCollection = await posts();
    let post = null;
    try {
      post = await this.getPostById(id);
    } catch (e) {
      console.log(e);
      return;
    }
    const deletionInfo = await postCollection.removeOne({ _id: id });
    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete post with id of ${id}`;
    }
    await users.removePostFromUser(post.poster.id, id);
    return true;
  },

  async updatePost(id, updatedPost) {
    const postCollection = await posts();

    const updatedPostData = {};

    if (updatedPost.types) {
      updatedPostData.types = updatedPost.types;
    }

    if (updatedPost.title) {
      updatedPostData.title = updatedPost.title;
    }

    if (updatedPost.body) {
      updatedPostData.body = updatedPost.body;
    }

    if (updatedPost.price) {
      updatedPostData.price = updatedPost.price;
    }

    await postCollection.updateOne({ _id: id }, { $set: updatedPostData });

    return await this.getPostById(id);
  },

  // async renameTag(oldTag, newTag) {  //TODO:should be modified
  //   if (oldTag === newTag) throw 'tags are the same';
  //   let findDocuments = {
  //     tags: oldTag
  //   };

  //   let firstUpdate = {
  //     $addToSet: { tags: newTag }
  //   };

  //   let secondUpdate = {
  //     $pull: { tags: oldTag }
  //   };

  //   const postCollection = await posts();
  //   await postCollection.updateMany(findDocuments, firstUpdate);
  //   await postCollection.updateMany(findDocuments, secondUpdate);

  //   return await this.getPostsByTag(newTag);
  // }
};

module.exports = exportedMethods;
